import React, { Component, Fragment } from "react";
import LineChart from "./LineChart";
import "./LineChart.scss";

class LineChartContainer extends Component {
	getProperties = () => {
		const defaultWidth = 940;
		const defaultHeight = 240;
		const margin = { left: 30, right: 10, top: 10, bottom: 50 };
		const height = defaultHeight - margin.top - margin.bottom;
		const width = defaultWidth - margin.left - margin.right;
		return {
			height,
			width,
			margin,
			defaultWidth,
			defaultHeight,
			lineWidth: 3,
			lineColors: this.props.lineColors,
			hideYaxis: false,
			hideXaxis: false,
			hideGradients:
				this.props.isCompareSelected || this.props.isBrandCompare
					? true
					: false,
			hideMouseHover: false,
			yAxisDomain: this.props.isCompareSelected ? [-100, 100] : [0, 100],
			isCompareSelected: this.props.isCompareSelected,
			scoreType: this.props.scoreType
		};
	};

	render() {
		const {
			data,
			onRemovePill,
			isCompareSelected,
			isBrandCompare,
			labelTextFormat,
			selectedChart,
			isRequireScoreHeader,
			scoreType,
			countryCode
		} = this.props;

		return (
			<Fragment>
				<LineChart
					data={data}
					properties={this.getProperties()}
					onRemovePill={onRemovePill}
					isCompareSelected={isCompareSelected}
					isBrandCompare={isBrandCompare}
					labelTextFormat={labelTextFormat}
					selectedChart={selectedChart}
					isRequireScoreHeader={isRequireScoreHeader}
					scoreType={scoreType}
					countryCode={countryCode}
				/>
			</Fragment>
		);
	}
}

export default LineChartContainer;
