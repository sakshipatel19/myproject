import * as d3 from "d3";
import { DATE_COMPARE_COLORS } from "../../../../constants/colors";
import { isNullOrUndefined } from "util";
import * as util from "../Utils";
class D3Bar {
	constructor(element, properties) {
		this.properties = properties;
		this.element = element;
		d3.selection.prototype.moveToFront = this.moveFront;
		this.init(element);
	}
	/**
	 * @param {*} element
	 * Initializes the chart with SVG and X-Axis, Y-Axis placeholders
	 */

	init(el) {
		const {
			defaultHeight,
			defaultWidth,
			margin,
			svgClassName,
			yAxisHeight
		} = this.properties;
		const chartAreaProps = {
			defaultWidth,
			defaultHeight,
			margin,
			svgClassName
		};
		this.chartSvg = util.createChartArea(el, chartAreaProps);
		this.xAxis = util.drawXAxis(this.chartSvg, yAxisHeight);
		this.yAxis = util.drawYAxis(this.chartSvg);
	}
	/**
	 *
	 * @param {*} properties
	 * Updates the properties and sets the respective values for tooltip
	 *
	 */
	updateProperties(properties) {
		this.properties = properties;
		this.tooltipWidth = this.properties.isDateCompareSelected ? 50 : 30;
		this.tooltipHeight = this.properties.isDateCompareSelected ? 80 : 20;
		this.anchorGutterVal = this.properties.isDateCompareSelected ? 10 : 4;
		this.anchorSize = 6;
		this.hoverBarHeightVal = 70;
		const data = properties?.data || [];
		if (data.length > 0 && data[0].attributes) {
			this.updateChart(data);
		}
	}
	/**
	 *
	 * @param {*} data
	 * Updates the chart with new data
	 *
	 */
	updateChart(data) {
		// Chart set up methods
		this.chartSvg.selectAll(".bar-group").remove(); // Clear the existing Bars
		this.x = this.getScaleBand(data, 0.02); // Create new band scale based on the data labels
		this.y = this.getScaleLinear(); // Create new Linear scale with range 0-100
		this.createXScale(data); // Create X-Axis scale
		this.createYScale(); // Create Y-Axis scale and Grid lines
		// Bars creation methods
		this.barGroup = this.createBarGroup(data); // Create a group wrapper for each bars
		this.createHoverBars(); // Create a highlight on over bar
		this.createScoreBars(data); // Create actual bar lines based on the score
		this.properties.isDateCompareSelected && this.createCompareScoreBars(data); // Create actual bar lines based on the comparescore
		this.createXScaleText(); // Creates the X-Axis labels, by creating seperately it will be convinient to align
		this.properties.isContentAttribute && this.createActionIcon();
		// Tooltips creation methods
		this.tooltipGroup = this.createToolTipGroup();
		this.createToolTip();
		this.createToolTipAnchor();
	}
	getScaleBand(data, padding = 0.7) {
		let xDomain = [];
		for (let key in data) {
			xDomain = xDomain.concat(data[key]?.attributes?.map(e => e.name));
		}
		return d3
			.scaleBand()
			.domain(xDomain)
			.rangeRound([0, this.properties.width])
			.paddingInner(padding)
			.paddingOuter(0.4)
			.align(0.5);
	}
	getScaleLinear() {
		return d3
			.scaleLinear()
			.domain(this.properties.yAxisDomain)
			.range([this.properties.yAxisHeight, 0]);
	}
	createXScale(data) {
		this.xAxis
			.transition()
			.duration(1500)
			.call(
				d3
					.axisBottom(this.getScaleBand(data))
					.tickSize(0)
					.tickFormat("")
			);
	}
	createYScale() {
		this.yAxis.yAxis
			.transition()
			.duration(1500)
			.call(this.getYAxis(this.y).tickFormat(e => (e === 0 ? "" : e)));
		this.yAxis.yGrid.call(
			this.getYAxis(this.y, 10, -this.properties.width).tickFormat("")
		);
	}
	getYAxis(y, ticks = 6, tsize = 0) {
		return d3
			.axisLeft(y)
			.ticks(ticks)
			.tickSize(tsize);
	}
	createBarGroup(data) {
		let barGroupData = [];
		!this.properties.isContentAttribute && this.createWrapEl(data);
		data.forEach(item => {
			barGroupData = barGroupData.concat(item.attributes);
		});
		const barGroup = this.chartSvg.selectAll(".bar-group").data(barGroupData);
		return barGroup
			.enter()
			.append("g")
			.classed("bar-group", true)
			.on("mouseover", function (d) {
				d3.select(this).moveToFront(); // to avoid the tooltip from overlapping on other bars we need to move the current over bar to front
			});
	}
	moveFront() {
		return this.each(function () {
			const currentPos = Array.prototype.indexOf.call(
				this.parentNode.children,
				this
			);
			if (this.parentNode.children.length !== currentPos + 1) {
				// when the mouse overs on the same bar no need to append again
				this.parentNode.appendChild(this);
			}
		});
	}
	createWrapEl(data) {
		const x = this.x,
			y = this.y;
		const barWrap = this.chartSvg.selectAll(".bar-wrap").data(data);
		const barWrapGroup = barWrap
			.enter()
			.append("g")
			.classed("bar-wrap", true);
		barWrapGroup
			.append("rect")
			.classed("section-highlight", true)
			.classed("light-shade", (d, i) => (i + 1) % 2 === 0)
			.attr("x", d => x(d.attributes[0].name))
			.attr("y", 0)
			.attr("width", d => x.bandwidth() * d.attributes.length)
			.attr("height", this.properties.yAxisHeight + this.hoverBarHeightVal);
		barWrapGroup
			.append("rect")
			.classed("section-title", true)
			.classed("light-shade", (d, i) => (i + 1) % 2 === 0)
			.attr("x", d => x(d.attributes[0].name))
			.attr("y", this.properties.yAxisHeight + this.hoverBarHeightVal + 2)
			.attr("width", d => x.bandwidth() * d.attributes.length)
			.attr("height", this.hoverBarHeightVal);
		barWrapGroup
			.append("text")
			.classed("section-title-text", true)
			.attr(
				"x",
				d => x(d.attributes[0].name) + x.bandwidth() * d.attributes.length * 0.5
			)
			.attr("y", this.properties.yAxisHeight + this.hoverBarHeightVal + 22)
			.attr("text-anchor", "middle")
			.text(d => d.header)
			.call(util.textwrap, 60);
	}
	createHoverBars() {
		const x = this.x,
			y = this.y;
		this.barGroup
			.append("rect")
			.classed("highlight", true)
			.attr("x", d => x(d.name))
			.attr("y", 0)
			.attr("width", x.bandwidth())
			.attr("height", this.properties.yAxisHeight + this.hoverBarHeightVal) // 50px added to the actual height to extend the highlight till the labels
			.attr("fill", "transparent");
	}
	createScoreBars() {
		this.barGroup
			.append("path")
			.style("fill", DATE_COMPARE_COLORS[0])
			.attr("d", d => this.createBarPath(d));
	}
	createCompareScoreBars() {
		this.barGroup
			.append("path")
			.style("fill", DATE_COMPARE_COLORS[1])
			.attr("d", d => this.createBarPath(d, "compare"));
	}
	createBarPath(d, key = "initial") {
		const x = this.x,
			y = this.y;
		const barWidth = this.properties.barWidth || 7;
		const rx = 3,
			ry = 3;
		const xalignVal = this.getAlignVal(barWidth, key); // align value to be added to the x position to keep the bars in the center of the highlight
		return d.score[key] === null || d.score[key] === 0
			? ""
			: `
			M${x(d.name) + xalignVal},${y(d.score[key]) + ry}
			a${rx},${ry} 0 0 1 ${rx},${-ry}
			h${barWidth - 2 * rx}
			a${rx},${ry} 0 0 1 ${rx},${ry}
			v${this.properties.yAxisHeight - y(d.score[key]) - ry}
			h${-barWidth}Z
		  `;
	}
	getAlignVal(barWidth, key) {
		if (this.properties.isDateCompareSelected) {
			return (
				this.x.bandwidth() * 0.5 + (key === "initial" ? -(barWidth + 0.5) : 0.5)
			);
		} else {
			return this.x.bandwidth() * 0.5 - barWidth * 0.5;
		}
	}
	createXScaleText() {
		const x = this.x,
			y = this.y;
		const xalignVal = x.bandwidth() / 2 + 2;
		this.barGroup
			.append("text")
			.classed("xaxis-label", true)
			.attr("x", d => x(d.name) + xalignVal)
			.attr("y", this.properties.yAxisHeight + 10)
			.attr("width", x.bandwidth)
			.attr("text-anchor", "middle")
			.text(d => d.name)
			.call(util.textwrap, 50); // textwrap is an util method that wraps the longer labels to next line
	}

	createActionIcon() {
		const x = this.x,
			y = this.y;
		const xalignVal = x.bandwidth() / 2 + 2;
		const actionGroup = this.barGroup
			.append("g")
			.classed("action-icon-group", true)
			.classed("actionable", d => d.isActionable)
			.attr("transform", d => this.getActionIconTransform(d, xalignVal));
		actionGroup.append("path").attr("d", util.getActionIconCircle());
		actionGroup
			.filter(d => d.isActionable)
			.append("path")
			.attr("d", util.getActionYesIcon());
		actionGroup
			.filter(d => !d.isActionable)
			.append("polygon")
			.attr("points", util.getActionNoIcon());
	}
	createToolTipGroup() {
		const tooltipGroup = this.barGroup.append("g").classed("tool-tip", true);
		return tooltipGroup;
	}
	createToolTip() {
		this.tooltipGroup
			.append("rect")
			.classed("tool-tip", true)
			.attr("width", this.tooltipWidth)
			.attr("height", this.tooltipHeight)
			.attr("x", d => this.getXYCoordinates(d).x)
			.attr("y", d => this.getXYCoordinates(d).y)
			.attr("rx", "5");

		if (this.properties.isDateCompareSelected) {
			this.createDotForToolTip(0.15, 0.4, DATE_COMPARE_COLORS[0], 8);
			this.createDotForToolTip(0.15, 0.7, DATE_COMPARE_COLORS[1], 8);
			this.tooltipGroup
				.append("path")
				.classed("trend", true)
				.classed("up", d => d.score.difference > 0)
				.attr("transform", d => this.getTrendTransform(d))
				.attr("d", d =>
					d.score.difference === 0 || this.getScore(d.score.difference) === "NA"
						? ""
						: util.getTrendIconPath()
				);
			this.createToolTipText(0.35, 0.2, "difference", "score-diff");
			this.createToolTipText(0.7, 0.5, "initial");
			this.createToolTipText(0.7, 0.8, "compare");
		} else {
			this.createToolTipText(0.5, 0.7, "initial");
		}
	}
	createToolTipText(xFactor, yFactor, key, className) {
		this.tooltipGroup
			.append("text")
			.classed(`tool-tip-text ${className ? className : ""}`, true)
			.classed("up", d => d.score[key] > 0)
			.classed("zero", d => d.score[key] == 0)
			.classed("na", d => this.getScore(d.score[key]) === "NA")
			.attr("width", this.tooltipWidth)
			.attr("x", d => this.getXYCoordinates(d).x + this.tooltipWidth * xFactor)
			.attr("y", d => this.getXYCoordinates(d).y + this.tooltipHeight * yFactor)
			.attr("text-anchor", "middle")
			.text(d => this.getScore(d.score[key]));
	}
	createDotForToolTip(xFactor, yFactor, color, size) {
		this.tooltipGroup
			.append("rect")
			.attr("width", size)
			.attr("height", size)
			.attr("x", d => this.getXYCoordinates(d).x + this.tooltipWidth * xFactor)
			.attr("y", d => this.getXYCoordinates(d).y + this.tooltipHeight * yFactor)
			.attr("fill", color);
	}
	getXYCoordinates(d) {
		const y = this.y;
		let yPos = this.getYPos(d);
		const xPos = this.getXPos(d, yPos);
		const key = this.properties.isDateCompareSelected ? "compare" : "initial";
		if (yPos === 0 || key === "compare") {
			yPos = y(d.score[key]) - this.tooltipHeight * 0.5;
			yPos = yPos < 0 ? 0 : yPos;
			yPos =
				yPos + this.tooltipHeight > this.properties.yAxisHeight
					? yPos - (yPos + this.tooltipHeight - this.properties.yAxisHeight)
					: yPos;
		} else {
			yPos = yPos - this.anchorSize;
		}
		return {
			x: xPos,
			y: yPos
		};
	}
	getYPos(d) {
		const y = this.y;
		const key = this.properties.isDateCompareSelected ? "compare" : "initial";
		const score = isNullOrUndefined(d.score[key]) ? 0 : d.score[key];
		const yPos =
			y(score) - this.tooltipHeight <= 0 ? 0 : y(score) - this.tooltipHeight;
		return yPos;
	}
	getXPos(d, yPos) {
		const x = this.x;
		const barWidth = this.properties.barWidth || 7;
		const key = this.properties.isDateCompareSelected ? "compare" : "initial";
		let xPos;
		if (yPos === 0 || key === "compare") {
			xPos = x(d.name) + x.bandwidth() * 0.5 + barWidth + this.anchorSize;
		} else {
			xPos = x(d.name) + (x.bandwidth() * 0.5 - this.tooltipWidth * 0.5);
		}
		return xPos;
	}
	createToolTipAnchor() {
		this.tooltipGroup
			.append("polygon")
			.classed("tool-tip-anchor", true)
			.attr("points", d => this.getAnchorPath(d, this.anchorSize));
	}
	/**
	 *
	 * @param {data} d
	 * @param {number} anchorSize
	 * Return the triangle points for the Anchor "x0,y0 x1,y1 x2,y2"
	 *
	 */
	getAnchorPath(d, anchorSize) {
		const x = this.x,
			y = this.y;
		const barWidth = this.properties.barWidth || 7;
		const yPos = this.getYPos(d);
		const key = this.properties.isDateCompareSelected ? "compare" : "initial";
		let anchorGutter =
			yPos === 0 ? this.anchorGutterVal : -this.anchorGutterVal; // if the tooltip reached the top/bottom end the achor need to be moved down/up for some value

		if ((yPos > 0) & (key === "initial")) {
			return `${x(d.name) + x.bandwidth() * 0.5 - anchorSize * 0.5},${y(
				d.score[key]
			) - anchorSize} ${x(d.name) + x.bandwidth() / 2},${y(d.score[key])} ${x(
				d.name
			) +
			x.bandwidth() / 2 +
			anchorSize / 2},${y(d.score[key]) - anchorSize}`;
		} else if (
			yPos === 0 ||
			yPos >= this.properties.yAxisHeight - this.tooltipHeight - 10
		) {
			anchorGutter = d.score[key] === 100 ? 10 : anchorGutter;
			return `${x(d.name) + x.bandwidth() * 0.5 + barWidth},${y(d.score[key]) +
				anchorGutter} ${x(d.name) +
				x.bandwidth() * 0.5 +
				barWidth +
				this.anchorSize},${y(d.score[key]) +
				this.anchorSize * 0.5 +
				anchorGutter} ${x(d.name) +
				x.bandwidth() * 0.5 +
				barWidth +
				this.anchorSize},${y(d.score[key]) - anchorSize + anchorGutter}`;
		} else {
			return `${x(d.name) + x.bandwidth() * 0.5 + barWidth},${y(
				d.score[key]
			)} ${x(d.name) + x.bandwidth() * 0.5 + barWidth + this.anchorSize},${y(
				d.score[key]
			) +
			this.anchorSize * 0.5} ${x(d.name) +
			x.bandwidth() * 0.5 +
			barWidth +
			this.anchorSize},${y(d.score[key]) - anchorSize}`;
		}
	}
	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.properties?.labelTextFormat
				? this.properties.labelTextFormat(score)
				: `${score}%`;
	getTrendTransform(d) {
		// to rotate the trend icon svg
		let transform = "";
		if (d.score.difference < 0) {
			transform = `translate(${this.getXYCoordinates(d).x +
				this.tooltipWidth * 0.65},${this.getXYCoordinates(d).y +
				this.tooltipHeight * 0.09}) scale(${0.5},${0.5})`;
			transform = `${transform} rotate(180 10 9)`;
		} else {
			transform = `translate(${this.getXYCoordinates(d).x +
				this.tooltipWidth * 0.65},${this.getXYCoordinates(d).y +
				this.tooltipHeight * 0.11}) scale(${0.5},${0.5})`;
		}
		return transform;
	}
	getActionIconTransform(d, xalignVal) {
		const transform = `translate(${this.x(d.name) + xalignVal - 6},${this
			.properties.yAxisHeight + 50}) scale(${0.8},${0.8})`;
		return transform;
	}
}
export default D3Bar;
