import React, { Fragment, useState, useEffect } from "react";
import Icon from "../../../common/Icon";
import DotWithLabel from "../../../common/DotWithLabel";
import { isNullOrUndefined } from "../../../../utils/number";
import { DATE_COMPARE_COLORS } from "../../../../constants/colors";
import "./SummaryChart.scss";
import Tooltip from "../../../common/Tooltip/Tooltip";

const compareViewColors = DATE_COMPARE_COLORS;

const ChildScore = props => {
	const {
		data,
		parent,
		isSelected,
		isTagged,
		labelTextFormat,
		onTagScoreClick,
		onSelectChart,
		color,
		isBrandCompare,
		isCompareSelected,
		taggedCharts,
		isChartTagged,
		selectedChart,
		maxChartToShow,
		maxChartSelectedMsg
	} = props;

	const [maxLimitedReached, setMaxLimitReached] = useState(false);

	useEffect(() => {
		if (maxLimitedReached) setTimeout(() => setMaxLimitReached(false), 3000);
	});

	const onTagClick = e => {
		e.stopPropagation();
		const chartsTagged =
			taggedCharts.length +
			(!isSelected && selectedChart.type !== undefined ? 1 : 0);
		if (chartsTagged >= maxChartToShow && !isChartTagged(data?.type)) {
			setMaxLimitReached(true);
			return;
		} else setMaxLimitReached(false);
		const item = { type: data?.type, parent: parent, childOpen: true };
		onTagScoreClick(item);
	};

	const onSelectClick = e => {
		e.stopPropagation();
		if (taggedCharts.length >= maxChartToShow) {
			setMaxLimitReached(true);
			return;
		} else setMaxLimitReached(false);
		onSelectChart(data?.type);
	};

	const getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: labelTextFormat
			? labelTextFormat(score)
			: `${score}%`;

	const handleOnMouseLeave = () => {
		if (maxLimitedReached) setMaxLimitReached(false);
	};

	return (
		<>
			{maxLimitedReached && <Tooltip data={maxChartSelectedMsg} />}
			<div
				className={`child-score-section-container 
				${isSelected || isTagged ? "child-score-selected" : ""}
    			${isTagged ? "child-score-section-tagged" : ""}
        		${isCompareSelected ? "child-score-compare" : ""}
        		${isBrandCompare ? "child-score-brand-compare-view" : ""}`}
				onClick={isSelected || isTagged ? null : onSelectClick}
				key={data?.type}
				style={
					isTagged
						? {
								borderLeft: `5px solid ${color}`
						  }
						: null
				}
				onMouseLeave={handleOnMouseLeave}
			>
				<div className={"child-score-header"}>
					{!isBrandCompare && (
						<Fragment>
							<div
								onClick={onTagClick}
								className={"individual-score-tag-container"}
							>
								<Icon
									name={isTagged ? "addRemove" : "add"}
									size={18}
									iconClass="individual-score-tag"
								/>
								<Icon
									name={isTagged ? "addRemove" : "addBlue"}
									size={18}
									iconClass="individual-score-tag-hover"
								/>
							</div>
						</Fragment>
					)}
				</div>
				{!isBrandCompare && (
					<div className={"child-score-content"}>
						<span className="child-score-heading">{data?.scoreHeading}</span>
						<div className={`child-score-values`}>
							{isCompareSelected ? (
								<Fragment>
									<DotWithLabel
										color={compareViewColors[0]}
										text={getScore(data?.score)}
									/>
									<DotWithLabel
										color={compareViewColors[1]}
										text={getScore(data?.compareScore)}
									/>
								</Fragment>
							) : (
								getScore(data?.score)
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ChildScore;
