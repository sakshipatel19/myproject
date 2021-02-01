import React from "react";
import Icon from "../Icon";
import "./Checkbox.scss";

export const checkboxStates = {
	unselected: "Unselected",
	fullySelected: "FullySelected",
	partiallySelected: "PartiallySelected"
};

const Checkbox = ({ name, status, onStateChange, className = "", isAsinsLandingPage = false }) => {
	const checkboxIcon = {
		[checkboxStates.unselected]: "checkNormal",
		[checkboxStates.partiallySelected]: "checkPartial",
		[checkboxStates.fullySelected]: "checkSelected"
	};

	return (
		<div
			className={`checkbox-item ${className}`}
			onClick={e => onStateChange && onStateChange(e)}
		>
			{!isAsinsLandingPage && <span>
				<Icon name={checkboxIcon[status]} size={16} />
			</span>}
			{name && <span className="checkbox-text">{name}</span>}
		</div>
	);
};

export default Checkbox;
