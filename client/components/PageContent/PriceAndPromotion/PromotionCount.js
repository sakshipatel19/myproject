import React from "react";

import Card from "../../common/Card";
import StackedBarChart from "../../common/Charts/StackedBar";

const PromotionCount = props => {
	return (props.enable ?
		<div
			className="promotion-container section-header-main"
			key="brand-compare"
		>
			<Card>
				<div className="card-header">
					<div className="card-title section-header-title">
						{"Promotion Count"}
					</div>
				</div>
				<StackedBarChart
					isDateCompareSelected={props.isDateCompareSelected}
					labelTextFormat={props.labelTextFormat}
					promotionCountBrandCompare={props.promotionCountBrandCompare}
				/>
			</Card>
		</div> : null
	);
};

export default PromotionCount;
