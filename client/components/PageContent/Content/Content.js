import React, { Fragment } from "react";
import "./Content.scss";
import BestSeller from "./../BestSeller/BestSeller";
import CatalogHealth from "./../CatalogHealth/CatalogHealthSummary";
import Attributes from "./Attributes";
import SummaryChart from "../common/SummaryChart";
import BrandsTable from "./../BrandTable";
import PageContainer from "../PageContainer";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { CONTENT, pageTitle } from "../../../constants/PageHeaders";
import { isInternalServerError } from "../../../utils/isInternalServerError";

class ContentSummary extends React.Component {
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(CONTENT);
		this.props.setSelectedPageInConfig(CONTENT);
		this.props.setSelectedPrimaryModuleInConfig(
			this.props.match?.params?.primaryModule
		);
		this.props.setisAsinsViewPageInConfig(false); //done intentionally on landing page coz if url changed directly from asins page then it remains true
	}

	componentDidUpdate(nextProps, pervProps) {
		if (
			isInternalServerError([
				nextProps.overallScore,
				nextProps.catalogHealth,
				nextProps.attributesScore,
				nextProps.brandsScore,
				nextProps.bestSeller
			])
		) {
			this.props.history.push("/500");
		}
	}

	getBestSellersList = (selectedCategory, tab = "") => {
		const bestSellerFilter = {
			...this.props,
			selectedCategory
		};
		this.props.fetchBestSellers(bestSellerFilter);
	};

	onBestSellerRetryClick = () => {
		this.props.fetchBestSellers(this.props);
	};

	getContentCatalogHealthscores = () => {
		this.props.fetchContentCatalogHealth(this.props);
	};

	fetchBrands = () => {
		this.props.fetchContentBrandsScore(this.props);
	};

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchOverallContentScore({ ...this.props, scoreType });
	};

	onSummaryRetryClick = () => {
		this.props.fetchOverallContentScore(this.props);
	};

	onAttributeTableRetryClick = () => {
		this.props.fetchContentAttributes(this.props);
	};

	onSummaryExportClick = type => {
		this.props.exportContentOverallScore({ ...this.props, exportType: type });
	};

	render() {
		const {
			bestSeller,
			catalogHealth,
			brandsScore,
			attributesScore,
			overallScore,
			isDateCompareSelected,
			brandCompareView,
			compareBrands,
			overallScoreExportData,
			pageConfig
		} = this.props;
		return (
			<PageContainer title={pageTitle[CONTENT]}>
				<Fragment>
					<SummaryChart
						score={overallScore}
						isBrandCompare={brandCompareView}
						isCompareSelected={isDateCompareSelected}
						onSelectorChange={this.onSummaryChartSelectorChange}
						onRetryClick={this.onSummaryRetryClick}
						compareBrands={compareBrands}
						onDownloadClick={this.onSummaryExportClick}
						downloadData={overallScoreExportData}
						{...pageConfig[CONTENT]?.summaryChart}
					/>
					{!isDateCompareSelected && !brandCompareView && pageConfig[CONTENT]?.catalogHealth.enable && (
						<div className="section-header-main">
							<CatalogHealth
								catalogHealthScore={catalogHealth}
								fetchCataloghealthScore={this.getContentCatalogHealthscores}
								arrowIconName={"sortRight"}
							/>
						</div>
					)}
					{!isDateCompareSelected && !brandCompareView && (
						<BestSeller
							data={bestSeller}
							getBestSellersList={this.getBestSellersList}
							onRetryClick={this.onBestSellerRetryClick}
							{...pageConfig[CONTENT]?.bestSeller}
						/>
					)}
					<Attributes
						attributesScore={attributesScore}
						isBrandCompare={brandCompareView}
						isDateCompare={isDateCompareSelected}
						compareBrands={compareBrands}
						onRetryClick={this.onAttributeTableRetryClick}
						{...pageConfig[CONTENT]?.attributes}
					/>

					{!brandCompareView && (
						<BrandsTable
							brandsScore={brandsScore}
							fetchBrands={this.fetchBrands}
							compareSelected={isDateCompareSelected}
							{...pageConfig[CONTENT]?.brandsTable}
						/>
					)}
				</Fragment>
			</PageContainer>
		);
	}
}

export default ContentSummary;
