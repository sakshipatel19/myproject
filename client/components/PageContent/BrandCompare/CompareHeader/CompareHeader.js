import React, { Component, Fragment } from "react";

import "./CompareHeader.scss";
import DropDown from "./dropdownList";
import { apiCallBasedOnRoute } from "../../../../services/apiCallBasedOnRoute";
import Card from "../../../common/Card";
import VerticalSeparator from "../../../common/VerticalSeparator";
import Icon from "../../../common/Icon";
import Overlay from "../../../common/Overlay";

const brandComapreItems = [
	{ label: "EDIT", iconName: "edit" },
	{ label: "SAVE AS SET", iconName: "savePreset" },
	{ label: "DOWNLOAD", iconName: "download" },
	{ label: "CLOSE", iconName: "clear" }
];

class CompareHeader extends Component {
	state = {
		isDropdownMenuOpen: null
	};
	onDropDownValueChange = (options, index) => {
		let compareBrands = this.props.compareBrands;
		compareBrands[index].categoryList = [...options];
		this.props.setCompareBrandsInConfig(compareBrands);
		apiCallBasedOnRoute(this.props);
	};

	onCompareHeaderClose = () => {
		this.props.setCompareBrandsInConfig([]);
		this.props.setBySearchSelectedKeywordsInConfig([]);
		this.props.setisBrandCompareInConfig(false);
		const payload = {
			...this.props,
			brandCompareView: false,
			compareBrands: [],
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
	createCompareBrandFilterList = compareBrands => {
		return compareBrands?.map((e, index) => {
			let filterClass =
				index == 0
					? "compare-header-filter first"
					: index == compareBrands.length - 1
						? "compare-header-filter last"
						: "compare-header-filter";
			return (
				<div className={filterClass} key={`${e.name}_${index}`}>
					<div>
						<DropDown
							options={e.categoryList}
							onApplyCick={options =>
								this.onDropDownValueChange(options, index)
							}
							brandName={e.name}
							onCancelClick={this.onMenuCloseClick}
							isDropdownMenuOpen={this.isDropdownMenuOpen(e)}
							onMenuOpenClick={() => this.onMenuOpenClick(e)}
							isSelected={e.isSelected}
							onFilterCheckboxClick={() => {
								this.onFilterCheckboxClick(e);
							}}
						/>
					</div>
					<div
						className="compare-brand-color"
						style={{ backgroundColor: e.color }}
					></div>
				</div>
			);
		});
	};

	onMenuCloseClick = () => {
		this.setState({ isDropdownMenuOpen: null });
	};

	onMenuOpenClick = obj => {
		this.setState({ isDropdownMenuOpen: obj });
	};

	isDropdownMenuOpen = e => {
		const { isDropdownMenuOpen } = this.state;
		if (
			e.name == isDropdownMenuOpen?.name &&
			e.type == isDropdownMenuOpen?.type
		) {
			return true;
		} else {
			return false;
		}
	};

	onFilterCheckboxClick = e => {
		const updatedCompareBrand = this.props.compareBrands.map(obj => {
			if (obj.name == e.name && obj.type == e.type) {
				return {
					...obj,
					isSelected: !e.isSelected
				};
			} else {
				return obj;
			}
		});
		this.props.setCompareBrandsInConfig(updatedCompareBrand);
	};
	render() {
		return (
			<Fragment>
				{this.state.isDropdownMenuOpen && (
					<Overlay onClick={this.onMenuCloseClick} />
				)}
				<div className="compare-header">
					<Card>
						<div className={"compare-header-container"}>
							<div className={"compare-header-content"}>
								<div className="compare-header-title">Compare</div>
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
								{this.createCompareBrandFilterList(this.props.compareBrands)}
							</div>
						</div>
					</Card>
				</div>
			</Fragment>
		);
	}
}

export default CompareHeader;
