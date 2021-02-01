import React from "react";
import "./DotWithLabel.scss";

const DotWithLabel = ({ color, text, size = 8, className }) => {
	const radius = size / 2;
	return (
		<div className={`dot-container ${className}`}>
			<svg height={size} width={size}>
				<circle cx={radius} cy={radius} r={radius} fill={color} />
			</svg>
			<span className="dot-text">{text}</span>
		</div>
	);
};

export default DotWithLabel;
