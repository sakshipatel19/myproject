import React, { Component, Fragment } from "react";
import D3StackedBar from "./D3StackedBar";
import { STACKED_BAR_CHAR } from "../../../../constants/colors";

import "./D3StackedBar.scss";

class StackedBar extends Component {
	state = {
		d3Obj: null
	};

	componentDidMount() {
		this.data = {
			initial: [],
			compare: []
		};
		this.createD3Component();
	}
	componentDidUpdate() {
		this.updateComponent();
	}

	createD3Component() {
		const d3Obj = new D3StackedBar(this.chart, this.getProperties());

		this.setState({ d3Obj }, () => {
			this.updateComponent();
		});
	}

	getProperties = () => {
		const defaultWidth = this.props?.properties?.defaultWidth || 940;
		const defaultHeight = this.props?.properties?.defaultHeight || 310;
		const margin = this.props?.properties?.margin || {
			left: 30,
			right: 10,
			top: 10,
			bottom: 30
		};
		const height = defaultHeight - margin.top - margin.bottom;
		const width = defaultWidth - margin.left - margin.right;
		return {
			height,
			width,
			margin,
			defaultWidth,
			defaultHeight,
			yAxisHeight: height,
			yAxisDomain: this.getYAxisDomainRange(),
			initial: this.data?.initial,
			compare: this.data?.compare,
			isDateCompareSelected: this.props.isDateCompareSelected,
			labelTextFormat: this.props.labelTextFormat
		};
	};
	getYAxisDomainRange() {
		const { initial, compare } = this.data;

		let maxVal = 0;
		initial.forEach(brand => {
			maxVal = brand.promotionCount > maxVal ? brand.promotionCount : maxVal;
		});
		if (this.props.isDateCompareSelected) {
			compare.forEach(brand => {
				maxVal = brand.promotionCount > maxVal ? brand.promotionCount : maxVal;
			});
		}
		const length = maxVal.toString().length;
		const multiplier = Math.pow(10, length - 1);
		maxVal = Math.ceil(maxVal / multiplier) * multiplier;
		maxVal = Math.max(maxVal, 10);
		return [0, maxVal];
	}
	updateComponent() {
		this.data = {
			initial: [],
			compare: []
		};
		this.props?.promotionCountBrandCompare?.forEach(item => {
			if (item.data.initial) {
				item.data.initial.brandName = item.brandName;
				this.data.initial.push(item.data.initial);
			}
			if (item.data.compare) {
				item.data.compare.brandName = item.brandName;
				this.data.compare.push(item.data.compare);
			}
		});

		if (this.data?.initial) {
			const d3Obj = this.state.d3Obj;
			d3Obj?.updateProperties(this.getProperties());
		}
	}
	onLegendOver(e, key, mode) {
		const toolTipEl = this.chart.querySelectorAll(`.type-tool-tip.${key}`);
		const style = mode === "out" ? "opacity:0;" : "opacity:1";
		toolTipEl.forEach((el, i) => {
			el.setAttribute("style", style);
		});
	}
	getLegends() {
		const { promotionCountBrandCompare } = this.props;
		const regEx = / /gi;
		return (
			promotionCountBrandCompare &&
			promotionCountBrandCompare[0]?.data?.initial?.promotionTypeList?.map(
				(item, i, arr) => {
					const key = item.typeHeading.toLowerCase().replace(regEx, "-");
					return (
						<div
							className="legend-item"
							key={i}
							onMouseOver={e => this.onLegendOver(e, key)}
							onMouseOut={e => this.onLegendOver(e, key, "out")}
						>
							<div
								className="score indicator"
								style={{ backgroundColor: STACKED_BAR_CHAR.NORMAL[i] }}
							></div>
							{this.props.isDateCompareSelected && (
								<div
									className="compare indicator"
									style={{ backgroundColor: STACKED_BAR_CHAR.DATE_COMPARE[i] }}
								></div>
							)}
							<div className="legend-name">{item.typeHeading}</div>
						</div>
					);
				}
			)
		);
	}
	render() {
		return (
			<Fragment>
				<div
					className="stackedbar-chart-container"
					ref={e => (this.chart = e)}
				></div>
				<div className="stackedbar-legends">{this.getLegends()}</div>
			</Fragment>
		);
	}
}

export default StackedBar;
