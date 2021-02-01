import React, { useEffect, useState } from "react";

import BarChart from "./BarChart";
import BarGraph from "../BarGraph/BarGraph";
import Icon from "../Icon";
import "./BarChart.scss";

const BarChartContainer = ({ attributesScore }) => {
	const actionableList = () => {
		return attributesScore?.attributesInitial?.map((d, i) => (
			<div key={i} className="actionable-list-item">
				{d.isActionable ? (
					<Icon name="actionable" size={12} />
				) : (
					<Icon name="nonActionable" size={12} />
				)}
			</div>
		));
	};

	return (
		<div className="bar-chart-container">
			{/* <BarChart width={945} height={220} data={data} /> */}
			<BarGraph data={attributesScore?.attributesInitial} />
			<div className="actionable-list">{actionableList()}</div>
		</div>
	);
};

export default BarChartContainer;
