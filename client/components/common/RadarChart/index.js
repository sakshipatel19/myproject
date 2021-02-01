import React from "react";
import { Radar } from "react-chartjs-2";
import {
	COLOR_NORMAL,
	RADAR_CHART_LINE_COLOR,
	RADAR_CHART_BG_COLOR
} from "../../../constants/colors";

const options = {
	legend: {
		display: false,
		labels: {
			fontSize: 10,
			padding: 10,
			fontColor: COLOR_NORMAL,
			fontFamily: "NotoSans-Regular"
		}
	},
	title: {
		display: false
	},

	// startAngle: -45,
	scale: {
		gridLines: {
			circular: true,
			color: RADAR_CHART_LINE_COLOR[0]
		},

		ticks: {
			startAngle: 90,
			display: true,
			beginAtZero: false,
			suggestedMax: 4,
			maxTick: 4,
			fontSize: 15,
			fontColor: COLOR_NORMAL,
			fontFamily: "NotoSans-Condensed"
		}
	},
	tooltips: {
		enabled: false
	}
};

class RadarChart extends React.Component {
	constructor(props) {
		super(props);
	}
	getChartData = canvas => {
		const chartData = this.props.data || {};
		const brandCompareView = this.props.brandCompareView;
		if (chartData?.datasets) {
			const colors = [RADAR_CHART_LINE_COLOR[1], RADAR_CHART_LINE_COLOR[2]];
			const backgroundColor = RADAR_CHART_BG_COLOR;
			chartData.datasets.forEach((set, i) => {
				set.pointBorderColor = colors[i];
				set.pointBorderWidth = 2;
				set.borderWidth = 2;
				set.pointRadius = 3;
				set.borderColor = colors[i];
				set.backgroundColor = backgroundColor[i];
				set.pointBackgroundColor = "#fff";
			});
		}
		return chartData;
	};
	render() {
		return (
			<div>
				<Radar
					redraw
					data={this.getChartData}
					options={options}
					width={341}
					height={254}
				/>
			</div>
		);
	}
}

export default RadarChart;
