import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import LodingIndicator from "../../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../../common/DataLoadError/DataLoadError";
import Card from "../../../common/Card";
import DonutChart from "../../../common/Charts/DonutChart";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

import "./LostBuyBox.scss";

class LostBuyBox extends Component {
	createDonutChartData = () => {
		const { data, isDateCompareSelected } = this.props;
		const lostBuyBoxdata = data?.data || {};
		const lostBuyBoxFactors = ["outOfStock", "pricing", "otherFactors"];
		const initialData = lostBuyBoxFactors.map(e => ({
			...lostBuyBoxdata[e],
			type: e
		}));

		return initialData;
	};

	render() {
		let {
			hideViewAll,
			location,
			data,
			isDateCompareSelected,
			onRetryClick,
			enable
		} = this.props;

		if (data?.error || data?.fetching) hideViewAll = true;

		return (enable ?
			<Card className={"section-main-container lost-buy-box-container"}>
				<div className={"section-Header-container"}>
					<Label text={"Lost Buy Box"} labelClass={"section-header-title"} />
					{!hideViewAll && (
						<Link
							to={`${location.pathname}/lost-buy-box-details`}
							className={"lost-buy-box-view-all-link"}
						>
							<div className="view-all">
								VIEW ALL
								<Icon
									name={"sortRight"}
									size={12}
									iconClass={"lost-buy-box-view-all-icon"}
								/>
							</div>
						</Link>
					)}
				</div>
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
								/>
							</div>
						)}
			</Card> : null
		);
	}
}

export default withRouter(LostBuyBox);
