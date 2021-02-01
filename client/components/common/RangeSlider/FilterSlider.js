import React, { Component } from "react";
import "./slider.css";
import "./dragTouch";

class Slider extends Component {
	onDragOver = e => {
		e.preventDefault();
	};

	onDragStart = e => {
		let slider = e.target.dataset.slider;
		this.sliderType = slider;
	};

	onDrag = e => {};

	onDrop = (e, target) => {
		let source = this.sliderType;
		let slot = Number(e.target.dataset.slot);

		let scale = this.props.scale;
		let minVal = this.props.minVal;
		let maxVal = this.props.maxVal;
		if (!minVal && scale) {
			minVal = scale[0];
		}
		if (!maxVal && scale) {
			maxVal = scale[scale.length - 1];
		}

		if (isNaN(slot)) return;

		if (source === "min") {
			if (slot >= maxVal) return;
			minVal = slot;
		} else if (source === "max") {
			if (slot <= minVal) return;
			maxVal = slot;
		}
		this.sliderType = null;
		this.props.onChangeSlider(minVal, maxVal);
	};

	MinSlider = () => {
		return (
			<div
				data-slider="min"
				onDragStart={this.onDragStart}
				onTouchStart={this.onDragStart}
				onDrag={this.onDrag}
				draggable
				className="slider-thumb slider-thumb-min"
			></div>
		);
	};

	MaxSlider = () => {
		return (
			<div
				data-slider="max"
				onDragStart={this.onDragStart}
				onTouchStart={this.onDragStart}
				onDrag={this.onDrag}
				draggable
				className="slider-thumb slider-thumb-max"
			></div>
		);
	};

	onClickOnSlider = val => {
		let scale = this.props.scale;
		let minVal = this.props.minVal;
		let maxVal = this.props.maxVal;
		if (!minVal && scale) {
			minVal = scale[0];
		}
		if (!maxVal && scale) {
			maxVal = scale[scale.length - 1];
		}

		if (val < minVal) minVal = val;
		if (val > maxVal) maxVal = val;

		this.props.onChangeSlider(minVal, maxVal);
	};

	render() {
		let scale = this.props.scale;
		let slider = [];
		let currentScale = [];
		let minVal = this.props.minVal;
		let maxVal = this.props.maxVal;
		const formatMinMaxLabel = this.props.formatMinMaxLabel;

		if (!minVal && scale) {
			minVal = scale[0];
		}
		if (!maxVal && scale) {
			maxVal = scale[scale.length - 1];
		}

		scale?.forEach(e => {
			let currentLabel = "";
			let currentLabelClass = "";
			let minThumb = null;
			let maxThumb = null;

			currentLabel =
				e === minVal || e === maxVal
					? `${formatMinMaxLabel ? formatMinMaxLabel(e) : e}`
					: "";

			currentLabelClass =
				e === minVal
					? "slot-scale-start"
					: e === maxVal
					? "slot-scale-end"
					: "";

			currentScale.push(
				<div key={e} className={`slot-scale ${currentLabelClass}`}>
					{currentLabel}
				</div>
			);

			if (e === minVal) {
				minThumb = <this.MinSlider />;
			} else if (e === maxVal) {
				maxThumb = <this.MaxSlider />;
			} else {
				minThumb = null;
				maxThumb = null;
			}

			let lineClass = "line";
			if (e >= minVal && e <= maxVal) lineClass += " line-selected";

			slider.push(
				<div
					data-slot={e}
					onDragOver={this.onDragOver}
					onTouchMove={this.onDragOver}
					onTouchEnd={this.onDrop}
					onDrop={this.onDrop}
					key={e}
					className="slot"
					onClick={() => this.onClickOnSlider(e)}
				>
					<div data-slot={e} className={lineClass} />
					<span className="scale-mark"></span>
					{minThumb}
					{maxThumb}
				</div>
			);
		});

		return (
			<div>
				<div className="example-1">
					<div className="slider-container">
						<div className="slider">{slider}</div>
						<div className="slider-selected-scale">{currentScale}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Slider;
