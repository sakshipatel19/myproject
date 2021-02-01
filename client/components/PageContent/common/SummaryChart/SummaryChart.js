import React, { Component, Fragment } from "react";
import IndividualScore from "./IndividualScore";
import LodingIndicator from "../../../common/LoadingSkeleton/LoadingSquare";
import LineChartContainer from "../../../common/Charts/LineChart";
import Section from "../../../common/Section";
import {
	LINE_CHART_COLORS,
	LINE_CHART_COLOR_SHADES,
	OVERALL_SCORE_LINE_CHART_COLOR
} from "../../../../constants/colors";
import ChartHeader from "../../../common/Charts/LineChart/ChartHeader";
import DataLoadError from "../DataLoadError/DataLoadError";

const colors = LINE_CHART_COLORS;
const colorShades = LINE_CHART_COLOR_SHADES;

const selectors = [
	{ label: "DAILY", key: "daily" },
	{ label: "WEEKLY", key: "weekly" },
	{ label: "MONTHLY", key: "monthly" }
];

class SummaryChart extends Component {
	state = {
		selectedChart: {
			type: this.props.defaultSelectedChart || "overallScore",
			color: OVERALL_SCORE_LINE_CHART_COLOR
		},
		taggedCharts: [],
		taggedColorIndices: [],
		selectedChartColorIndex: -1,
		selectedSelectorTab: selectors[0].key
	};
	componentDidUpdate(prevProps) {
		if (prevProps.isBrandCompare !== this.props.isBrandCompare) {
			this.setState({
				selectedChart: {
					type: this.props.defaultSelectedChart || "overallScore",
					color: OVERALL_SCORE_LINE_CHART_COLOR
				},
				taggedCharts: [],
				taggedColorIndices: [],
				selectedChartColorIndex: -1,
				selectedSelectorTab: selectors[0].key
			});
		}
		if (prevProps.defaultSelectedChart !== this.props.defaultSelectedChart) {
			this.setState({
				selectedChart: {
					type: this.props.defaultSelectedChart || "overallScore",
					color: OVERALL_SCORE_LINE_CHART_COLOR
				}
			});
		}
	}
	OnSelectChart = selectedChart => {
		let colorIndex = this.getAvailableColorIndex(true);
		let element = {
			type: selectedChart,
			color:
				selectedChart !== "overallScore"
					? colors[colorIndex]
					: OVERALL_SCORE_LINE_CHART_COLOR
		};
		this.setState({
			selectedChart: element,
			selectedChartColorIndex: colorIndex
		});
	};

	isChartTagged = type => {
		return this.state.taggedCharts.map(e => e.type).indexOf(type) >= 0;
	};

	getAvailableColorIndex = (usedInSelectedChart = false) => {
		let { taggedColorIndices, selectedChartColorIndex } = this.state;
		let index = -1;
		if (taggedColorIndices.length !== 0)
			index = Math.max(...taggedColorIndices);
		index = (index + 1) % colors.length;
		while (
			(!usedInSelectedChart && selectedChartColorIndex === index) ||
			taggedColorIndices?.indexOf(index) !== -1
		)
			index++;
		return index;
	};

	onTagScore = chart => {
		let element;
		let {
			selectedChart,
			taggedCharts,
			taggedColorIndices,
			selectedChartColorIndex
		} = this.state;

		let children = [];
		let colorIndex = -1;
		let color = "";
		if (this.isChartTagged(chart.type)) {
			children = taggedCharts.find(e => chart.type === e.type).children;
			if (chart.type !== "overallScore") {
				taggedColorIndices.splice(
					taggedColorIndices.indexOf(
						colors.indexOf(taggedCharts.find(e => chart.type === e.type).color)
					),
					1
				);
			}
			taggedCharts.splice(
				taggedCharts
					.map(e => {
						return e.type;
					})
					.indexOf(chart.type),
				1
			);
			if (!chart.childOpen) {
				taggedCharts = taggedCharts.filter(e => children.indexOf(e.type) < 0);
			}
		} else {
			if (selectedChart.type === chart.type) {
				color = selectedChart.color;
				colorIndex = selectedChartColorIndex;
				selectedChartColorIndex = -1;
			} else {
				colorIndex = this.getAvailableColorIndex();
				color = colors[colorIndex];
			}
			if (chart.type !== "overallScore") taggedColorIndices.push(colorIndex);
			if (chart.parent !== undefined && this.isChartTagged(chart.parent)) {
				//for adding respective child to the children section of tagged parent
				element = taggedCharts.find(e => chart.parent === e.type);
				let index = taggedCharts.findIndex(e => chart.parent === e.type);
				element.children.push(chart.type);
				taggedCharts[index] = element;
			}
			if (chart.children !== undefined) children = chart.children; // child selected but not parent so need to append existing tagged child list to parent
			element = {
				type: chart.type,
				children: children,
				color:
					chart.type === "overallScore" ? OVERALL_SCORE_LINE_CHART_COLOR : color
			};
			taggedCharts = [...taggedCharts, element];
		}

		if (selectedChart.type === chart.type) selectedChart = {};
		this.setState({
			taggedCharts,
			selectedChart,
			taggedColorIndices,
			selectedChartColorIndex
		});
	};

	getGraphData = () => {
		const { selectedChart } = this.state;
		const { score, isBrandCompare } = this.props;

		if (isBrandCompare) return this.getBrandCompareData(selectedChart.type);

		let graphData = [];
		score?.data?.scoreList?.map(e => {
			if (e.type === selectedChart.type || this.isChartTagged(e.type)) {
				graphData.push(e);
			}
			if (e.childScoreDTOs !== null) {
				e.childScoreDTOs?.map(child => {
					if (
						child.type === selectedChart.type ||
						this.isChartTagged(child.type)
					) {
						graphData.push(child);
					}
				});
			}
		});
		return graphData;
	};

	getBrandCompareData = type => {
		const { score, compareBrands, asinCompareView } = this.props;
		let data = score?.data?.scoreList?.find(e => e.type === type)?.data;
		let compareBrandArray = compareBrands?.filter(e => e.isSelected);

		if (compareBrandArray?.length !== compareBrands?.length) {
			compareBrandArray = !asinCompareView ? compareBrandArray?.map(e => `${e.type}-${e.name}`) : compareBrandArray?.map(e => `${e.type}-${e.categoryList[0]?.asin[0]?.productId}`);
			data = data?.filter(
				e => compareBrandArray.indexOf(`${e.compareKey}-${e.type}`) >= 0
			);
		}
		return data;
	};

	getLineColors = graphData => {
		const { isBrandCompare, compareBrands, asinCompareView } = this.props;
		if (isBrandCompare) {

			return graphData?.map(e => {
				if (asinCompareView) {
					return compareBrands?.find(
						ele => ele.type === e.compareKey && ele.categoryList[0]?.asin[0]?.productId === e.type
					)?.color;
				} else {
					return compareBrands?.find(
						ele => ele.type === e.compareKey && ele.name === e.type
					)?.color;

				}
			}
			);
		}

		let { taggedCharts, selectedChart } = this.state;
		if (taggedCharts.length === 0 && selectedChart.type === undefined)
			//for very first time
			return [OVERALL_SCORE_LINE_CHART_COLOR];
		let lineColors = [];
		graphData.map(data => {
			if (this.isChartTagged(data.type)) {
				lineColors.push(taggedCharts.find(e => e.type === data.type).color);
			} else if (data.type === selectedChart.type)
				lineColors.push(selectedChart.color);
		});
		return lineColors;
	};

	onRemovePill = type => {
		let { selectedChart, taggedCharts } = this.state;
		if (type === selectedChart.type) {
			this.setState({ selectedChart: {} });
			return;
		}
		if (this.isChartTagged(type)) {
			taggedCharts.splice(
				taggedCharts
					.map(e => {
						return e.type;
					})
					.indexOf(type),
				1
			);
			this.setState({ taggedCharts });
		}
	};

	onSelectorChange = scoreType => {
		this.updateSelectorState(scoreType);
		this.props.onSelectorChange(scoreType);
	};
	updateSelectorState = (scoreType) => {
		this.setState({ selectedSelectorTab: scoreType });
	};
	render() {
		const {
			score,
			labelTextFormat,
			isBrandCompare,
			isCompareSelected,
			title = "Scores",
			hideSelectors,
			onSelectorChange,
			hideChartHeader = false,
			onRetryClick,
			onDownloadClick,
			downloadData,
			countryCode,
			enable = true,
			enableSectionHeader = true
		} = this.props;
		let graphData = this.getGraphData();

		let { selectedChart, taggedCharts } = this.state;

		if (!selectedChart?.type && !taggedCharts?.length) {
			selectedChart = {
				type: score?.data?.scoreList[0].type,
				color: OVERALL_SCORE_LINE_CHART_COLOR
			};
			if (isBrandCompare)
				graphData = this.getBrandCompareData(selectedChart.type);
			graphData = [score?.data?.scoreList[0]];
		}

		const lineColors = this.getLineColors(graphData);

		return (enable ?
			<Section className={`overall-score-container ${enableSectionHeader ? "section-header-main" : ""}`}>
				<div className={"overall-score-content"}>
					{!hideChartHeader && (
						<ChartHeader
							title={title}
							hideSelectors={hideSelectors}
							onSelectorChange={this.onSelectorChange}
							onDownloadClick={onDownloadClick}
							downloadData={downloadData}
							onSelectorUpdate={this.updateSelectorState}
						/>
					)}
					{score.fetching ? (
						<LodingIndicator />
					) : score.error ? (
						<DataLoadError handleRetry={onRetryClick} />
					) : (
								<Fragment>
									<LineChartContainer
										data={graphData}
										lineColors={lineColors}
										onRemovePill={this.onRemovePill}
										isCompareSelected={isCompareSelected}
										isBrandCompare={isBrandCompare}
										labelTextFormat={labelTextFormat}
										selectedChart={selectedChart.type}
										isRequireScoreHeader={
											score?.data?.scoreList?.length === 1 &&
											!isCompareSelected &&
											!isBrandCompare
										}
										scoreType={this.state.selectedSelectorTab}
										countryCode={countryCode}
									/>
									{score?.data?.scoreList?.length > 1 && (
										<div className={"individual-score-container"}>
											{score?.data?.scoreList?.map((e, i) => {
												return (
													<IndividualScore
														key={e.type}
														data={e}
														onSelectChart={this.OnSelectChart}
														isSelected={selectedChart.type === e.type}
														isTagged={this.isChartTagged(e.type)}
														onTagScoreClick={this.onTagScore}
														color={
															this.isChartTagged(e.type)
																? taggedCharts.find(e1 => e.type === e1.type).color
																: OVERALL_SCORE_LINE_CHART_COLOR
														}
														colorShade={colorShades[0]}
														labelTextFormat={labelTextFormat}
														isBrandCompare={isBrandCompare}
														isCompareSelected={isCompareSelected}
														isChartTagged={this.isChartTagged}
														selectedChart={selectedChart}
														taggedCharts={taggedCharts}
													/>
												);
											})}
										</div>
									)}
								</Fragment>
							)}
				</div>
			</Section> : null
		);
	}
}

export default SummaryChart;
