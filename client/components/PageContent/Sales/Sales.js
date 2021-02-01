import React, { Component } from "react";
import PageContainer from "../PageContainer";
import SummaryChart from "../common/SummaryChart";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { SALES, pageTitle } from "../../../constants/PageHeaders";
import BrandTable from "../BrandTable/BrandTableSales";
import { isInternalServerError } from "../../../utils/isInternalServerError";

class Sales extends Component {
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(SALES);
		this.props.setSelectedPageInConfig(SALES);
		this.props.setSelectedPrimaryModuleInConfig(
			this.props.match?.params?.primaryModule
		);
	}
	componentDidUpdate(nextProps, pervProps) {
		if (
			isInternalServerError([nextProps.overallScore, nextProps.brandsTable])
		) {
			this.props.history.push("/500");
		}
	}
	fetchBrands = () => {
		this.props.fetchSalesBrandsTable(this.props);
	};

	onSummaryChartClick = (scoreType = "daily") => {
		this.props.fetchSalesOverallScore({ ...this.props, scoreType });
	};

	onSummaryExportClick = type => {
		this.props.exportSalesOverallScore({ ...this.props, exportType: type });
	};
	render() {
		const {
			brandsTable,
			isDateCompareSelected,
			overallScore,
			brandCompareView,
			compareBrands,
			overallScoreExportData,
			countryCode,
			pageConfig
		} = this.props;
		return (
			<PageContainer title={pageTitle[SALES]}>
				<SummaryChart
					score={overallScore}
					isCompareSelected={isDateCompareSelected}
					onSelectorChange={this.onSummaryChartClick}
					onRetryClick={this.onSummaryChartClick}
					isBrandCompare={brandCompareView}
					compareBrands={compareBrands}
					onDownloadClick={this.onSummaryExportClick}
					downloadData={overallScoreExportData}
					countryCode={countryCode}
					{...pageConfig[SALES]?.summaryChart}
				/>

				<BrandTable
					brandsScore={brandsTable}
					fetchBrands={this.fetchBrands}
					isBrandCompare={brandCompareView}
					compareSelected={isDateCompareSelected}
					compareBrands={compareBrands}
					countryCode={countryCode}
					{...pageConfig[SALES]?.brandTable}
				/>
			</PageContainer>
		);
	}
}

export default Sales;
