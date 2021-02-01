import React, { Component } from "react";
import FilterDropdown from "./FilterDropdown";
import { fetchProductsList } from "./filters-bar-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "../../global-actions";
import { checkboxStates } from "../../common/Checkbox";
import { withRouter } from "react-router-dom";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";

class AsinDropdown extends Component {
	componentDidMount() {
		this.props.fetchProductsList(this.props);
	}

	onApplyFilters = selectedItems => {
		let brandList = new Set();
		let categoriesList = new Set();
		let productIdList = new Set();

		selectedItems.forEach(item => {
			if (
				item.filterStatus === checkboxStates.fullySelected ||
				item.filterStatus === checkboxStates.partiallySelected
			) {
				productIdList.add(item.name);
				categoriesList.add(item.subcategory);
				brandList.add(item.brandName);
			}
		});

		this.props.onApplyFilters({
			brandNames: Array.from(brandList),
			categoryNames: Array.from(categoriesList),
			productIdList: Array.from(productIdList)
		});
	};

	onViewButtonClick = name => {
		const pathName = this.props.location.pathname;
		let url = `analysis/shelf/product-details/${name}`;
		const pathArrayLength = pathName?.split("/")?.length;
		for (let i = pathArrayLength - 2; i > 0; i--) {
			url = `../${url}`;
		}

		this.props.closeFilterMenu();

		let fromUrl;

		if (pathName?.split("/").includes("product-details")) {
			fromUrl = this.props.location.state.from;
			this.props.setProductIdConfig(name);
			const payload = { ...this.props };
			payload.productId = name;
			apiCallBasedOnRoute(payload);
		} else {
			fromUrl = this.props.location.pathname;
		}
		window.scrollTo(0, 0);
		this.props.history.push({
			pathname: url,
			state: {
				from: fromUrl
			}
		});
	};
	render() {
		return (
			<div className="asin-dropdown">
				<FilterDropdown
					items={this.props.productsList?.data?.productIdList}
					closeFilterMenu={this.props.closeFilterMenu}
					onApplyFilters={this.onApplyFilters}
					onViewButtonClick={this.onViewButtonClick}
					isAsinsLandingPage={this.props.isAsinsLandingPage}
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
	bindActionCreators({ fetchProductsList, ...globalActions }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AsinDropdown));
