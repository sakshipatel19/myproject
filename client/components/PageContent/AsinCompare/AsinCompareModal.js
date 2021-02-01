import React, { Component } from "react";

import VerticalSeparator from "../../common/VerticalSeparator";
import Icon from "../../common/Icon";
import "./AsinCompare.scss";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { LINE_CHART_COLORS } from "../../../constants/colors";
import Tab from "../../common/Tab";
import AsinCompareModalBody from "./AsinCompareModalBody";

export const brandTypes = {
	clientBrand: "client",
	topSellerBrnad: "bestSeller",
	competitorBrand: "competitor"
};

const brandTypesTabs = [
	{ label: "MY BRANDS", key: "client" },
	{ label: "COMPETITOR BRANDS", key: "competitor" },
	{ label: "TOP SELLERS", key: "topseller" }
];

class AsinCompareModal extends Component {
	state = {
		selectedPrimaryBrands: [],
		selectedCompetitorBrands: [],
		selectedTopSellerBrands: [],
		selectedTab: "client"
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
		const selectedBrands = brandList?.map(e => e?.name);
		const selectedCategories = brandList
			?.map(obj => Object.keys(obj?.productCategoryMap))
			?.flat(1);
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
	onCompetitorBrandSelect = (item, status) => {};
	onTopSellerBrandSelect = (item, status) => {};
	onAsinSelect = (asins, brandList, selectedBrandType) => {
		const updatedSelectedBrands = [];
		let selectedAsinObj = {};
		asins.forEach(asinObj => {
			brandList &&
				brandList.forEach(obj => {
					Object.keys(obj.productCategoryMap).forEach(category => {
						obj.productCategoryMap[category].forEach(asin => {
							if (asinObj.productId == asin.productId) {
								let selectedcat = {};
								selectedcat[category] = [];
								selectedcat[category].push(asin);
								selectedAsinObj = {
									name: obj.name,
									productCategoryMap: selectedcat
								};
								updatedSelectedBrands.push(selectedAsinObj);
							}
						});
					});
				});
		});

		this.setState({
			[selectedBrandType]: updatedSelectedBrands
		});
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
		this.props.hideBrandCompare();
		this.props.setAsinCompareBrandsInConfig(selectedBrandsWithColor);
		this.props.setisAsinCompareInConfig(true);
		const payload = {
			...this.props,
			asinCompareView: true,
			asinCompareBrands: selectedBrandsWithColor,
			bySearchSelectedKeywordsList: []
		};

		apiCallBasedOnRoute(payload);
	};

	createBrandObject = (obj, type) => {
		let categoryList = Object.keys(obj?.productCategoryMap)?.map(e => ({
			category: e,
			asin: obj.productCategoryMap[e].map(asin => asin),
			isSelected: true
		}));
		return { type, name: obj.name, categoryList, isSelected: true };
	};

	countOfRecordsSelected = () => {
		const {
			selectedPrimaryBrands,
			selectedCompetitorBrands,
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

	onTabChange = selectedTab => {
		this.setState({ selectedTab });
	};

	render() {
		const {
			hideBrandCompare,
			clientBrandsList,
			competitorBrandsList,
			topsellerBrandsList
		} = this.props;
		const {
			selectedTab,
			selectedPrimaryBrands,
			selectedCompetitorBrands,
			selectedTopSellerBrands
		} = this.state;
		let countOfTotalBrands = this.countOfRecordsSelected();
		const brandTypeMap = {
			client: {
				brandList: clientBrandsList?.data?.brandList || [],
				onBrandClick: this.onClientBrandSelect,
				selectedBrand: selectedPrimaryBrands || [],
				onAsinClick: this.onAsinSelect,
				type: "selectedPrimaryBrands"
			},
			competitor: {
				brandList: competitorBrandsList?.data?.brandList || [],
				onBrandClick: this.onCompetitorBrandSelect,
				selectedBrand: selectedCompetitorBrands || [],
				onAsinClick: this.onAsinSelect,
				type: "selectedCompetitorBrands"
			},
			topseller: {
				brandList: topsellerBrandsList?.data?.brandList || [],
				onBrandClick: this.onTopSellerBrandSelect,
				selectedBrand: selectedTopSellerBrands || [],
				onAsinClick: this.onAsinSelect,
				type: "selectedTopSellerBrands"
			}
		};
		let isTotalSelectedBrand = this.countOfRecordsSelected() < 2;
		return (
			<div className="brand-compare-modal-conatiner-asin-page">
				<header className="brand-compare-modal-header">
					<div className="text-container">
						<div className="header-text">Select Item ID for Compare</div>
						<div className="header-text-small">
							You can select maximum of 5 Item IDs
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
				<div className="brandtype-tabs-conatier">
					<Tab
						data={brandTypesTabs}
						selectedTab={this.state.selectedTab}
						onTabChange={this.onTabChange}
					/>
					<Icon name="info" size="16" />
				</div>
				<AsinCompareModalBody
					data={brandTypeMap[selectedTab]}
					selectedTab={selectedTab}
					countOfTotalBrands={countOfTotalBrands}
				/>
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

export default AsinCompareModal;
