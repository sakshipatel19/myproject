import { Doughnut, Chart } from "react-chartjs-2";
import React from "react";

const LostBuyBoxPieChart = props => {
	const createGraphData = () => {
		const graphData = {};
		graphData.datasets = [];
		props?.scores &&
			props?.scores.forEach((scoresArr, i) => {
				graphData.datasets.push({
					data: scoresArr,
					backgroundColor: props.colors[i],
					borderWidth: 5,
					hoverBorderColor: "#fff",
					hoverBackgroundColor: props.colors[i]
				});
			});

		return graphData;
	};

	return (
		<div
			style={{
				width: "180px",
				height: "180px",
				marginRight: "30px"
			}}
		>
			<Doughnut
				redraw
				data={createGraphData()}
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
					cutoutPercentage: 60,
					rotation: 150
				}}
			/>
		</div>
	);
};

export default LostBuyBoxPieChart;
