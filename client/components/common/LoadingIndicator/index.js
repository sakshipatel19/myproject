import React from "react";
import "./LoadingIndicator.scss";

const LoadingIndicator = props => {
	return (
		<div className="dot-pulse-container">
			<div className="dot-pulse" />
		</div>
	);
};

export default LoadingIndicator;
