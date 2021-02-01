import React, { Component } from "react";
import VerticalSeparator from "../../common/VerticalSeparator";
import Icon from "../../common/Icon";

import "./BrandCompare.scss";
import BrandCheckboxList from "./BrandCheckboxList";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { LINE_CHART_COLORS } from "../../../constants/colors";

export const brandTypes = {
	clientBrand: "client",
	topSellerBrnad: "bestSeller",
	competitorBrand: "competitor"
};

class BrandCompareModal extends Component {
	state = {
		selectedPrimaryBrands: [],
		selectedCompetitorBrands: [],
		selectedTopSellerBrands: []
	};

	onClientBrandSelect = (item, status) => {
		if (status && this.countOfRecordsSelected() > 4) return;
		let brandList = this.handleCheckboxStatus(
			item,
			status,
			this.state.selectedPrimaryBrands
		);
		let otherBrands = {};
		if (!status)
			otherBrands = {
				selectedTopSellerBrands: []
			};
		this.setState({ selectedPrimaryBrands: brandList, ...otherBrands });
		const selectedBrands = brandList?.map(e => e?.name);
		const selectedCategories = [];
		brandList?.forEach(e =>
			selectedCategories.push(...Object.keys(e?.productCategoryMap))
		);
		if (selectedBrands?.length > 0) {
			const payload = {
				...this.props,
				brandNames: selectedBrands,
				categoryNames: selectedCategories,
				productIdList: []
			};
			this.props.fetchTopSellerBrandsList(payload);
		} else {
			this.props.clearTopSellerBrandsList();
		}
	};
	onCompetitorBrandSelect = (item, status) => {
		if (status && this.countOfRecordsSelected() > 4) return;
		let brandList = this.handleCheckboxStatus(
			item,
			status,
			this.state.selectedCompetitorBrands
		);
		this.setState({ selectedCompetitorBrands: brandList });
	};

	onTopSellerBrandSelect = (item, status) => {
		if (status && this.countOfRecordsSelected() > 4) return;
		let brandList = this.handleCheckboxStatus(
			item,
			status,
			this.state.selectedTopSellerBrands
		);
		this.setState({ selectedTopSellerBrands: brandList });
	};

	onClearAllClick = () => {
		this.setState({
			selectedCompetitorBrands: [],
			selectedPrimaryBrands: [],
			selectedTopSellerBrands: []
		});

		this.props.clearTopSellerBrandsList();
	};

	onCompareBrandClick = () => {
		const {
			selectedCompetitorBrands,
			selectedPrimaryBrands,
			selectedTopSellerBrands
		} = this.state;

		const primaryBrands = selectedPrimaryBrands?.map(e =>
			this.createBrandObject(e, brandTypes.clientBrand)
		);
		const competitorBrands = selectedCompetitorBrands?.map(e =>
			this.createBrandObject(e, brandTypes.competitorBrand)
		);
		const topSellerBrands = selectedTopSellerBrands?.map(e =>
			this.createBrandObject(e, brandTypes.topSellerBrnad)
		);

		const selectedBrands = [
			...primaryBrands,
			...competitorBrands,
			...topSellerBrands
		];
		const selectedBrandsWithColor = selectedBrands.map((obj, i) => {
			return { ...obj, color: LINE_CHART_COLORS[i] };
		});
		this.props.setBySearchSelectedKeywordsInConfig([]);
		this.props.setisBrandCompareInConfig(true);
		this.props.setCompareBrandsInConfig(selectedBrandsWithColor);
		this.props.hideBrandCompare();

		const payload = {
			...this.props,
			brandCompareView: true,
			compareBrands: selectedBrandsWithColor,
			bySearchSelectedKeywordsList: []
		};
		apiCallBasedOnRoute(payload);
	};

	createBrandObject = (obj, type) => {
		let categoryList = Object.keys(obj?.productCategoryMap)?.map(e => ({
			category: e,
			asin: obj.productCategoryMap[e].map(asin => asin.productId),
			isSelected: true
		}));
		return { type, name: obj.name, categoryList, isSelected: true };
	};

	countOfRecordsSelected = () => {
		const {
			selectedCompetitorBrands,
			selectedPrimaryBrands,
			selectedTopSellerBrands
		} = this.state;

		const primaryCount = selectedPrimaryBrands?.length || 0;
		const competitorCount = selectedCompetitorBrands?.length || 0;
		const topSellerCount = selectedTopSellerBrands?.length || 0;
		const count = primaryCount + competitorCount + topSellerCount;
		return count;
	};

	handleCheckboxStatus = (item, status, selectedList) => {
		let list = [];

		if (status) list = [...selectedList, item];
		else list = selectedList.filter(e => e.name !== item.name);

		return list;
	};

	render() {
		const {
			hideBrandCompare,
			clientBrandsList,
			competitorBrandsList,
			topsellerBrandsList
		} = this.props;
		let isTotalSelectedBrand = this.countOfRecordsSelected() < 2;

		return (
			<div className="brand-compare-modal-conatiner">
				<header className="brand-compare-modal-header">
					<div className="text-container">
						<div className="header-text">Select Brands for Compare</div>
						<div className="header-text-small">
							You can select maximum of 5 Brands
						</div>
					</div>
					<div className="brand-comapre-filters"></div>
					<Icon
						name="clearWhite"
						size="18"
						iconClass="brand-compare-close"
						handleIconClick={hideBrandCompare}
					/>
				</header>
				<div className="brand-compare-modal-body">
					<BrandCheckboxList
						items={clientBrandsList?.data?.brandList}
						onCheckboxClick={this.onClientBrandSelect}
						selectedItems={this.state.selectedPrimaryBrands}
						listHeading="My Brands"
					/>

					<BrandCheckboxList
						items={competitorBrandsList?.data?.brandList}
						onCheckboxClick={this.onCompetitorBrandSelect}
						selectedItems={this.state.selectedCompetitorBrands}
						listHeading="Competitor’s Brands"
					/>
					<BrandCheckboxList
						items={topsellerBrandsList?.data?.brandList}
						onCheckboxClick={this.onTopSellerBrandSelect}
						selectedItems={this.state.selectedTopSellerBrands}
						listHeading="Top Sellers"
						subHeading="Top Sellers are not saved as compare sets."
					/>
				</div>
				<footer className="brand-compare-modal-footer">
					<div
						className={`save-as-compareset ${isTotalSelectedBrand &&
							"compare-disabled"}`}
					>
						<Icon
							name={isTotalSelectedBrand ? "savePresetDisabled" : "savePreset"}
							iconClass="compare-set"
							size="28"
						/>
						SAVE AS COMPARE SET
					</div>
					<div className="brand-compare-buttons">
						<div className={`compare-cancel`} onClick={this.onClearAllClick}>
							CLEAR
						</div>
						<VerticalSeparator className="separator-compare" />
						<div
							className={`compare-select ${isTotalSelectedBrand &&
								"compare-disabled"}`}
							onClick={!isTotalSelectedBrand ? this.onCompareBrandClick : null}
						>
							COMPARE
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default BrandCompareModal;
