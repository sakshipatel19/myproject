import React, { useRef, useEffect, useState } from "react";
import { select, axisLeft, axisBottom, scaleLinear, scaleBand } from "d3";

import "./BarChart.scss";

const BarChart = ({ width, height, data }) => {
	const ref = useRef();

	useEffect(() => {
		const svg = select(ref.current);
		svg.attr("height", height).attr("width", width);

		const xScale = scaleBand()
			.domain(data.map(v => v.label))
			.range([0, width])
			.padding(0.7);

		const yScale = scaleLinear()
			.domain([0, 100])
			.range([height, 0]);

		const xAxis = axisBottom(xScale)
			.ticks(data.length)
			.tickSize(0)
			.tickPadding(15);

		svg
			.select(".x-axis")
			.style("transform", "translateY(220px)")
			.call(xAxis);

		const yAxis = axisLeft(yScale)
			.ticks(5)
			.tickSize(-width, 0, 0)
			.tickPadding(5);

		svg.select(".y-axis").call(yAxis);

		svg
			.selectAll(".bar")
			.data(data)
			.join("rect")
			.attr("class", "bar")
			.attr("x", (d, i) => xScale(d.label))
			.attr("width", xScale.bandwidth())
			.on("mouseenter", (v, index) => {
				svg
					.selectAll(".bar-tooltip")
					.data([v.value])
					.join("text")
					.attr("class", "bar-tooltip")
					.text(v.value)
					.attr("x", xScale(v.label) + xScale.bandwidth() / 2)
					.attr("y", yScale(v.value) - 10)
					.attr("text-anchor", "middle");
			})
			.on("mouseleave", () => svg.sel)
			.attr("y", d => yScale(d.value))
			.attr("height", d => height - yScale(d.value))
			.attr("fill", "#4CA0FA");
	}, [data]);

	const draw = () => {};

	return (
		<div className="chart-container">
			<svg ref={ref}>
				<g className="x-axis"></g>
				<g className="y-axis"></g>
			</svg>
		</div>
	);
};

export default BarChart;
