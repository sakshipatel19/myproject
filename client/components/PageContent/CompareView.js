import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FiltersBar from "./FiltersBar";
import "./PageContent.scss";
import Icon from "../common/Icon";
import { detailsPages } from "../../constants/PageHeaders";
import BrandCompare from "./BrandCompare";
import AsinComapre from "./AsinCompare";
import * as globalActions from "../global-actions";
import CompareHeader from "./BrandCompare/CompareHeader";
import ItemCompareHeader from "./BrandCompare/ItemCompareHeader";
import "./CompareView.scss";

class CompareView extends Component {
	state = {
		isBrandComapreOpen: false,
		isAsinComapreOpen: false
	};
	hideFiltersBar = () => {
		return detailsPages.indexOf(this.props.selectedPage) > -1;
	};
	showBrandCompare = () => {
		this.setState({ isBrandComapreOpen: true });
		document.body.classList.add("noscroll");
	};

	hideBrandCompare = () => {
		this.setState({ isBrandComapreOpen: false });
		document.body.classList.remove("noscroll");
	};

	showAsinCompare = () => {
		this.setState({ isAsinComapreOpen: true });
		document.body.classList.add("noscroll");
	};

	hideAsinCompare = () => {
		this.setState({ isAsinComapreOpen: false });
		document.body.classList.remove("noscroll");
	};

	asinCompareView = asinCompareView =>
		asinCompareView ? (
			<ItemCompareHeader />
		) : (
			<div>
				<div className="filter-bar_compare-container asin-view">
					{!this.hideFiltersBar() && (
						<>
							<FiltersBar isAsinsLandingPage={this.props.isAsinsLandingPage} />
							<div className="compare-button" onClick={this.showAsinCompare}>
								<Icon name="brandComapre" iconClass="brand-comapre" />
								COMPARE
							</div>
						</>
					)}
				</div>
				{this.state.isAsinComapreOpen && (
					<AsinComapre
						{...this.props}
						hideBrandCompare={this.hideAsinCompare}
					/>
				)}
			</div>
		);

	brandCompareView = brandCompareView =>
		brandCompareView ? (
			<CompareHeader />
		) : (
			<div>
				<div className="filter-bar_compare-container">
					{!this.hideFiltersBar() && (
						<>
							<FiltersBar />
							<div className="compare-button" onClick={this.showBrandCompare}>
								<Icon name="brandComapre" iconClass="brand-comapre" />
								COMPARE
							</div>
						</>
					)}
				</div>
				{this.state.isBrandComapreOpen && (
					<BrandCompare
						{...this.props}
						hideBrandCompare={this.hideBrandCompare}
					/>
				)}
			</div>
		);

	render() {
		const {
			brandCompareView,
			asinCompareView,
			isAsinsLandingPage
		} = this.props;

		return (
			<div className="">
				{isAsinsLandingPage
					? this.asinCompareView(asinCompareView)
					: this.brandCompareView(brandCompareView)}
			</div>
		);
	}
}

const mapStateToProps = store => {
	const {
		selectedPage,
		brandCompareView,
		isAsinsLandingPage,
		asinCompareView
	} = store.global.config;
	return {
		selectedPage,
		brandCompareView,
		isAsinsLandingPage,
		asinCompareView
	};
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CompareView);
