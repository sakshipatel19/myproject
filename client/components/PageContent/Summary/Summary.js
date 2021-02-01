import React, { Fragment } from "react";
import AttributeScore from "./AttributeScore";
import SummaryChart from "../common/SummaryChart";
import PageContainer from "../PageContainer";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { SUMMARY, pageTitle } from "../../../constants/PageHeaders";
import "./Summary.scss";
import { isInternalServerError } from "../../../utils/isInternalServerError";

class Summary extends React.Component {
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(SUMMARY);
		this.props.setSelectedPageInConfig(SUMMARY);
	}
	componentDidUpdate(nextProps, pervProps) {
		if (
			isInternalServerError([nextProps.overallScore, nextProps.attributeScore])
		) {
			this.props.history.push("/500");
		}
	}
	onAttributeRetryClick() {
		this.props.fetchSummaryAttributeScore(this.props);
	}
	onPromotionRetryClick() {
		this.props.fetchSummaryPromotionCount(this.props);
	}
	onSummaryRetryClick = () => {
		this.props.fetchSummaryOverallScore(this.props);
	};

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchSummaryOverallScore({ ...this.props, scoreType });
	};
	render() {
		const {
			isDateCompareSelected,
			labelTextFormat,
			attributeScore,
			promotionCount,
			overallScore,
			brandCompareView,
			compareBrands,
			countryCode,
			pageConfig
		} = this.props;
		return (
			<PageContainer title={pageTitle[SUMMARY]}>
				<Fragment>
					<SummaryChart
						score={overallScore}
						isBrandCompare={brandCompareView}
						isCompareSelected={isDateCompareSelected}
						onSelectorChange={this.onSummaryChartSelectorChange}
						onRetryClick={this.onSummaryRetryClick}
						compareBrands={compareBrands}
						countryCode={countryCode}
						{...pageConfig[SUMMARY]?.summaryChart}
					/>

					<AttributeScore
						isDateCompareSelected={isDateCompareSelected}
						labelTextFormat={labelTextFormat}
						attributeScore={attributeScore}
						isBrandCompare={brandCompareView}
						compareBrands={compareBrands}
						{...pageConfig[SUMMARY]?.attributeScore}
					/>
				</Fragment>
			</PageContainer>
		);
	}
}

export default Summary;
