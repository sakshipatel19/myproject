import React, { Component } from "react";
import lodash from "lodash";

import "./AsinCompare.scss";
import AsinBrandCheckboxList from "./AsinBrandCheckboxList";
import AsinCategoryCheckboxList from "./AsinCategoryCheckboxList";
import AsinCheckboxList from "./AsinCheckboxList";

export const brandTypes = {
	clientBrand: "client",
	topSellerBrnad: "bestSeller",
	competitorBrand: "competitor"
};

class AsinCompareModalBody extends Component {
	state = {
		selectedBrands: [],
		selectedCategories: [],
		selectedAsin: [],
		brandsList: [],
		selectedTab: "client"
	};
	onBrandSelect = (brand, status) => {
		if (status && this.props.countOfTotalBrands > 4) return;
		let brandList = this.handleBrandCheckboxStatus(
			brand,
			status,
			this.state.selectedBrands
		);
		this.setState({ selectedBrands: brandList });
		this.props.data.onBrandClick(brand, status);
	};
	handleBrandCheckboxStatus = (item, status, selectedList) => {
		let list = [];
		if (status) list = [...selectedList, item];
		else list = selectedList.filter(e => e.name !== item.name);
		return list;
	};
	onCategorySelect = (category, status) => {
		let categoryList = this.handleCategoryCheckboxStatus(
			category,
			status,
			this.state.selectedCategories
		);

		this.setState({ selectedCategories: categoryList });
	};
	handleCategoryCheckboxStatus = (item, status, selectedList) => {
		let list = [];
		if (status) list = [...selectedList, item];
		else list = selectedList.filter(e => e !== item);
		return list;
	};
	onAsinSelect = (asin, status) => {
		if (status && this.props.countOfTotalBrands > 4) return;
		let asinList = this.handleAsinCheckboxStatus(
			asin,
			status,
			this.state.selectedAsin
		);
		this.props.data.onAsinClick(
			asinList,
			this.state.brandsList,
			this.props.data.type
		);
		this.setState({ selectedAsin: asinList });
	};
	handleAsinCheckboxStatus = (item, status, selectedList) => {
		let list = [];
		if (status) list = [...selectedList, item];
		else list = selectedList.filter(e => e.productId !== item.productId);
		return list;
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps);
		console.log(prevState);
		let update = {};
		if (nextProps.selectedTab !== prevState.selectedTab) {
			update.brandsList = lodash.cloneDeep(nextProps.data?.brandList);
			update.selectedBrands = lodash.cloneDeep(nextProps.data?.selectedBrand);
			update.selectedCategories = nextProps.data?.selectedBrand
				?.map(obj => Object.keys(obj.productCategoryMap))
				.flat(1);
			update.selectedAsin = nextProps.data?.selectedBrand
				?.map(obj =>
					Object.keys(obj?.productCategoryMap).map(
						e => obj?.productCategoryMap[e]
					)
				)
				?.flat(2);
			update.selectedTab = nextProps.selectedTab;
		}
		if (nextProps.selectedTab == prevState.selectedTab) {
			update.brandsList = lodash.cloneDeep(nextProps.data?.brandList);
		}
		return update;
	}
	createCategories = brandsList => {
		const { selectedBrands } = this.state;
		let selectedBrandNames = new Set(selectedBrands.map(obj => obj?.name));
		let selectedCat = [];
		selectedBrandNames.forEach(key => {
			brandsList &&
				brandsList.forEach(obj => {
					if (key == obj.name) {
						selectedCat.push(...Object.keys(obj.productCategoryMap));
					}
				});
		});
		return selectedCat.length
			? [...new Set(selectedCat)]
			: [
					...new Set(
						brandsList
							?.map(obj => Object.keys(obj?.productCategoryMap))
							?.flat(1)
					)
			  ];
	};
	createAsin = brandsList => {
		const { selectedBrands, selectedCategories } = this.state;
		let selectedBrandNames = new Set(selectedBrands.map(obj => obj?.name));
		let selectedAsin = [];
		selectedBrandNames.forEach(key => {
			brandsList &&
				brandsList.forEach(obj => {
					if (key == obj.name) {
						selectedCategories.length
							? selectedCategories.forEach(selectedCat => {
									Object.keys(obj.productCategoryMap).forEach(cat => {
										if (selectedCat == cat) {
											selectedAsin.push(obj.productCategoryMap[cat]);
										}
									});
							  })
							: selectedAsin.push(
									Object.keys(obj?.productCategoryMap).map(
										e => obj?.productCategoryMap[e]
									)
							  );
					}
				});
		});
		return [...new Set(selectedAsin.flat(2))];
	};
	render() {
		const {
			selectedBrands,
			selectedCategories,
			selectedAsin,
			brandsList
		} = this.state;
		const categories = this.createCategories(brandsList);
		const asins = this.createAsin(brandsList);
		return (
			<div className="brand-compare-modal-body">
				<AsinBrandCheckboxList
					items={brandsList || []}
					onCheckboxClick={this.onBrandSelect}
					selectedItems={selectedBrands}
					listHeading="Brands"
					type="brand"
				/>

				<AsinCategoryCheckboxList
					items={categories}
					onCheckboxClick={this.onCategorySelect}
					selectedItems={selectedCategories}
					listHeading="Categories"
					type="categories"
				/>

				<AsinCheckboxList
					items={(asins && asins) || []}
					onCheckboxClick={this.onAsinSelect}
					selectedItems={selectedAsin}
					listHeading="Item ID"
					type="asin"
				/>
			</div>
		);
	}
}

export default AsinCompareModalBody;
