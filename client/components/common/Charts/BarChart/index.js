import React, { Component, Fragment } from "react";
import D3Bar from "./D3Bar";

import "./D3Bar.scss";

class BarChart extends Component {
	state = {
		d3Obj: null
	};
	componentDidMount() {
		this.createD3Component();
	}

	componentDidUpdate() {
		this.updateComponent();
	}

	createD3Component() {
		const d3Obj = new D3Bar(this.chart, this.getProperties());

		this.setState({ d3Obj }, () => {
			this.updateComponent();
		});
	}

	getProperties = () => {
		const defaultWidth = this.props?.properties?.defaultWidth || 940;
		const defaultHeight = this.props?.properties?.defaultHeight || 410;
		const heightSubtractor = this.props.isContentAttribute ? 50 : 100;
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
			yAxisHeight: height - heightSubtractor,
			yAxisDomain: [0, 100],
			data: this.props.attributeScore?.summaryAttributes,
			isDateCompareSelected: this.props.isDateCompareSelected,
			labelTextFormat: this.props.labelTextFormat,
			isContentAttribute: this.props.isContentAttribute
		};
	};

	updateComponent() {
		if (this.props.attributeScore?.summaryAttributes) {
			const d3Obj = this.state.d3Obj;
			d3Obj?.updateProperties(this.getProperties());
		}
	}

	render() {
		return (
			<div className="bar-chart-container" ref={e => (this.chart = e)}></div>
		);
	}
}

export default BarChart;
