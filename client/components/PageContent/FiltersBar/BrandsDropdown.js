import React, { Component } from "react";
import FilterDropdown from "./FilterDropdown";
import { fetchBrandsList } from "./filters-bar-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "../../global-actions";
import { checkboxStates } from "../../common/Checkbox";

class BrandsDropdown extends Component {
	componentDidMount() {
		this.props.fetchBrandsList(this.props);
	}

	onApplyFilters = selectedItems => {
		let brandList = new Set();
		let categoriesList = new Set();
		let productIdList = new Set();

		selectedItems.forEach(item => {
			if (item.filterStatus === checkboxStates.fullySelected) {
				brandList.add(item.name);
				item.categoryList?.forEach(category => categoriesList.add(category));
				item.productIdList?.forEach(productId => productIdList.add(productId));
			}
			if (item.filterStatus === checkboxStates.partiallySelected) {
				brandList.add(item.name);
				item.partialCatList?.forEach(category => categoriesList.add(category));
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
			<div className="brands-dropdown">
				<FilterDropdown
					items={this.props.brandsList?.data?.brands}
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
	bindActionCreators({ fetchBrandsList, ...globalActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BrandsDropdown);
