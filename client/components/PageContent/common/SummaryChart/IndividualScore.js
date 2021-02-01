import React, { Fragment, useState, useEffect } from "react";

import Section from "../../../common/Section";
import LineChart from "../../../common/Charts/LineChart/ChartWrapper";
import Icon from "../../../common/Icon";
import DifferenceIndicator from "../../../common/DifferenceIndicator";
import DotWithLabel from "../../../common/DotWithLabel";
import VerticalSeparator from "../../../common/VerticalSeparator";
import { isNullOrUndefined } from "../../../../utils/number";
import {
	DATE_COMPARE_COLORS,
	OVERALL_SCORE_LINE_CHART_COLOR
} from "../../../../constants/colors";

import "./SummaryChart.scss";
import ChildScore from "./ChildScore";
import Tooltip from "../../../common/Tooltip/Tooltip";

const compareViewColors = DATE_COMPARE_COLORS;
const maxChartToShow = 5;
const maxChartSelectedMsg = `Maximum of ${maxChartToShow} attributes can be added for comparision.`;

const IndividualScore = props => {
	const {
		data,
		isSelected,
		isTagged,
		labelTextFormat,
		onTagScoreClick,
		onSelectChart,
		color,
		isBrandCompare,
		isCompareSelected,
		isChartTagged,
		selectedChart,
		taggedCharts
	} = props;
	const [childOpen, setChildOpen] = useState(false);
	const [maxLimitedReached, setMaxLimitReached] = useState(false);

	useEffect(() => {
		if (maxLimitedReached) setTimeout(() => setMaxLimitReached(false), 5000);
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
		let children = [];
		if (
			data?.childScoreDTOs !== null &&
			data?.childScoreDTOs !== undefined &&
			!isTagged
		) {
			//no need to add children when already tagged
			data?.childScoreDTOs?.map(child => {
				if (isChartTagged(child.type)) children.push(child.type);
			});
		}
		const item = { type: data?.type, childOpen: childOpen, children: children };
		data?.childScoreDTOs !== null &&
			data?.childScoreDTOs !== undefined &&
			!childOpen &&
			!isTagged &&
			setChildOpen(true);
		onTagScoreClick(item);
	};
	const onSelectClick = e => {
		e.stopPropagation();
		data?.childScoreDTOs !== null &&
			data?.childScoreDTOs !== undefined &&
			!childOpen &&
			setChildOpen(true);
		if (
			data?.childScoreDTOs !== null &&
			data?.childScoreDTOs !== undefined &&
			!childOpen
		) {
			//for handling maxLimit of charts when child is present
			if (isTagged) return;
			else {
				if (taggedCharts.length >= maxChartToShow) {
					setChildOpen(true);
					setMaxLimitReached(true);
					return;
				}
			}
		}
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

	const lineChartProperties = () => {
		return {
			height: 52,
			width: 168,
			margin: { left: 0, right: 0, top: 0, bottom: 0 },
			defaultWidth: 168,
			defaultHeight: 52,
			hideYaxis: true,
			hideXaxis: true,
			hideGradients: false,
			hideMouseHover: true,
			lineColors: [color],
			lineWidth: 2,
			yAxisDomain: isCompareSelected ? [-100, 100] : [0, 100],
			isCompareSelected: isCompareSelected
		};
	};
	const onCloseChildren = () => {
		setChildOpen(false);
	};
	const getColorBarDiv = (
		i,
		height,
		backgroundColor,
		singleElement = false
	) => {
		return (
			<div
				key={i}
				className={`colorbar-${i}`}
				style={{
					height: `${height}%`,
					backgroundColor: backgroundColor,
					borderRadius: `${singleElement ? "10px 0 0 10px" : ""}`
				}}
			></div>
		);
	};
	const getChildrenColorLabel = (
		children,
		heightOfBar,
		noOtherChild = true
	) => {
		// noOtherChild is used to handle case when only parent is tagged with only one other child
		return children.map((child, i) => {
			return getColorBarDiv(
				i + 1,
				heightOfBar,
				taggedCharts.find(e => e.type === child).color,
				children.length === 1 && noOtherChild ? true : false
			);
		});
	};
	const getColorBar = () => {
		let childrenActive = [],
			label = "",
			heightOfBar = -1;
		if (data?.childScoreDTOs !== null && data?.childScoreDTOs !== undefined) {
			data?.childScoreDTOs?.map(child => {
				if (isChartTagged(child.type)) childrenActive.push(child.type);
			});
		}
		if (isTagged) {
			if (
				data?.childScoreDTOs === null ||
				data?.childScoreDTOs === undefined ||
				childOpen ||
				childrenActive.length === 0
			) {
				label = getColorBarDiv(0, 100, color, true);
			} else {
				heightOfBar = 100.0 / (childrenActive.length + 1);
				label = getChildrenColorLabel(childrenActive, heightOfBar, false);
				label.unshift(getColorBarDiv(0, heightOfBar, color)); //adding parent color too to the bar
			}
		} else {
			if (
				data?.childScoreDTOs !== null &&
				data?.childScoreDTOs !== undefined &&
				childrenActive.length !== 0 &&
				!childOpen
			) {
				// if active children are there and parent is not tagged and children menu isclosed
				heightOfBar = 100.0 / childrenActive.length;
				label = getChildrenColorLabel(childrenActive, heightOfBar);
			}
		}
		if (label === "") return null; //if no colorbar is present
		return <div className="colorbar">{label}</div>;
	};
	const getChildrenNodes = () => {
		const label = data?.childScoreDTOs?.map(e => {
			return (
				<ChildScore
					key={e.type}
					data={e}
					parent={data?.type}
					onSelectChart={onSelectChart}
					isSelected={selectedChart.type === e.type}
					isTagged={isChartTagged(e.type)}
					onTagScoreClick={onTagScoreClick}
					color={
						isChartTagged(e.type)
							? taggedCharts.find(i => e.type === i.type).color
							: OVERALL_SCORE_LINE_CHART_COLOR
					}
					labelTextFormat={labelTextFormat}
					isBrandCompare={isBrandCompare}
					isCompareSelected={isCompareSelected}
					taggedCharts={taggedCharts}
					isChartTagged={isChartTagged}
					selectedChart={selectedChart}
					maxChartSelectedMsg={maxChartSelectedMsg}
					maxChartToShow={maxChartToShow}
				/>
			);
		});
		return (
			<div className="child-scores-container">
				{label}
				<div className={`child-score-section-container child-close-container`}>
					<Icon
						name={"remove"}
						size={18}
						handleIconClick={onCloseChildren}
						iconClass="close-score-tag"
					/>
					<div className="close-parentScore-text">Close</div>
				</div>
			</div>
		);
	};
	return (
		<div
			className="individual-scores"
			style={
				(isSelected || isTagged) && !childOpen ? { boxShadow: "none" } : null
			}
		>
			{maxLimitedReached && <Tooltip data={maxChartSelectedMsg} />}
			<div
				style={
					data?.childScoreDTOs !== null &&
						data?.childScoreDTOs !== undefined &&
						!childOpen
						? { cursor: "pointer" }
						: null
				} //enable hovering always if child present
				className={`individual-score-section-container ${
					isSelected || isTagged ? "individual-score-selected" : ""
					}
				${childOpen ? "childPresent" : "childAbsent"}
			${isTagged ? "individual-score-section-tagged" : ""}
				${isCompareSelected ? "individual-score-comare" : ""}
				${isBrandCompare ? "individual-score-brand-compare-view" : ""}`}
				onClick={
					isSelected || isTagged
						? data?.childScoreDTOs !== null &&
							data?.childScoreDTOs !== undefined &&
							!childOpen //to open childMenu again once it's closed after tagging/selecting
							? onSelectClick
							: null
						: onSelectClick
				}
				key={data?.type}
				onMouseLeave={
					maxLimitedReached ? () => setMaxLimitReached(false) : null
				}
			>
				<Section className={`individual-score-section`}>
					{getColorBar()}
					<div className="score-section-content">
						<div className={"individual-score-header"}>
							{data?.scoreHeading}
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
							<div className={"individual-score-content"}>
								<div className={`individual-score-values`}>
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
								{(isSelected || isTagged) &&
									(isCompareSelected ? (
										<Fragment>
											<VerticalSeparator
												className={"individual-score-vertical-separator"}
											/>
											<DifferenceIndicator
												difference={data?.difference}
												labelTextFormat={labelTextFormat}
											/>
										</Fragment>
									) : (
											<div className="individual-latest-scores">
												<div className={"latest-score-value-text"}>
													{getScore(data?.latestScore)}
												</div>
												<DifferenceIndicator
													difference={data?.difference}
													labelTextFormat={labelTextFormat}
												/>
											</div>
										))}
							</div>
						)}
						{!isSelected && !isTagged && !isBrandCompare && data && (
							<div className={"individual-score-chart"}>
								<LineChart
									properties={lineChartProperties()}
									data={[data]}
									isCompareSelected={isCompareSelected}
								/>
							</div>
						)}
					</div>
				</Section>
			</div>
			{childOpen && getChildrenNodes()}
		</div>
	);
};

export default IndividualScore;
