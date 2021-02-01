import React, { Fragment, Component } from "react";
import PageContainer from "../PageContainer";
import SummaryChart from "../common/SummaryChart";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { PRICE_AND_PROMOTION, pageTitle } from "../../../constants/PageHeaders";
import BestSeller from "../BestSeller/BestSeller";
import BrandTable from "../BrandTable/BrandTablePriceAndPromotion";
import PromotionCount from "./PromotionCount";
import LodingIndicator from "../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import PromotionCountAndType from "./PromotionCountAndType";
import { isInternalServerError } from "../../../utils/isInternalServerError";

const bestSellerTabData = [
	{
		key: "price",
		label: "PRICE"
	},
	{
		key: "promotion",
		label: "PROMOTION"
	}
];
class PriceAndPromotion extends Component {
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(PRICE_AND_PROMOTION);
		this.props.setSelectedPageInConfig(PRICE_AND_PROMOTION);
		this.props.setSelectedPrimaryModuleInConfig(
			this.props.match?.params?.primaryModule
		);
	}

	componentDidUpdate(nextProps, pervProps) {
		if (
			isInternalServerError([
				nextProps.overallScore,
				nextProps.promotionCountAndTypes,
				nextProps.bestSeller,
				nextProps.brandLevelScore
			])
		) {
			this.props.history.push("/500");
		}
	}

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchOverallPricePromotionScore({ ...this.props, scoreType });
	};

	onSummaryRetryClick = () => {
		this.props.fetchOverallPricePromotionScore(this.props);
	};

	getBestSellersList = (selectedCategory, tab = "") => {
		const bestSellerFilter = {
			...this.props,
			selectedCategory
		};
		tab === "price"
			? this.props.fetchPriceBestSellers(bestSellerFilter)
			: this.props.fetchPromotionBestSellers(bestSellerFilter);
	};

	onBestSellerRetryClick = () => {
		this.props.fetchPriceBestSellers(this.props);
		this.props.fetchPromotionBestSellers(this.props);
	};

	getBestSellersListOnTabChange = (selectedCategory = "", tab) => {
		const bestSellerFilter = {
			...this.props,
			selectedCategory
		};
		tab === "price"
			? this.props.fetchPriceBestSellers(bestSellerFilter)
			: this.props.fetchPromotionBestSellers(bestSellerFilter);
	};

	getBrandLevelScores = () => {
		this.props.fetchPriceAndPromotionBrandLevelScores(this.props);
	};

	render() {
		const {
			overallScore,
			isDateCompareSelected,
			bestSeller,
			promotionCountAndTypes,
			brandLevelScore,
			brandCompareView,
			compareBrands,
			promotionCountBrandCompare,
			pageConfig,
			countryCode
		} = this.props;
		return (
			<PageContainer title={pageTitle[PRICE_AND_PROMOTION]}>
				<Fragment>
					<SummaryChart
						score={overallScore}
						isCompareSelected={isDateCompareSelected}
						onSelectorChange={this.onSummaryChartSelectorChange}
						onRetryClick={this.onSummaryRetryClick}
						isBrandCompare={brandCompareView}
						compareBrands={compareBrands}
						defaultSelectedChart={"priceScore"}
						{...pageConfig[PRICE_AND_PROMOTION]?.summaryChart}
					/>

					{!isDateCompareSelected && !brandCompareView && (
						<BestSeller
							data={bestSeller}
							getBestSellersList={this.getBestSellersList}
							getBestSellersListOnTabChange={this.getBestSellersListOnTabChange}
							tabData={bestSellerTabData}
							onRetryClick={this.onBestSellerRetryClick}
							{...pageConfig[PRICE_AND_PROMOTION]?.bestSeller}
						/>
					)}

					{!brandCompareView && (
						<PromotionCountAndType
							data={promotionCountAndTypes}
							isCompareSelected={isDateCompareSelected}
							{...pageConfig[PRICE_AND_PROMOTION]?.promotionCountAndType}
							countryCode={countryCode}
						/>
					)}

					{!brandCompareView && (
						<BrandTable
							data={brandLevelScore}
							compareSelected={isDateCompareSelected}
							onRetryClick={this.getBrandLevelScores}
							{...pageConfig[PRICE_AND_PROMOTION]?.brandTable}
						/>
					)}

					{brandCompareView &&
						(promotionCountBrandCompare?.data?.fetching ? (
							<LodingIndicator />
						) : promotionCountBrandCompare?.data?.error ? (
							<DataLoadError handleRetry={this.onPromotionRetryClick} />
						) : (
									<PromotionCount
										isDateCompareSelected={isDateCompareSelected}
										promotionCountBrandCompare={
											promotionCountBrandCompare?.data?.brandWiseData
										}
										{...pageConfig[PRICE_AND_PROMOTION]?.promotionCount}
									/>
								))}
				</Fragment>
			</PageContainer>
		);
	}
}

export default PriceAndPromotion;
