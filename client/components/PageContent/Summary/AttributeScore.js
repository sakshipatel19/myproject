import React from "react";
import Card from "../../common/Card";
import BarChartContainer from "../../common/Charts/BarChart";
import LoadingSquare from "../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import AttributeScoreTable from "./AttributeScoreBrandCompare";

const Summary = props => {
	return (
		<div className="attributes-container section-header-main">
			<Card>
				<div className="card-header">
					<div className="card-title section-header-title">
						{"Attributes"}
					</div>
				</div>
				{props.attributeScore?.fetching ? (
					<LoadingSquare />
				) : props.attributeScore?.error ? (
					<DataLoadError />
				) : props.isBrandCompare ? (
					<AttributeScoreTable
						compareBrands={props.compareBrands}
						isDateCompare={props.isDateCompareSelected}
						attributesScore={props.attributeScore.data}
					/>
				) : (
								<BarChartContainer
									isDateCompareSelected={props.isDateCompareSelected}
									labelTextFormat={props.labelTextFormat}
									attributeScore={props.attributeScore.data}
								/>
							)}
			</Card>
		</div>
	);
};

export default Summary;
