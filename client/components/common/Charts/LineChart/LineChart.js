import React, { Component, Fragment, PureComponent } from "react";
import { isNullOrUndefined } from "../../../../utils/number";
import DifferenceIndicator from "../../DifferenceIndicator";
import Pill from "../../Pill";
import ChartWrapper from "./ChartWrapper";
import { numberFormat, styles } from '../../../../utils/number';
import "./LineChart.scss";

class LineChart extends PureComponent {
	state = {
		pillIndex: null
	};

	onMouseHover = pillIndex => {
		this.setState({ pillIndex });
	};

	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.props.labelTextFormat
				? this.props.labelTextFormat(score)
				: `${score}%`;
	otherScoreFormat = (score) => {
		return this.props.countryCode ? numberFormat(score, this.props.countryCode, styles.decimal) : score;
	}
	render() {
		const {
			hidePills,
			data,
			properties,
			isCompareSelected,
			isBrandCompare,
			onRemovePill,
			labelTextFormat,
			selectedChart,
			isRequireScoreHeader,
			scoreType
		} = this.props;

		if (!data?.length) return (<div className={"line-chart-container"}></div>);
		return (
			<div className={"line-chart-container"}>
				{!hidePills && (
					<div className={"div-chart-legends"}>
						{data?.map((val, i) => {
							let score = val?.score;
							let compareScore = val?.compareScore;
							const label = val?.scoreHeading;
							let difference = val?.difference;
							let hoverValue = null;

							if (!isNullOrUndefined(this.state.pillIndex)) {
								const index =
									this.state.pillIndex === val?.graphData?.length
										? this.state.pillIndex - 1
										: this.state.pillIndex;

								hoverValue = val?.graphData[index];
								score = isCompareSelected
									? hoverValue?.initialValue
									: hoverValue?.value;
								compareScore = hoverValue?.compareValue;
								difference = hoverValue?.value;
							}
							return (
								<Fragment key={`${val.type}_${i}`}>
									<Pill
										key={`${val.type}_${i}`}
										label={label}
										score={score}
										compareScore={compareScore}
										difference={difference}
										color={properties?.lineColors[i]}
										length={data?.length}
										isCompareSelected={isCompareSelected}
										onRemovePill={() => onRemovePill(val.type)}
										isBrandCompare={isBrandCompare}
										labelTextFormat={labelTextFormat}
										isSelected={selectedChart === val.type}
									/>

									{val?.otherScoresDataList &&
										val?.otherScoresDataList?.map(e => {
											let score = e.initial;
											let difference = e.difference;
											let compareScore = e.compare;
											if (hoverValue) {
												const val = hoverValue?.otherScoresData[e.key];
												score = val.initial;
												difference = val.difference;
												compareScore = val.compare;
											}

											return (
												<Pill
													key={`${val.type}_${e.key}`}
													label={e.heading}
													score={score}
													compareScore={compareScore}
													difference={difference}
													color={properties?.lineColors[i]}
													length={1}
													isCompareSelected={isCompareSelected}
													onRemovePill={() => { }}
													isBrandCompare={isBrandCompare}
													labelTextFormat={this.otherScoreFormat}
													isSelected={true}
												/>
											);
										})}
								</Fragment>
							);
						})}
					</div>
				)}

				{isRequireScoreHeader && (
					<div className={`individual-latest-score`}>
						{this.getScore(data[0]?.latestScore)}
						<DifferenceIndicator
							difference={data[0]?.difference}
							requireBraces
							className={"individual-latest-score-difference"}
						/>
					</div>
				)}

				<div className={"d3-line-chart-container"}>
					<ChartWrapper
						data={data}
						onHover={this.onMouseHover}
						properties={properties}
						isCompareSelected={isCompareSelected}
						scoreType={scoreType}
					/>
				</div>
			</div>
		);
	}
}

export default LineChart;
