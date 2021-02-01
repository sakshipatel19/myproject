import * as d3 from "d3";
import "./ChartWrapper.scss";
import {
	INDICATOR_COLOR_GREEN,
	INDICATOR_COLOR_RED,
	COLOR_NORMAL,
	OVERALL_SCORE_LINE_CHART_COLOR
} from "../../../../constants/colors";

class D3Chart {
	properties = {};
	colorRed = INDICATOR_COLOR_RED;
	colorGreen = INDICATOR_COLOR_GREEN;
	colorNormal = COLOR_NORMAL;
	tickLength = 8;
	transitionTime = 100;

	constructor(element, properties) {
		this.properties = properties;
		this.element = element;
		this._drawChartArea(element);
	}

	_drawChartArea(element) {
		const svg = d3
			.select(element)
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
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
		this._drawXAxis(g);
		this._drawYAxis(g);
		this._createLinearGradientDef(g);
		return g;
	}

	_createLinearGradientDef = element => {
		const linearGradientDef = element
			.append("defs")
			.append("linearGradient")
			.attr("id", "linear-gradient-dynamic")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "0%")
			.attr("y2", "100%");

		linearGradientDef
			.append("stop")
			.attr("offset", "0%")
			.style("stop-color", OVERALL_SCORE_LINE_CHART_COLOR)
			.style("stop-opacity", "0.2");

		linearGradientDef
			.append("stop")
			.attr("offset", "100%")
			.style("stop-color", OVERALL_SCORE_LINE_CHART_COLOR)
			.style("stop-opacity", "0");
	};

	_drawXAxis(element) {
		const xAxis = element
			.append("g")
			.attr("transform", `translate(0,${this.properties.height})`)
			.attr("text-anchor", "middle")
			.attr("class", "chart-x-axis");

		if (this.properties.xAxisClassName)
			xAxis.classed(this.properties.xAxisClassName, true);

		this.xAxis = xAxis;

		return xAxis;
	}

	_drawYAxis(element) {
		const grid = element.append("g").attr("class", "grid");
		const yAxis = element.append("g").attr("class", "chart-y-axis");

		if (this.properties.yAxisClassName)
			yAxis.classed(this.properties.yAxisClassName, true);
		this.yGrid = grid;
		this.yAxis = yAxis;
		return yAxis;
	}

	_createLineGroup(element) {
		const lines = element.append("g").attr("class", "lines");
		this.lines = lines;
		return lines;
	}

	updateProperties(properties) {
		this.properties = properties;
	}

	_createXAxisLine = (x, data) => {
		//getting length of the data
		const dataLength = data[0]?.graphData?.length;

		// //getting array of scale positions
		// var timeScales = data[0]?.graphData?.map(e => x(e.label));
		// const lastXPositionvalue = timeScales[timeScales.length - 1];
		// const firstXPositionvalue = timeScales[0];

		// No of ticks to show on X axis
		let tickLength =
			this.tickLength >= dataLength ? dataLength : this.tickLength;
		tickLength = data[0]?.graphData?.filter(
			(d, i) => i % Math.round(dataLength / tickLength) === 0
		).length;

		// costamize x axis ticks and labels
		const xAxis = d3
			.axisBottom(x)
			.tickValues(
				data[0]?.graphData
					?.filter((d, i) => i % Math.round(dataLength / tickLength) === 0)
					.map(e => e.label)
			)
			.tickSize(6)
			.tickPadding(4)
			// to change format of x value
			.tickFormat(e => e.split("~")[0]);

		// Create groupe element to Draw x Axis
		const drawXAxis = this.xAxis;

		// show xAxis
		const alignTicks = drawXAxis
			.transition()
			.duration(1500)
			.call(xAxis);

		// allign ticks based on index
		alignTicks.selectAll("text").style("text-anchor", (d, i) => {
			if (i === 0) return "start";
			if (i === tickLength - 1) return "end";
			return "middle";
		});
	};

	_createYAxisLine = y => {
		// costamize y axis ticks and labels
		const yAxis = d3
			.axisLeft(y)
			.ticks(6)
			.tickSize(0)
			.tickFormat(e =>
				this.properties.isCompareSelected ? e : e === 0 ? "" : e
			);

		// draw grid lines to y axis
		this.yGrid.call(
			d3
				.axisLeft(y)
				.ticks(10)
				.tickSize(-this.properties.width)
				.tickFormat("")
		);

		// create group element to draw y axis
		const drawYAxis = this.yAxis;

		//Show yAxis data
		drawYAxis
			.transition()
			.duration(this.transitionTime)
			.call(yAxis)
			//change color in axis tick labels
			.selectAll("text")
			.attr("fill", d => {
				return this.properties.isCompareSelected
					? d < 0
						? this.colorRed
						: this.colorGreen
					: this.colorNormal;
			});

		// hide y axis line
		drawYAxis.select("path").attr("fill", "none");
	};

	_createGradientAreaBelowLineChart = (x, y, data, color) => {
		//aplying white area to hide grid lines in selected area
		const areaWhite = this.svg.selectAll(".areaWhite").data([data[0]]);

		areaWhite
			.enter()
			.append("path")
			.attr("class", "areaWhite")
			.merge(areaWhite)
			.transition()
			.duration(this.transitionTime)
			.style("fill", "#fff")
			.attr("id", (d, i) => "tagWhiteArea_" + i)
			.transition()
			.duration(this.transitionTime)
			.attr("d", d =>
				d3
					.area()
					.defined(e => e.value != null)
					.x(e => x(e.label))
					.y0(this.properties.height)
					.y1(e => y(e.value))(d?.graphData)
			);

		//appending New area with opacity 0.1 of base color
		const area = this.svg.selectAll(".area").data([data[0]]);

		//this._createDefsGradientBackgroundArea(color(0));
		area
			.enter()
			.append("path")
			.attr("class", "area")
			.merge(area)
			.transition()
			.duration(this.transitionTime)
			.style("fill", "url(#linear-gradient-dynamic)")
			.attr("id", (d, i) => "tagArea_" + i)
			.transition()
			.duration(this.transitionTime)
			.attr("d", d =>
				d3
					.area()
					.defined(e => e.value != null)
					.x(e => x(e.label))
					.y0(this.properties.height)
					.y1(e => y(e.value))(d?.graphData)
			);
	};

	_createDefsGradientBackgroundArea = color => {
		this.svg
			.select("defs")
			.select("#linear-gradient-dynamic")
			.selectAll("stop")
			.style("stop-color", color);
	};

	_drawChartLines = (x, y, data, color) => {
		//create group element to draw lines and circles
		const lines = this.svg
			.append("g")
			.attr("class", "lines")
			.selectAll(".line-group")
			.data(data);

		// draw lines based on data
		lines
			.enter()
			.append("g")
			.attr("class", "line-group")
			.append("path")
			.transition()
			.delay(this.transitionTime)
			//.duration(this.transitionTime)
			.style("color", (d, i) => color(i))
			.attr("fill", "none")
			.attr("class", "line")
			.attr("stroke", (d, i) => color(i))
			.attr("stroke-width", this.properties.lineWidth)
			.attr("d", d =>
				d3
					.line()
					.defined(e => e.value != null)
					.x(e => x(e.label))
					.y(e => y(e.value))(d?.graphData)
			);

		// Draw circles based on points
		lines
			.selectAll(".circle-group")
			.data(data)
			.enter()
			.append("g")
			.attr("class", ".circle-group")
			.style("fill", (d, i) => color(i))
			.selectAll("circle")
			.data(d => d?.graphData)
			.enter()
			.append("g")
			.attr("class", "circle")
			.append("circle")
			.attr("cx", d => x(d.label))
			.attr("cy", d => y(d.value))
			.attr("r", d => {
				if (d.value) return this.properties.lineWidth / 2.0;
				else return 0;
			})
			.style("opacity", 0.5);
	};

	_createMouseOverEvent = (x, y, data, onHover) => {
		//getting array of scale positions
		var timeScales = data[0]?.graphData?.map(e => x(e.label));
		const lastXPositionvalue = timeScales[timeScales.length - 1];
		const firstXPositionvalue = timeScales[0];

		//creating group element for mouse over line
		var mouseG = this.svg.append("g").attr("class", "mouse-over-effects");

		// creating x axis tooltip group element
		const xAxistooltip = this.svg
			.append("g")
			.attr("class", "line-chart-tooltip")
			.style("opacity", 0);

		//draw mouse line path
		const mouseLine = mouseG
			.append("path")
			.attr("class", "mouse-line")
			.style("stroke", "black")
			.style("stroke-dasharray", ("2", "2"))
			.style("stroke-width", "1px")
			.style("opacity", "0");

		const { isCompareSelected, scoreType } = this.properties;
		let tooltipWidth = -1;

		//give width of scoreType weekly/monthly greater than usual
		if (!isCompareSelected) {
			if (scoreType === "daily") tooltipWidth = 48;
			else if (scoreType === "weekly") tooltipWidth = 90;
			else if (scoreType === "monthly") tooltipWidth = 38;
		} else {
			if (scoreType === "daily") tooltipWidth = 64;
			else if (scoreType === "weekly") tooltipWidth = 105;
			else if (scoreType === "monthly") tooltipWidth = 54;
		}

		//adding rect element to fill with black background
		xAxistooltip
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("rx", "4")
			.attr("ry", "4")
			.attr("width", `${tooltipWidth}px`)
			.attr("height", this.properties.isCompareSelected ? "34px" : "17px")
			.attr("fill", "#212129");

		//Adding text element to show initial Date
		xAxistooltip
			.append("text")
			.attr("class", "x-axis-hover-initial-text")
			.attr("fill", "#FFFFFF")
			.attr("x", this.properties.isCompareSelected ? 19 : 6)
			.attr("y", 12);

		if (this.properties.isCompareSelected) {
			//Adding text element to show compare Date
			xAxistooltip
				.append("text")
				.attr("class", "x-axis-hover-compare-text")
				.attr("fill", "#FFFFFF")
				.attr("x", 19)
				.attr("y", 27);

			xAxistooltip
				.append("circle")
				.attr("class", "x-axis-hover-initial-circle")
				.attr("fill", "#0676ED")
				.attr("r", "3")
				.attr("cx", 10)
				.attr("cy", 9);

			xAxistooltip
				.append("circle")
				.attr("class", "x-axis-hover-compare-circle")
				.attr("fill", "#F79764")
				.attr("r", "3")
				.attr("cx", 10)
				.attr("cy", 23);
		}

		const vis = this;

		mouseG
			.append("svg:rect") // append a rect to catch mouse movements on canvas
			.attr("width", this.properties.width) // can't catch mouse events on a g element
			.attr("height", this.properties.height)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("mouseout", () => {
				// on mouse out hide line, circles and text
				mouseLine.style("opacity", "0");
				xAxistooltip.style("opacity", 0);
				//update index on hover out to null
				onHover && onHover(null);
			})
			.on("mouseover", () => {
				// on mouse in show line, circles and text
				mouseLine.style("opacity", "1");
				// xAxistooltip.style("opacity", "1");
			})
			.on("mousemove", function () {
				// mouse moving over svg
				const height = vis.properties.height;

				// get mouse position on svg
				const m = d3.mouse(this);

				// read x axis position value
				let pos = m[0];

				//get index of interval where mouse is pointing
				let i = d3.bisect(timeScales, pos, 1);

				// get nearest position of index based on mouse point
				i =
					Math.abs(timeScales[i - 1] - pos) <
						Math.abs((timeScales[i] || pos) - pos)
						? i - 1
						: i;

				// adjusting index if it falls above total length
				if (i < 0) i = 0;
				else if (i > timeScales.length - 1) i = timeScales.length - 1;

				//set position to index value
				pos = timeScales[i];

				// set position to show mouse hover line
				mouseLine.attr(
					"d",
					() => "M" + pos + "," + height + " " + pos + "," + 0
				);

				// read the hovered position data
				const hoverData = data[0]?.graphData[i];

				//setting tooltip x axis position based on tooltip width and position
				let tooltipXPosition =
					lastXPositionvalue - pos < tooltipWidth
						? lastXPositionvalue - tooltipWidth
						: pos - firstXPositionvalue < tooltipWidth
							? firstXPositionvalue
							: pos - tooltipWidth / 2;

				// showing x axis tooltip, updating position and appending label value
				xAxistooltip
					.style("opacity", 1)
					.attr("transform", `translate(${tooltipXPosition}, ${height + 5})`)
					.select(".x-axis-hover-initial-text")
					.html(hoverData?.label);

				//onCompare Select appending compare label value
				if (vis.properties.isCompareSelected)
					xAxistooltip
						.select(".x-axis-hover-compare-text")
						.html(hoverData?.compareLabel);

				// setting index to show pills
				onHover && onHover(i);
			});
	};

	updateChartData(data, onHover) {
		//create x axis scale
		const x = d3
			.scalePoint()
			.domain(data[0]?.graphData?.map(e => e.label))
			.range([0, this.properties.width]);

		// remove x axis on re-rendering
		//this.svg.selectAll(".chart-x-axis").remove();

		// call x Axis to draw
		if (!this.properties.hideXaxis) this._createXAxisLine(x, data);

		let yAxisDomain = this.properties.yAxisDomain;

		if (this.properties.isCompareSelected) {
			let domainValues = [-30, 30];
			data.forEach(e => {
				domainValues = [
					...domainValues,
					...d3.extent(e.graphData, d => d.value)
				];
			});
			yAxisDomain = d3.extent(domainValues);
		}

		// create scale for y axis
		const y = d3
			.scaleLinear()
			.domain(yAxisDomain)
			.range([this.properties.height, 0]);

		// remove y axis on re-rendering
		//this.svg.selectAll(".chart-y-axis").remove();

		// remove y axis grids on re-rendering
		//this.svg.selectAll(".grid").remove();

		// call y Axis to draw
		if (!this.properties.hideYaxis) this._createYAxisLine(y);

		// get array of colors for data and assign color based on index
		var color = d3
			.scaleOrdinal()
			.domain(data.map((d, i) => i))
			.range(this.properties.lineColors);

		//to draw gradient color below the line
		if (
			!this.properties.hideGradients &&
			this.properties.lineColors[0] === OVERALL_SCORE_LINE_CHART_COLOR
		)
			this._createGradientAreaBelowLineChart(x, y, data, color);
		else {
			//remove existing area
			this.svg.selectAll(".area").remove();
			this.svg.selectAll(".areaWhite").remove();
		}

		//remove drawn lines on data change
		this.svg.selectAll(".lines").remove();

		// draw lines
		this._drawChartLines(x, y, data, color);

		//removing mouse over effect on data change
		this.svg.selectAll(".mouse-over-effects").remove();

		//removing mouse over tooltip
		this.svg.selectAll(".line-chart-tooltip").remove();

		if (!this.properties.hideMouseHover)
			this._createMouseOverEvent(x, y, data, onHover);
	}
}

export default D3Chart;
