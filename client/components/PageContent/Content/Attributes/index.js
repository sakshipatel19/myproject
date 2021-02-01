import React from "react";

import Card from "../../../common/Card";
import BarChartContainer from "../../../common/Charts/BarChart";
import Icon from "../../../common/Icon";
import DataLoadError from "../../common/DataLoadError/DataLoadError";
import LodingIndicator from "../../../common/LoadingSkeleton/LoadingSquare";
import AttributeBrandCompare from "./Attributes-brand-compare";

const Attributes = props => {
	const {
		isBrandCompare,
		isDateCompare,
		compareBrands,
		attributesScore,
		onRetryClick,
		enable
	} = props;
	const score = attributesScore.data;

	return (enable ?
		<div className="attributes-container section-header-main">
			<Card>
				<div className="card-header">
					<div className="card-title section-header-title">{"Attributes"}</div>
					<div className="card-right">
						<Icon name="download" size={16} />
					</div>
				</div>

				{attributesScore.fetching ? (
					<LodingIndicator />
				) : attributesScore.error ? (
					<DataLoadError handleRetry={onRetryClick} />
				) : isBrandCompare ? (
					<AttributeBrandCompare
						attributesScore={score}
						isDateCompare={isDateCompare}
						compareBrands={compareBrands}
					/>
				) : (
								<BarChartContainer
									attributesScore={score}
									isDateCompareSelected={isDateCompare}
									labelTextFormat={props.labelTextFormat}
									attributeScore={score}
									isContentAttribute
								/>
							)}
			</Card>
		</div> : null
	);
};

export default Attributes;
