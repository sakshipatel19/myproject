import React, { Component } from "react";
import FilterDropdown from "./FilterDropdown";
import { fetchCategoriesList } from "./filters-bar-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "../../global-actions";
import { checkboxStates } from "../../common/Checkbox";

class CategoriesDropdown extends Component {
	componentDidMount() {
		this.props.fetchCategoriesList(this.props);
	}

	onApplyFilters = selectedItems => {
		let brandList = new Set();
		let categoriesList = new Set();
		let productIdList = new Set();

		selectedItems.forEach(item => {
			if (item.filterStatus === checkboxStates.fullySelected) {
				categoriesList.add(item.name);
				item.brandList.forEach(brand => brandList.add(brand));
				item.productIdList.forEach(productId => productIdList.add(productId));
			}
			if (item.filterStatus === checkboxStates.partiallySelected) {
				categoriesList.add(item.name);
				item.partialBrandList?.forEach(brand => brandList.add(brand));
				item.partialProdIdList?.forEach(productId =>
					productIdList.add(productId)
				);
			}
		});

		this.props.onApplyFilters({
			brandNames: Array.from(brandList),
			categoryNames: Array.from(categoriesList),
			productIdList: Array.from(productIdList)
		});
	};

	render() {
		return (
			<div className="categories-dropdown">
				<FilterDropdown
					items={this.props.categoriesList?.data?.categories}
					closeFilterMenu={this.props.closeFilterMenu}
					onApplyFilters={this.onApplyFilters}
				/>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		...store.global.config,
		...store.filtersBar
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchCategoriesList, ...globalActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDropdown);
