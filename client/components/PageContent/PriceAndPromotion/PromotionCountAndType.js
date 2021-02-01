import React, { Component } from "react";

import Card from "../../common/Card";
// import VerticalSeparator from "../../common/VerticalSeparator";
import Tooltip from "../../common/Tooltip/Tooltip";
import "./PriceAndPromotion.scss";
import RadarChart from "../../common/RadarChart";
import DotWithLabel from "../../common/DotWithLabel";
import { DATE_COMPARE_COLORS } from "../../../constants/colors";
import LoadingIndicator from "../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import { numberFormat, styles } from "../../../utils/number";

const createRadarChartData = (value, isCompareSelected) => {
	let labels = [];
	const datasets = [];

	if (value?.initial) {
		const promotionTypeList = value?.initial?.promotionTypeList;
		const data =
			promotionTypeList &&
			promotionTypeList.map(typeOfPromotion => typeOfPromotion.count);

		datasets.push({ data });
		labels =
			promotionTypeList &&
			promotionTypeList.map(typeOfPromotion => typeOfPromotion.typeHeading);
	}
	if (value?.compare) {
		const promotionTypeList = value?.compare?.promotionTypeList;
		const data =
			promotionTypeList &&
			promotionTypeList.map(typeOfPromotion => typeOfPromotion.count);

		datasets.push({ data });
	}

	return {
		labels,
		datasets
	};
};

const createPromotionTypeData = (promotionType, isCompareSelected, countryCode) => {
	if (isCompareSelected) {
		return promotionType?.initial?.promotionTypeList.map((ele, index) => (
			<div className="types" key={ele?.typeHeading}>
				<div className="heading">{ele?.typeHeading}</div>
				<>
					<DotWithLabel
						className="promotion-type-count"
						text={countFormat(promotionType?.initial?.promotionTypeList[index].count, countryCode)}
						color={DATE_COMPARE_COLORS[0]}
					/>
					<DotWithLabel
						className="promotion-type-count"
						text={countFormat(promotionType?.compare?.promotionTypeList[index].count, countryCode)}
						color={DATE_COMPARE_COLORS[1]}
					/>
				</>
			</div>
		));
	} else {
		return promotionType?.initial?.promotionTypeList?.map((ele, index) => (
			<div className="types" key={ele?.typeHeading}>
				<div className="heading">{ele?.typeHeading}</div>
				<div className="count">{countFormat(ele?.count, countryCode)}</div>
			</div>
		));
	}
};
const promotionCount = (promotionCount, isCompareSelected, countryCode) => {
	return isCompareSelected ? (
		<div className="promotion-count-compare">
			<DotWithLabel
				text={countFormat(promotionCount?.initial?.promotionCount, countryCode)}
				color={DATE_COMPARE_COLORS[0]}
			/>
			<DotWithLabel
				text={countFormat(promotionCount?.compare?.promotionCount, countryCode)}
				color={DATE_COMPARE_COLORS[1]}
			/>
		</div>
	) : (
			<div className="promotion-count">
				{countFormat(promotionCount?.initial?.promotionCount, countryCode)}
			</div>
		);
};
const countFormat = (score, countryCode) => {
	return numberFormat(score, countryCode, styles.decimal);
}
const onRetryClick = () => { };
const PromotionCountAndType = ({ data, isCompareSelected, countryCode, enable, radarChart }) => {
	const radarChartData = createRadarChartData(data?.data, isCompareSelected);
	return (enable ?
		<Card className="section-header-main promo-main-container">
			<div className="card-header">
				<div className="card-title section-header-title">Promotion Count </div>
			</div>
			{data.fetching ? (
				<LoadingIndicator />
			) : data.error ? (
				<DataLoadError handleRetry={onRetryClick} />
			) : (
						<div className="promotion-count-type-container">
							<div className="promotion-count-container">
								<div>{promotionCount(data?.data, isCompareSelected, countryCode)}</div>
								<div className="promotion-count-desc">
									{data?.data?.initial?.promotionCountHelp}
								</div>
							</div>
							<div className="promotion-type-container">
								<div className="promotion-type-heading">Promotion Types </div>
								<div className="promotion-types">
									{createPromotionTypeData(data?.data, isCompareSelected, countryCode)}
								</div>
							</div>
							{radarChart && <div className="promotion-type-chart-container">
								<RadarChart data={radarChartData} brandCompareView={false} />
							</div>}
						</div>
					)}
		</Card> : null);
};

export default PromotionCountAndType;
