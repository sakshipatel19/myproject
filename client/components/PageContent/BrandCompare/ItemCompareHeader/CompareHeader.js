import React, { Component } from "react";

import "./CompareHeader.scss";
import { apiCallBasedOnRoute } from "../../../../services/apiCallBasedOnRoute";
import Card from "../../../common/Card";
import VerticalSeparator from "../../../common/VerticalSeparator";
import Icon from "../../../common/Icon";
import Checkbox, { checkboxStates } from "../../../common/Checkbox";
import { isNullOrUndefined } from "../../../../utils/number";
import Tooltip from "../../../common/Tooltip/Tooltip";

const brandComapreItems = [
	{ label: "EDIT", iconName: "edit" },
	{ label: "SAVE AS SET", iconName: "savePreset" },
	{ label: "DOWNLOAD", iconName: "download" },
	{ label: "CLOSE", iconName: "clear" }
];

class ItemCompareHeader extends Component {
	state = {
		isHoveringAsinId: false,
		asinId: ""
	};
	onCompareHeaderClose = () => {
		this.props.setAsinCompareBrandsInConfig([]);
		this.props.setisAsinCompareInConfig(false);
		const payload = {
			...this.props,
			asinCompareView: false,
			asinCompareBrands: [],
			bySearchSelectedKeywordsList: []
		};
		apiCallBasedOnRoute(payload);
	};

	createCompareHeaderitems = onClicks => {
		return brandComapreItems.map((obj, i) => {
			let isLastitem = i == brandComapreItems.length - 1;
			return (
				<div className="items-list" key={`${obj.label}_${i}`}>
					<div className="items" onClick={onClicks[i]}>
						<Icon name={obj.iconName} iconClass="compare-items" />
						<div>{obj.label}</div>
					</div>
					{!isLastitem && <VerticalSeparator />}
				</div>
			);
		});
	};

	toggleHoverState = (asinId = "") => {
		this.setState({ isHoveringAsinId: !this.state.isHoveringAsinId, asinId });
	};

	createCompareBrandFilterList = () => {
		const asinCompareItems = this.getAsinsInfoList(
			this.props.asinCompareBrands
		);

		return asinCompareItems?.map((e, index) => {
			let filterClass =
				index == 0
					? "compare-header-filter first"
					: index == asinCompareItems.length - 1
					? "compare-header-filter last"
					: "compare-header-filter";
			return (
				<div className={filterClass} key={`${e.name}_${index}`}>
					<Checkbox
						status={
							e.isSelected
								? checkboxStates.fullySelected
								: checkboxStates.unselected
						}
						onStateChange={() => this.onFilterCheckboxClick(e)}
						className="item-checkbox"
					/>
					<div className="compare-header-filter-content">
						{!isNullOrUndefined(e?.imageURL) ? (
							<img
								src={e.imageURL}
								alt={"Product-Image"}
								className="product-image"
							/>
						) : (
							<Icon name="imageNotAvailable" iconClass="product-image" />
						)}
						<div
							className="product-id"
							onMouseEnter={() => this.toggleHoverState(e.productId)}
							onMouseLeave={this.toggleHoverState}
						>
							{this.state.isHoveringAsinId &&
								this.state.asinId === e.productId &&
								!isNullOrUndefined(e?.title) && <Tooltip data={e.title} />}
							{e.productId}
						</div>
						{e?.productUrl !== "" && !isNullOrUndefined(e?.productUrl) && (
							<Icon
								name="externalPage"
								size={16}
								iconClass="product-external-icon"
								handleIconClick={() =>
									window.open(`http://${e?.productUrl}`, "_blank")
								}
							/>
						)}
					</div>
					<div
						className="compare-brand-color"
						style={{ backgroundColor: e.color }}
					></div>
				</div>
			);
		});
	};

	getAsinsInfoList = asins => {
		let result = [];
		asins?.map(asin => {
			let asinInfo = asin.categoryList[0].asin[0];
			asinInfo.isSelected = asin.isSelected;
			asinInfo.color = asin.color;
			result.push(asinInfo);
		});
		return result;
	};

	onFilterCheckboxClick = e => {
		const updatedCompareAsins = this.props.asinCompareBrands?.map(obj => {
			if (obj.categoryList[0].asin[0].productId === e.productId) {
				let asin = { ...obj };
				asin.isSelected = !e.isSelected;
				asin.categoryList[0].isSelected = !e.isSelected;
				return asin;
			} else {
				return obj;
			}
		});
		this.props.setAsinCompareBrandsInConfig(updatedCompareAsins);
	};
	render() {
		return (
			<div className="compare-header">
				<Card>
					<div className={"compare-header-container"}>
						<div className={"compare-header-content"}>
							<div className="compare-header-title">Compare</div>
							<div className="compare-sets">
								<VerticalSeparator />
								<Icon name="presets" size={16} iconClass="presets-icon" />
								<span className="presets-title">ASIN COMPARE SETS</span>
								<Icon name="down" size={12} iconClass="dropdown-arrow" />
							</div>
							<div className="compare-header-items">
								{this.createCompareHeaderitems([
									,
									,
									,
									this.onCompareHeaderClose
								])}
							</div>
						</div>

						<div className="compare-header-brands-list-conatiner">
							{this.createCompareBrandFilterList()}
						</div>
					</div>
				</Card>
			</div>
		);
	}
}

export default ItemCompareHeader;
