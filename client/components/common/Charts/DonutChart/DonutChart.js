import React, { Component, Fragment } from "react";
import D3Chart from "./D3Chart";
import DotWithLabel from "../../DotWithLabel";
import {
	DONUT_CHART_PRIMARY_COLORS,
	DONUT_CHART_SECONDARY_COLORS
} from "../../../../constants/colors";
import { isNullOrUndefined } from "util";

import "./DonutChart.scss";

class DonutChart extends Component {
	state = {
		d3Obj: null
	};

	componentDidMount() {
		this.createD3Component();
	}

	componentDidUpdate() {
		this.updateComponent(this.props.data);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.data !== this.props.data) return true;
		return false;
	}

	createD3Component() {
		const d3Obj = new D3Chart(this.chart, this.getProperties());

		this.setState({ d3Obj }, () => {
			this.updateComponent(this.props.data);
		});
	}

	getProperties = () => {
		const defaultWidth = this.props?.properties?.defaultWidth || 290;
		const defaultHeight = this.props?.properties?.defaultHeight || 290;
		const margin = this.props?.properties?.margin || {
			left: 30,
			right: 30,
			top: 30,
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
			svgClassName: "",
			donutWidth: 25,
			hideMouseHover: false,
			initialColors: DONUT_CHART_PRIMARY_COLORS,
			compareColors: DONUT_CHART_SECONDARY_COLORS,
			isDateCompareSelected: this.props.isDateCompareSelected,
			hoverOffsetWidth: 7,
			...this.props.properties
		};
	};

	updateComponent(data) {
		const d3Obj = this.state.d3Obj;
		d3Obj?.updateProperties(this.getProperties());
		d3Obj?.updateChartData(data, this.onChartHover);
	}

	onChartHover = () => {};

	onFactorMouseLeave = data => {
		this.state.d3Obj.onMouseOut(data);
	};

	onFactorMouseHover = data => {
		this.state.d3Obj.onMouseHover(data);
	};

	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.props?.labelTextFormat
			? this.props.labelTextFormat(score)
			: `${score}%`;

	render() {
		const { summary, data, isDateCompareSelected, isDetailHeader } = this.props;
		return (
			<div className={"donut-chart-container"} ref={e => (this.chart = e)}>
				<div className={`donut-chart-summary`}>
					<div className={"donut-chart-total-score"}>
						<span className="donut-chart-total-score-value">
							{isDateCompareSelected ? (
								<Fragment>
									<DotWithLabel
										text={this.getScore(summary?.lostBuyBoxScore)}
										color={DONUT_CHART_PRIMARY_COLORS[0]}
									/>
									<DotWithLabel
										text={this.getScore(summary?.lostBuyBoxCompareScore)}
										color={DONUT_CHART_SECONDARY_COLORS[0]}
									/>
								</Fragment>
							) : (
								this.getScore(summary?.lostBuyBoxScore)
							)}
						</span>
						<span className={"donut-chart-total-score-text"}>
							{summary?.lostBuyBoxText}
						</span>
					</div>
					{isDetailHeader && <div className={"d3-donut-outer-div-container"} />}
					<div className={"donut-chart-factors-list"}>
						{data?.map((e, i) => (
							<div
								key={e.type}
								className={`donut-chart-factor ${
									isDateCompareSelected ? "donut-chart-factor-date-compare" : ""
								} donut-chart-factor-${e.type}`}
								onMouseEnter={() => this.onFactorMouseHover(e)}
								onMouseLeave={() => this.onFactorMouseLeave(e)}
							>
								<div className={"donut-chat-factor-label"}>
									{e?.scoreHeading}
								</div>
								<div className={"donut-chat-factor-value"}>
									<DotWithLabel
										text={this.getScore(e?.score)}
										color={DONUT_CHART_PRIMARY_COLORS[i]}
									/>
									{isDateCompareSelected && (
										<DotWithLabel
											text={this.getScore(e?.compareScore)}
											color={DONUT_CHART_SECONDARY_COLORS[i]}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				{!isDetailHeader && <div className={"d3-donut-outer-div-container"} />}
			</div>
		);
	}
}

export default DonutChart;
