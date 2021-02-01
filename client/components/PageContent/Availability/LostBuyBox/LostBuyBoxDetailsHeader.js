import React, { Component } from "react";
import { withRouter } from "react-router";
import LodingIndicator from "../../../common/LoadingSkeleton/LoadingSquare";
import DonutChart from "../../../common/Charts/DonutChart";
import DataLoadError from "../../common/DataLoadError/DataLoadError";

import "./LostBuyBox.scss";

class LostBuyBoxDetailsHeader extends Component {
	createDonutChartData = () => {
		const { data } = this.props;
		const lostBuyBoxdata = data?.data || {};
		const lostBuyBoxFactors = ["outOfStock", "pricing", "otherFactors"];
		const initialData = lostBuyBoxFactors.map(e => ({
			...lostBuyBoxdata[e],
			type: e
		}));

		return initialData;
	};

	render() {
		let { hideViewAll, data, isDateCompareSelected, onRetryClick } = this.props;
		const donutProperties = {
			defaultWidth: 100,
			defaultHeight: 100,
			margin: { left: 0, right: 0, top: 0, bottom: 0 },
			donutWidth: 10,
			hoverOffsetWidth: 4,
			hideMouseHover: true
		};
		if (data?.error || data?.fetching) hideViewAll = true;

		return (
			<div className="lost-buy-box-details-header">
				{data?.fetching ? (
					<LodingIndicator />
				) : data?.error ? (
					<DataLoadError handleRetry={onRetryClick} />
				) : (
					<div className={"lost-buy-box-content"}>
						<DonutChart
							data={this.createDonutChartData()}
							summary={data?.data}
							isDateCompareSelected={isDateCompareSelected}
							properties={donutProperties}
							isDetailHeader={true}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(LostBuyBoxDetailsHeader);
