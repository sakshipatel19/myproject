import React from "react";
import Icon from "../Icon";
import "./Tooltip.scss";

const Tooltip = ({ data }) => (
	<div className="tooltip">
		<div className="top">
			<span className="tooltip-text">{data}</span>
			<i></i>
		</div>
	</div>
);
export default Tooltip;
