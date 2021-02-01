import * as d3 from "d3";
import {
	DEFAULT_HOVER_COLOR,
	DEFAULT_BACKGROUND_COLOR
} from "../../../../constants/colors";

import { isNullOrUndefined } from "../../../../utils/number";

class D3Chart {
	constructor(element, properties) {
		this.properties = properties;
		this.element = element;
		this._drawChartArea(element);
	}

	_drawChartArea(element) {
		//creating chart area
		const svg = d3
			.select(element)
			.select(".d3-donut-outer-div-container")
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("width", this.properties.defaultWidth)
			.attr("height", this.properties.defaultHeight)
			.attr(
				"viewBox",
				`0 0 ${this.properties.defaultWidth} ${this.properties.defaultHeight}`
			)
			.classed("svg-content-responsive", true);

		if (this.properties.svgClassName)
			svg.classed(this.properties.svgClassName, true);

		const g = svg
			.append("g")
			.attr(
				"transform",
				`translate(${this.properties.margin.left}, ${this.properties.margin.top})`
			);

		this.svg = g;
	}

	updateProperties(properties) {
		this.properties = properties;
	}

	updateChartData(data, onHover) {
		const {
			width,
			height,
			donutWidth,
			initialColors,
			compareColors,
			isDateCompareSelected
		} = this.properties;

		const radius1 = Math.min(width, height) / 2;

		const radius2 = radius1 - donutWidth - 5;

		const color1 = d3
			.scaleOrdinal()
			.domain(data.map((d, i) => i))
			.range(initialColors);

		const color2 = d3
			.scaleOrdinal()
			.domain(data.map((d, i) => i))
			.range(compareColors);

		this.svg.select(".d3-pie-chart-initial-data").remove();

		const svg1 = this.svg
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			.attr("class", "d3-pie-chart-initial-data");

		const arc1 = d3
			.arc()
			.innerRadius(radius1 - donutWidth)
			.outerRadius(radius1);

		const outerArc1 = d3
			.arc()
			.innerRadius(radius1)
			.outerRadius(radius1);

		const pie1 = d3
			.pie()
			//.padAngle(0.02) // effectively dictates the gap between slices
			.value(d => d.score)
			.sort(null);

		const group1 = svg1
			.selectAll("g")
			.data(pie1(data))
			.enter()
			.append("g");

		group1
			.append("path")
			.attr("d", arc1)
			.attr("class", d => `d3-pie-chart-initial-path-${d.data?.type}`)
			.attr("fill", (d, i) => color1(i))
			.on("mousemove", d => this.onMouseHover(d.data))
			.on("mouseout", d => this.onMouseOut(d.data));

		const tooltip1 = group1
			.append("g")
			.attr("transform", (d, i) => {
				const center = outerArc1.centroid(d);
				const innerCenter = arc1.centroid(d);
				const height = center[1] < innerCenter[1] ? center[1] - 22 : center[1];
				const width = center[0] < innerCenter[0] ? center[0] - 29 : center[0];
				return `translate(${width}, ${height})`;
			})
			.attr("class", d => `d3-chart-tooltip-initial-${d.data?.type}`)
			.attr("opacity", "0");

		tooltip1
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("rx", "4")
			.attr("ry", "4")
			.attr("width", `${29}px`)
			.attr("height", "18px");

		//tooltip1.append("polygon").attr("points", "0,9 5,5 5,13");

		//"29,0 29,10 39,5"

		tooltip1
			.append("text")
			.attr("fill", "#FFFFFF")
			.attr("x", 3)
			.attr("y", 14)
			.html(d => this.getScore(d.data?.score));

		this.svg.select(".d3-pie-chart-compare-data").remove();

		if (isDateCompareSelected) {
			const svg2 = this.svg
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
				.attr("class", "d3-pie-chart-compare-data");

			const arc2 = d3
				.arc()
				.innerRadius(radius2 - donutWidth)
				.outerRadius(radius2);

			const innerArc2 = d3
				.arc()
				.innerRadius(radius2 - donutWidth)
				.outerRadius(radius2 - donutWidth);

			const pie2 = d3
				.pie()
				.value(d => d.compareScore)
				.sort(null);

			const group2 = svg2
				.selectAll("g")
				.data(pie2(data))
				.enter()
				.append("g");

			group2
				.append("path")
				.attr("d", arc2)
				.attr("class", d => `d3-pie-chart-compare-path-${d.data?.type}`)
				.attr("fill", (d, i) => color2(i))
				.on("mousemove", d => this.onMouseHover(d.data))
				.on("mouseout", d => this.onMouseOut(d.data));

			const tooltip2 = group2
				.append("g")
				.attr("transform", (d, i) => {
					const center = innerArc2.centroid(d);
					const innerCenter = arc2.centroid(d);
					const height =
						center[1] < innerCenter[1] ? center[1] - 22 : center[1];
					const width = center[0] < innerCenter[0] ? center[0] - 29 : center[0];
					return `translate(${width}, ${height})`;
				})
				.attr("class", d => `d3-chart-tooltip-compare-${d.data?.type}`)
				.attr("opacity", "0");

			//tooltip2.append("polygon").attr("points", "0,0 100,0 50,100");

			tooltip2
				.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("rx", "4")
				.attr("ry", "4")
				.attr("width", `${29}px`)
				.attr("height", "18px");

			tooltip2
				.append("text")
				.attr("fill", "#FFFFFF")
				.attr("x", 3)
				.attr("y", 14)
				.html(d => this.getScore(d.data?.compareScore));
		}
	}

	onMouseOut = d => {
		const ele = d3.select(this.element);

		ele.select(`.d3-pie-chart-initial-path-${d.type}`).attr("stroke", "none");

		ele
			.select(`.donut-chart-factor-${d.type}`)
			.style("background-color", DEFAULT_BACKGROUND_COLOR);

		ele.select(`.d3-pie-chart-compare-path-${d.type}`).attr("stroke", "none");
		ele.select(`.d3-chart-tooltip-initial-${d.type}`).attr("opacity", 0);
		ele.select(`.d3-chart-tooltip-compare-${d.type}`).attr("opacity", 0);
	};

	onMouseHover = d => {
		const ele = d3.select(this.element);

		if (d.score) {
			ele
				.select(`.d3-pie-chart-initial-path-${d?.type}`)
				.attr("stroke", DEFAULT_BACKGROUND_COLOR)
				.attr("stroke-opacity", "1")
				.attr("stroke-width", `${this.properties.hoverOffsetWidth}px`);

			if (!this.properties.hideMouseHover)
				ele.select(`.d3-chart-tooltip-initial-${d.type}`).attr("opacity", 1);
		}

		ele
			.select(`.donut-chart-factor-${d.type}`)
			.style("background-color", DEFAULT_HOVER_COLOR)
			.style("border-radius", "4px");

		if (d.compareScore) {
			ele
				.select(`.d3-pie-chart-compare-path-${d.type}`)
				.attr("stroke", DEFAULT_BACKGROUND_COLOR)
				.attr("stroke-opacity", "1")
				.attr("stroke-width", `${this.properties.hoverOffsetWidth}px`);

			if (!this.properties.hideMouseHover)
				ele.select(`.d3-chart-tooltip-compare-${d.type}`).attr("opacity", 1);
		}
	};

	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.properties?.labelTextFormat
			? this.properties.labelTextFormat(score)
			: `${score}%`;
}

export default D3Chart;
