import React, { Component, Fragment } from "react";
import PageContainer from "../PageContainer";
import CatalogHealth from "../CatalogHealth/CatalogHealthSummary";
import Card from "../../common/Card";
import BestSeller from "../BestSeller/BestSeller";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import SummaryChart from "../common/SummaryChart";
import LostBuyBox from "./LostBuyBox/LostBuyBox";
import BrandsTable from "./../BrandTable";
import { AVAILABILITY, pageTitle } from "../../../constants/PageHeaders";
import { isInternalServerError } from "../../../utils/isInternalServerError";

import "./Availability.scss";

class Availability extends Component {
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(AVAILABILITY);
		this.props.setSelectedPageInConfig(AVAILABILITY);
		this.props.setSelectedPrimaryModuleInConfig(
			this.props.match?.params?.primaryModule
		);
	}
	componentDidUpdate(nextProps, pervProps) {
		if (
			isInternalServerError([
				nextProps.overallScore,
				nextProps.bestSeller,
				nextProps.catalogHealth,
				nextProps.brandsScore,
				nextProps.lostBuyBox
			])
		) {
			this.props.history.push("/500");
		}
	}
	getAvailabilityCatalogHealthscores = () => {
		this.props.fetchAvailabilityCatalogHealth(this.props);
	};

	getBestSellersList = (selectedCategory, tab = "") => {
		const bestSellerFilter = {
			...this.props,
			selectedCategory
		};
		this.props.fetchAvailabilityBestSellers(bestSellerFilter);
	};

	onBestSellerRetryClick = () => {
		this.props.fetchAvailabilityBestSellers(this.props);
	};

	fetchBrands = () => {
		this.props.fetchAvailabilityBrandScore(this.props);
	};

	onSummaryRetryClick = () => {
		this.props.fetchAvailibilityOverallScore(this.props);
	};

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchAvailibilityOverallScore({ ...this.props, scoreType });
	};

	onLostBuyBoxRetryClick = () => {
		this.props.fetchAvailabilityLostBuyBox(this.props);
	};

	render() {
		const {
			overallScore,
			bestSeller,
			catalogHealth,
			isDateCompareSelected,
			brandsScore,
			lostBuyBox,
			brandCompareView,
			compareBrands,
			pageConfig
		} = this.props;
		const { summaryChart, catalogHealth: catalogHealthConfig, lostBuyBox: lostBuyBoxConfig, bestSeller: bestSellerConfig, brandsTable } = pageConfig[AVAILABILITY]
		return (
			<PageContainer title={pageTitle[AVAILABILITY]}>
				<Fragment>
					<SummaryChart
						score={overallScore}
						isBrandCompare={brandCompareView}
						isCompareSelected={isDateCompareSelected}
						onSelectorChange={this.onSummaryChartSelectorChange}
						onRetryClick={this.onSummaryRetryClick}
						compareBrands={compareBrands}
						{...summaryChart}
					/>
					<div className="availability-row">
						{!isDateCompareSelected && !brandCompareView && catalogHealthConfig.enable && (
							<div className="availability-catalog-container section-header-main">
								<Card className={"section-main-header"}>
									<CatalogHealth
										catalogHealthScore={catalogHealth}
										fetchCataloghealthScore={
											this.getAvailabilityCatalogHealthscores
										}
										arrowIconName={"sortRightBlue"}
									/>
								</Card>
							</div>
						)}
						{!brandCompareView && lostBuyBoxConfig.enable && (
							<div className="availability-lostbuybox-container section-header-main">
								<LostBuyBox
									data={lostBuyBox}
									isDateCompareSelected={isDateCompareSelected}
									onRetryClick={this.onLostBuyBoxRetryClick}
									{...pageConfig[AVAILABILITY]?.lostBuyBox}
								/>
							</div>
						)}
					</div>
					{!isDateCompareSelected && !brandCompareView && (
						<BestSeller
							data={bestSeller}
							getBestSellersList={this.getBestSellersList}
							onRetryClick={this.onBestSellerRetryClick}
							{...bestSellerConfig}
						/>
					)}
					{!brandCompareView && (
						<BrandsTable
							brandsScore={brandsScore}
							fetchBrands={this.fetchBrands}
							compareSelected={isDateCompareSelected}
							{...brandsTable}
						/>
					)}
				</Fragment>
			</PageContainer>
		);
	}
}

export default Availability;
