import * as d3 from "d3";
import { STACKED_BAR_CHAR } from "../../../../constants/colors";
import { isNullOrUndefined } from "util";
import * as util from "../Utils";

class D3StackedBar {
	constructor(element, properties) {
		this.properties = properties;
		this.element = element;
		this.scoreShades = STACKED_BAR_CHAR.NORMAL;
		this.compareShades = STACKED_BAR_CHAR.DATE_COMPARE;
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
		const { isDateCompareSelected, barWidth } = this.properties;
		this.barWidth = barWidth || 33;
		this.tooltipWidth = isDateCompareSelected ? 110 : 60;
		this.tooltipHeight = 180;
		this.tooltipTypeWidth = 60;
		this.tooltipTypeHeight = isDateCompareSelected ? 40 : 25;
		this.anchorGutterVal = 10;
		this.anchorSize = 6;
		const data = properties?.initial || [];
		this.compare = properties.compare || [];
		if (data.length > 0) {
			this.promotionTypes = this.getPromotionTypes(data);
			this.tooltipHeight =
				this.promotionTypes?.length <= 4 ? 140 : this.tooltipHeight;
			this.updateChart(data);
		}
	}
	getPromotionTypes(data) {
		const { promotionTypeList } = data[0];
		const promotionTypes = [];
		const regEx = / /gi;
		if (promotionTypeList === null) return null;
		promotionTypeList.forEach(item => {
			const countKey = item.typeHeading.toLowerCase().replace(regEx, "-");
			promotionTypes.push({
				name: item.typeHeading,
				countKey
			});
		});
		return promotionTypes;
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
		this.x = this.getScaleBand(data); // Create new band scale based on the data labels
		this.y = this.getScaleLinear(); // Create new Linear scale with range 0-100
		this.createXScale(data); // Create X-Axis scale
		this.createYScale(); // Create Y-Axis scale and Grid lines

		// Bars creation methods
		this.barGroup = this.createBarGroup(data); // Create a group wrapper for each bars
		this.createScoreBars(); // Create actual bar lines based on the score
		this.createXScaleText(); // Creates the X-Axis labels, by creating seperately it will be convinient to align

		// Tooltips creation methods
		this.tooltipGroup = this.createToolTipGroup();
		this.createCommonToolTip();
		this.createTypesToolTip();
	}
	getScaleBand(data, padding = 0.2) {
		return d3
			.scaleBand()
			.domain(data.map(d => d.brandName))
			.rangeRound([0, this.properties.width])
			.paddingInner(padding)
			.paddingOuter(0.5)
			.align(0.4);
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
					.tickSize(6)
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
		return (
			d3
				.axisLeft(y)
				// .ticks(ticks)
				.tickSize(tsize)
		);
	}
	createBarGroup(data) {
		const barGroup = this.chartSvg.selectAll(".bar-group").data(data);
		return barGroup
			.enter()
			.append("g")
			.classed("bar-group", true)
			.on("mouseover", function(d) {
				d3.select(this).moveToFront(); // to avoid the tooltip from overlapping on other bars we need to move the current over bar to front
			});
	}
	moveFront() {
		return this.each(function() {
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
	createHoverBars() {
		const x = this.x,
			y = this.y;
		this.barGroup
			.append("rect")
			.classed("highlight", true)
			.attr("x", d => x(d.brandName))
			.attr("y", 0)
			.attr("width", x.bandwidth())
			.attr("height", this.properties.yAxisHeight + 50) // 50px added to the actual height to extend the highlight till the labels
			.attr("fill", "transparent");
	}
	createScoreBars() {
		const x = this.x,
			y = this.y;
		const { isDateCompareSelected } = this.properties;

		this.xalignInitial = isDateCompareSelected
			? x.bandwidth() * 0.5 - this.barWidth - 2
			: x.bandwidth() * 0.5 - this.barWidth * 0.5;
		this.xalignCompare = x.bandwidth() * 0.5 + 2;
		this.createBar("initial", this.xalignInitial, this.scoreShades);
		isDateCompareSelected &&
			this.createBar("compare", this.xalignCompare, this.compareShades);
	}
	createBar(key, xalignVal, shades) {
		const x = this.x,
			y = this.y;
		const yAxisHeight = this.properties.yAxisHeight;
		let yVal = 0,
			lastY = [];
		this.promotionTypes?.forEach((type, index, arr) => {
			const rx = arr.length - 1 === index ? 3 : 0;
			this.barGroup
				.append("g")
				.classed(`${key} ${type.countKey}`, true)
				.append("rect")
				.attr("x", d => x(d.brandName) + xalignVal)
				.attr("y", (d, i) => {
					const score = this.getScore(key, index, d, i);

					if (index === 0) {
						yVal = y(score);
					} else {
						yVal = lastY[i] - (yAxisHeight - y(score));
					}
					lastY[i] = yVal;
					return yVal;
				})
				.attr("width", this.barWidth)
				.attr(
					"height",
					(d, i) => yAxisHeight - y(this.getScore(key, index, d, i))
				)
				.attr("fill", shades[index]);
		});
	}
	getScore(key, index, d, i) {
		return key === "initial"
			? d.promotionTypeList[index].count
			: this.compare[i].promotionTypeList[index].count;
	}
	createXScaleText() {
		const x = this.x,
			y = this.y;
		const xalignVal = x.bandwidth() * 0.5 + 2;
		this.barGroup
			.append("text")
			.classed("xaxis-label", true)
			.attr("x", d => x(d.brandName) + xalignVal)
			.attr("y", this.properties.yAxisHeight + 20)
			.attr("width", x.bandwidth)
			.attr("text-anchor", "middle")
			.text(d => d.brandName);
	}
	createToolTipGroup() {
		const tooltipGroup = this.barGroup.append("g");
		return tooltipGroup;
	}
	createCommonToolTip() {
		const x = this.x,
			y = this.y;
		const { isDateCompareSelected, yAxisHeight } = this.properties;
		const type =
			this.promotionTypes === null
				? {}
				: this.promotionTypes[this.promotionTypes.length - 1];
		const key = isDateCompareSelected ? "compare" : "initial";
		const xalignVal = isDateCompareSelected
			? this.xalignCompare
			: this.xalignInitial;
		const barGroup = this.barGroup.select(`.${key}.${type.countKey}`);
		this.tooltipGroup
			.append("rect")
			.classed("tool-tip", true)
			.attr("width", this.tooltipWidth)
			.attr("height", this.tooltipHeight)
			.attr(
				"x",
				d => x(d.brandName) + xalignVal + this.barWidth + this.anchorSize
			)
			.attr("y", (d, i) => this.getToolTipYPos(d, i, barGroup))
			.attr("rx", "5");
		this.createToolTipContent(xalignVal, barGroup);
		this.createToolTipAnchor(xalignVal, barGroup);
	}
	getToolTipYPos(d, i, barGroup) {
		let yVal = 0;
		barGroup.each(function(d, index) {
			if (i === index) {
				yVal = parseFloat(this.firstChild.getAttribute("y"));
			}
		});
		yVal = yVal - this.tooltipHeight * 0.5;
		if (yVal + this.tooltipHeight > this.properties.yAxisHeight) {
			yVal =
				yVal - (yVal + this.tooltipHeight * 0.95 - this.properties.yAxisHeight);
		} else if (yVal <= 0) {
			yVal = 0;
		}
		return yVal;
	}
	createToolTipContent(xalignVal, barGroup) {
		this.initialSum = [];
		this.compareSum = [];
		const options = {
			xalignVal,
			barGroup
		};
		this.promotionTypes?.forEach((type, index, arr) => {
			Object.assign(options, {
				index,
				arr,
				countKey: type.countKey,
				scoreType: "initial",
				shades: this.scoreShades
			});

			this.createDotForToolTip(options, 10);
			this.createToolTipText(options, 5);
			if (this.properties.isDateCompareSelected) {
				options.scoreType = "compare";
				options.shades = this.compareShades;
				this.createDotForToolTip(options, 60);
				this.createToolTipText(options, 10);
			}
		});
		options.scoreType = "initial";
		this.createToolTipSeperator(xalignVal, barGroup);
		this.createToolTipSumText(options, 5);
		if (this.properties.isDateCompareSelected) {
			options.scoreType = "compare";
			this.createToolTipSumText(options, 10);
		}
	}
	createToolTipText(opts, xVal) {
		const { xalignVal, barGroup, countKey, scoreType, index, arr } = opts;
		const x = this.x,
			y = this.y;
		const xPos =
			scoreType === "initial" && this.properties.isDateCompareSelected
				? this.tooltipWidth * 0.5
				: this.tooltipWidth;
		const format = d3.format(",");

		this.tooltipGroup
			.append("text")
			.classed(`tool-tip-text ${countKey}`, true)
			.attr(
				"x",
				d =>
					x(d.brandName) +
					xalignVal +
					this.barWidth +
					this.anchorSize +
					xPos -
					xVal
			)
			.attr(
				"y",
				(d, i) =>
					this.getToolTipYPos(d, i, barGroup) + (arr.length - index) * 24
			)
			.attr("text-anchor", "end")
			.text((d, i) => {
				let returnVal = "";
				if (scoreType === "initial") {
					this.initialSum[i] = d.promotionCount;
					returnVal = format(this.getScore(scoreType, index, d, i));
				} else {
					this.compareSum[i] = this.compare[i].promotionCount;
					returnVal = format(this.getScore(scoreType, index, d, i));
				}
				return returnVal;
			});
	}
	createDotForToolTip(opts, xVal) {
		const { xalignVal, barGroup, index, arr, shades } = opts;
		const x = this.x,
			y = this.y;
		this.tooltipGroup
			.append("rect")
			.classed("tool-tip-dot", true)
			.attr("width", 10)
			.attr("height", 10)
			.attr(
				"x",
				d => x(d.brandName) + xalignVal + this.barWidth + this.anchorSize + xVal
			)
			.attr(
				"y",
				(d, i) =>
					this.getToolTipYPos(d, i, barGroup) + (arr.length - index) * 24 - 8
			)
			.attr("fill", shades[index]);
	}
	createToolTipSeperator(xalignVal, barGroup) {
		const x = this.x,
			y = this.y;
		this.tooltipGroup
			.append("rect")
			.classed("tool-tip-dot", true)
			.attr("width", this.tooltipWidth)
			.attr("height", 1)
			.attr(
				"x",
				d => x(d.brandName) + xalignVal + this.barWidth + this.anchorSize
			)
			.attr(
				"y",
				(d, i) => this.getToolTipYPos(d, i, barGroup) + this.tooltipHeight - 30
			)
			.attr("fill", "#fff");
	}
	createToolTipSumText(opts, xVal) {
		const { xalignVal, barGroup, scoreType } = opts;
		const x = this.x,
			y = this.y;
		const xPos =
			scoreType === "initial" && this.properties.isDateCompareSelected
				? this.tooltipWidth * 0.5
				: this.tooltipWidth;
		const format = d3.format(",");

		this.tooltipGroup
			.append("text")
			.classed(`tool-tip-sum-text`, true)
			.attr(
				"x",
				d =>
					x(d.brandName) +
					xalignVal +
					this.barWidth +
					this.anchorSize +
					xPos -
					xVal
			)
			.attr(
				"y",
				(d, i) => this.getToolTipYPos(d, i, barGroup) + this.tooltipHeight - 10
			)
			.attr("text-anchor", "end")
			.text((d, i) =>
				scoreType === "initial"
					? format(this.initialSum[i])
					: format(this.compareSum[i])
			);
	}
	createToolTipAnchor(xalignVal, barGroup) {
		this.tooltipGroup
			.append("polygon")
			.classed("tool-tip-anchor", true)
			.attr("points", (d, i) => this.getAnchorPath(d, i, xalignVal, barGroup));
	}
	getAnchorPath(d, i, xalignVal, barGroup) {
		const x = this.x,
			y = this.y;
		const barWidth = this.barWidth;
		let yPos = 0;
		barGroup.each(function(d, index) {
			if (i === index) {
				yPos = parseFloat(this.firstChild.getAttribute("y"));
			}
		});

		return `${x(d.brandName) + xalignVal + this.barWidth},${yPos} ${x(
			d.brandName
		) +
			xalignVal +
			this.barWidth +
			this.anchorSize},${yPos + this.anchorSize * 0.5} ${x(d.brandName) +
			xalignVal +
			this.barWidth +
			this.anchorSize},${yPos - this.anchorSize}`;
	}
	getTypeToolTipYPos(index, d, i, lastY) {
		let yVal = 0;
		const initialScore = this.getScore("initial", index, d, i);
		const compareScore = this.properties.isDateCompareSelected
			? this.getScore("compare", index, d, i)
			: 0;
		const score = this.properties.isDateCompareSelected
			? Math.min(initialScore, compareScore)
			: initialScore;
		if (index === 0) {
			yVal = this.y(score);
		} else {
			yVal = lastY - (this.properties.yAxisHeight - this.y(score));
		}
		this.lastY[i] = yVal;
		if (yVal < 0) {
			yVal = 0;
		}
		yVal = yVal - this.tooltipTypeHeight * 0.5;
		return yVal;
	}
	createTypesToolTip() {
		const x = this.x,
			y = this.y;
		this.lastY = [];
		const { isDateCompareSelected, yAxisHeight } = this.properties;
		const xalignVal = isDateCompareSelected
			? this.xalignCompare
			: this.xalignInitial;
		this.tooltipTypeGroup = this.tooltipGroup
			.append("g")
			.classed("type-tool-tip-group", true);
		this.promotionTypes?.forEach((type, index, arr) => {
			this.typeToolTipG = this.tooltipTypeGroup
				.append("g")
				.classed(`type-tool-tip ${type.countKey}`, true);
			this.typeToolTipG
				.append("rect")
				.classed(`type-tool-tip-box`, true)
				.attr("width", this.tooltipTypeWidth)
				.attr("height", this.tooltipTypeHeight)
				.attr(
					"x",
					d => x(d.brandName) + xalignVal + this.barWidth + this.anchorSize
				)
				.attr("y", (d, i) =>
					this.getTypeToolTipYPos(index, d, i, this.lastY[i])
				)
				.attr("rx", "2");
			const typeToolTipBox = this.tooltipTypeGroup.select(
				`.type-tool-tip.${type.countKey} .type-tool-tip-box`
			);
			this.createTypeToolTipText(
				"initial",
				xalignVal,
				index,
				typeToolTipBox,
				15
			);
			this.createDotForTypeToolTip(
				xalignVal,
				index,
				typeToolTipBox,
				this.scoreShades,
				7
			);
			if (isDateCompareSelected) {
				this.createTypeToolTipText(
					"compare",
					xalignVal,
					index,
					typeToolTipBox,
					34
				);
				this.createDotForTypeToolTip(
					xalignVal,
					index,
					typeToolTipBox,
					this.compareShades,
					25
				);
			}
			this.createTypeToolTipAnchor(xalignVal, typeToolTipBox);
		});
	}
	createTypeToolTipText(key, xalignVal, index, typeToolTipBox, yVal) {
		const x = this.x,
			y = this.y;
		const format = d3.format(",");

		this.typeToolTipG
			.append("text")
			.classed(`type-tool-tip-text`, true)
			.attr(
				"x",
				d =>
					x(d.brandName) +
					xalignVal +
					this.barWidth +
					this.anchorSize +
					this.tooltipTypeWidth -
					10
			)
			.attr("y", (d, i) => {
				let yPos = 0;
				typeToolTipBox.each(function(d, index) {
					if (i === index) {
						yPos = parseFloat(this.getAttribute("y"));
					}
				});
				return yPos + yVal;
			})
			.attr("text-anchor", "end")
			.text((d, i) => format(this.getScore(key, index, d, i)));
	}
	createDotForTypeToolTip(xalignVal, index, typeToolTipBox, shades, yVal) {
		const x = this.x,
			y = this.y;
		this.typeToolTipG
			.append("rect")
			.classed("type-tool-tip-dot", true)
			.attr("width", 10)
			.attr("height", 10)
			.attr(
				"x",
				d => x(d.brandName) + xalignVal + this.barWidth + this.anchorSize + 10
			)
			.attr("y", (d, i) => {
				let yPos = 0;
				typeToolTipBox.each(function(d, index) {
					if (i === index) {
						yPos = parseFloat(this.getAttribute("y"));
					}
				});
				return yPos + yVal;
			})
			.attr("fill", shades[index]);
	}
	createTypeToolTipAnchor(xalignVal, typeToolTipBox) {
		this.typeToolTipG
			.append("polygon")
			.classed("type-tool-tip-anchor", true)
			.attr("points", (d, i) =>
				this.getTypeAnchorPath(d, i, xalignVal, typeToolTipBox)
			);
	}
	getTypeAnchorPath(d, i, xalignVal, typeToolTipBox) {
		const x = this.x,
			y = this.y;
		const barWidth = this.barWidth;
		let yPos = 0;
		typeToolTipBox.each(function(d, index) {
			if (i === index) {
				yPos = parseFloat(this.getAttribute("y"));
			}
		});
		yPos = yPos + this.tooltipTypeHeight * 0.5;

		return `${x(d.brandName) + xalignVal + this.barWidth},${yPos} ${x(
			d.brandName
		) +
			xalignVal +
			this.barWidth +
			this.anchorSize},${yPos + this.anchorSize * 0.5} ${x(d.brandName) +
			xalignVal +
			this.barWidth +
			this.anchorSize},${yPos - this.anchorSize}`;
	}
}

export default D3StackedBar;
