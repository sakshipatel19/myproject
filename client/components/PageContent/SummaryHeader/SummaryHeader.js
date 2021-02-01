import React, { Component, Fragment } from "react";
import FiltersContainer from "./FiltersContainer";
import "./Summary.scss";
import DateRangeCompareComponent from "../../common/DatePicker";
import InPageNavigation from "../common/InPageNavigation";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { detailsPages } from "../../../constants/PageHeaders";
import Icon from "../../common/Icon";
import { withRouter } from "react-router";

class SummaryHeader extends Component {
	isFiltersApplied = () => {
		return this.props.productIdList?.length > 0;
	};

	removeAllFilters = () => {
		const payload = {
			...this.props,
			brandNames: [],
			categoryNames: [],
			productIdList: []
		};

		apiCallBasedOnRoute(payload);
		this.props.actions.setBrandNamesInConfig([]);
		this.props.actions.setCategoryNamesInConfig([]);
		this.props.actions.setProductsListInConfig([]);
		this.props.actions.setPresetNameInConfig("");
		this.props.actions.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);
	};
	onBackButtonClick = () => {
		this.props.history.goBack();
	};
	showBackArrow = () => {
		return detailsPages.indexOf(this.props.selectedPage) > -1;
	};
	render() {
		const {
			title,
			containerRef,
			brandCompareView,
			brandNames,
			categoryNames,
			productIdList,
			presetName,
			isAsinsLandingPage
		} = this.props;
		return (
			<Fragment>
				<div className="summary-header-container">
					<div className="summary-header-text">
						{this.showBackArrow() && (
							<Icon
								name={"sortLeft"}
								iconClass={"summary-title-back-button"}
								size={24}
								handleIconClick={this.onBackButtonClick}
							/>
						)}
						<span>{title}</span>
						{containerRef && <InPageNavigation containerRef={containerRef} />}
					</div>
					<DateRangeCompareComponent {...this.props} />
				</div>
				{!isAsinsLandingPage &&
					!brandCompareView &&
					this.isFiltersApplied() &&
					!this.showBackArrow() && (
						<FiltersContainer
							selectedBrandsCount={brandNames?.length}
							selectedCategoriesCount={categoryNames?.length}
							selectedProductsCount={productIdList?.length}
							presetName={presetName}
							removeAllFilters={this.removeAllFilters}
						/>
					)}
			</Fragment>
		);
	}
}

export default withRouter(SummaryHeader);
