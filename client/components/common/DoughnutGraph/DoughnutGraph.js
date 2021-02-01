import { Doughnut, Chart } from "react-chartjs-2";
import React from "react";

Chart.pluginService.register({
	afterUpdate: function(chart) {
		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
			var a = chart.config.data.datasets.length - 1;
			for (let i in chart.config.data.datasets) {
				var arc = chart.getDatasetMeta(i).data[
					chart.config.options.elements.arc.roundedCornersFor
				];

				arc.round = {
					x: (chart.chartArea.left + chart.chartArea.right) / 2,
					y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
					radius:
						chart.innerRadius + chart.radiusLength / 2 + a * chart.radiusLength,
					thickness: chart.radiusLength / 2 - 1,
					backgroundColor: arc._model.backgroundColor
				};
				a--;
			}
		}
	},

	afterDraw: function(chart) {
		if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
			var ctx = chart.chart.ctx;
			for (let i in chart.config.data.datasets) {
				var arc = chart.getDatasetMeta(i).data[
					chart.config.options.elements.arc.roundedCornersFor
				];
				var startAngle = Math.PI / 2 - arc._view.startAngle;
				var endAngle = Math.PI / 2 - arc._view.endAngle;

				ctx.save();
				ctx.translate(arc.round.x, arc.round.y);
				ctx.fillStyle = arc.round.backgroundColor;
				ctx.beginPath();
				ctx.arc(
					arc.round.radius * Math.sin(startAngle),
					arc.round.radius * Math.cos(startAngle),
					arc.round.thickness,
					0,
					2 * Math.PI
				);
				ctx.arc(
					arc.round.radius * Math.sin(endAngle),
					arc.round.radius * Math.cos(endAngle),
					arc.round.thickness,
					0,
					2 * Math.PI
				);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
			}
		}
	}
});

const DoughnutGraph = props => {
	let centerText = true;
	const graphData = {};
	let cutoutPercentage = 85;
	if (Array.isArray(props?.overallScore)) {
		if (props.brandCompareView) {
			centerText = false;
			cutoutPercentage = 55;
			const datasets = props?.overallScore.map((score, i) => {
				const bgColors = ["#16ABE0", "#FF97B5", "#A98DCD"];
				return {
					backgroundColor: [bgColors[i], "#f3f5f8"],
					borderColor: ["#fff", "#fff", "#fff"],
					hoverBorderColor: "#FFF",
					hoverBackgroundColor: [bgColors[i], "#f3f5f8"],
					data: [score, 100 - score]
				};
			});
			graphData.datasets = datasets;
		} else {
			centerText = false;
			cutoutPercentage = 70;
			const datasets = props?.overallScore.map((score, i) => {
				const bgColors = ["#4EC7F0", "#FFBF7A"];
				return {
					backgroundColor: [bgColors[i], "#f3f5f8"],
					borderColor: ["#fff", "#fff"],
					hoverBorderColor: "#FFF",
					hoverBackgroundColor: [bgColors[i], "#f3f5f8"],
					data: [score, 100 - score]
				};
			});
			graphData.datasets = datasets;
		}
	} else {
		const bgColor = overallScore => {
			if (overallScore <= 40) {
				return "#FF7A77";
			} else if (overallScore >= 70) {
				return "#63D9D1";
			} else if (40 < overallScore < 70) {
				return "#FEC356";
			}
		};
		graphData.datasets = [
			{
				backgroundColor: [bgColor(props?.overallScore), "#f3f5f8"],
				borderColor: ["#fff", "#fff"],
				hoverBorderColor: "#FFF",
				hoverBackgroundColor: [bgColor(props?.overallScore), "#f3f5f8"],
				data: [props?.overallScore, 100 - props?.overallScore]
			}
		];
	}

	return (
		<div
			style={{
				width: "180px",
				height: "180px",
				marginTop: "26px"
			}}
		>
			<Doughnut
				redraw
				data={graphData}
				width={180}
				height={180}
				options={{
					aspectRatio: 1,
					tooltips: {
						enabled: false
					},
					legend: {
						display: false
					},
					layout: {
						padding: 5
					},
					elements: {
						arc: {
							roundedCornersFor: 0
						}
					},
					cutoutPercentage: cutoutPercentage,
					plugins: { textCenter: centerText }
				}}
				plugins={{
					id: "textCenter",
					beforeDraw: function(chart) {
						var width = chart.chart.width,
							height = chart.chart.height,
							ctx = chart.chart.ctx;
						ctx.restore();
						ctx.font = "300 34px GothamNarrow-Light";
						ctx.fillStyle = "#212129";
						ctx.textBaseline = "middle";
						var text =
								props?.overallScore === null
									? `NA`
									: `${props?.overallScore || 0}%`,
							textX = Math.round((width - ctx.measureText(text).width) / 2),
							textY = height / 2;

						ctx.fillText(text, textX, textY);
						ctx.save();
					}
				}}
			/>
		</div>
	);
};

export default DoughnutGraph;
