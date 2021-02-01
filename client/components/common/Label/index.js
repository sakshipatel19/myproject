import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import "./Label.scss";

const Label = ({ text, labelClass = "", hasTooltip, tooltipText }) => {
	return (
		<div className={`label-container ${labelClass}`}>
			<span dangerouslySetInnerHTML={{ __html: text }}></span>
			{hasTooltip && <Tooltip data={tooltipText} />}
		</div>
	);
};

export default Label;
