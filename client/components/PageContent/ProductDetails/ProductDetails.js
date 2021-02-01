import React, { Component } from "react";
import PageContainer from "../PageContainer";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { PRODUCT_DETAILS, pageTitle } from "../../../constants/PageHeaders";
import "./ProductDetails.scss";
import ProductInfo from "./ProductInfo";
import ConsiderationConversionSummary from "./ConsiderationConversionSummary";
import SummaryChart from "../common/SummaryChart";

class ProductDetails extends Component {
	componentDidMount() {
		this.props.setSelectedNavLinkInConfig(PRODUCT_DETAILS);
		this.props.setSelectedPageInConfig(PRODUCT_DETAILS);
		this.props.setProductIdConfig(this.props.match?.params?.id);
		this.props.setisAsinsViewPageInConfig(true);
		apiCallBasedOnRoute({
			...this.props,
			productId: this.props.match?.params?.id,
			selectedTab: "content"
		});
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		this.props.setisAsinsViewPageInConfig(false);
	}
	loadAsinOverallScore = data => {
		const payload = {
			...this.props,
			...data,
			productId: this.props.match?.params?.id
		};
		this.props.fetchAsinOverallScore(payload);
	};
	onProductDetailsRetryClick = () => {
		const payload = {
			...this.props,
			productId: this.props.match?.params?.id
		};
		this.props.fetchProductDetails(payload);
	};
	onSummaryRetryClick = () => {
		this.props.fetchProductDetailsOverallScore(this.props);
	};

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchProductDetailsOverallScore({ ...this.props, scoreType });
	};

	render() {
		const {
			productInfo,
			overallScore,
			asinOverallScore,
			isDateCompareSelected,
			overallScoreExportData,
			asinCompareBrands = [],
			asinCompareView,
			countryCode
		} = this.props;
		return (
			<PageContainer title={pageTitle[PRODUCT_DETAILS]}>
				{asinCompareBrands.length === 0 && (
					<ProductInfo
						data={productInfo}
						onRetryClick={this.onProductDetailsRetryClick}
					/>
				)}
				<SummaryChart
					score={overallScore}
					isCompareSelected={isDateCompareSelected}
					onSelectorChange={this.onSummaryChartSelectorChange}
					onRetryClick={this.onSummaryRetryClick}
					isBrandCompare={asinCompareView}
					asinCompareView={asinCompareView}
					compareBrands={asinCompareBrands}
					countryCode={countryCode}
				/>
				<ConsiderationConversionSummary
					overallScore={asinOverallScore}
					isDateCompareSelected={isDateCompareSelected}
					brandCompareView={asinCompareView}
					compareBrands={asinCompareBrands}
					asinCompareView={asinCompareView}
					overallScoreExportData={overallScoreExportData}
					loadAsinOverallScore={this.loadAsinOverallScore}
					countryCode={countryCode}
				/>
			</PageContainer>
		);
	}
}

export default ProductDetails;
