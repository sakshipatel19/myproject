import React, { useState } from "react";
import "./RangeSlider.scss";
import Slider from "./FilterSlider";
import Icon from "../Icon";

const RangeSlider = props => {
	return (
		<div className={"range-slider-container"}>
			<div className={"range-slider-header"}>
				<div>{props.header}</div>
				{props.isHide && (
					<div className="toggle-hide" onClick={props.handleToggleHide}>
						Hide 0%:
						{props.isHideEnble ? (
							<Icon name="toggleEnable" iconClass="toggle" />
						) : (
							<Icon name="toggleDisabled" iconClass="toggle" />
						)}
					</div>
				)}
			</div>
			<Slider {...props} />
		</div>
	);
};

export default RangeSlider;
