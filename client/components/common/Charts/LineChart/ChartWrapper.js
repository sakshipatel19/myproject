import React, { Component } from "react";
import D3Chart from "./D3Chart";
import "./ChartWrapper.scss";

class ChartWrapper extends Component {
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
		const defaultWidth = 940;
		const defaultHeight = 240;
		const margin = { left: 30, right: 10, top: 10, bottom: 30 };
		const height = defaultHeight - margin.top - margin.bottom;
		const width = defaultWidth - margin.left - margin.right;
		return {
			height,
			width,
			margin,
			defaultWidth,
			defaultHeight,
			svgClassName: "",
			xAxisClassName: "",
			yAxisClassName: "",
			lineWidth: 3,
			lineColors: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#858585"],
			hideYaxis: false,
			hideXaxis: false,
			hideGradients: false,
			hideMouseHover: false,
			yAxisDomain: [0, 100],
			...this.props.properties
		};
	};

	createDataToDraw = () => {
		return this.props.data;
	};

	updateComponent(data) {
		const d3Obj = this.state.d3Obj;
		d3Obj?.updateProperties(this.getProperties());
		d3Obj?.updateChartData(data, this.props.onHover);
	}

	render() {
		return (
			<div className={"d3-outer-div-container"} ref={e => (this.chart = e)} />
		);
	}
}

export default ChartWrapper;
