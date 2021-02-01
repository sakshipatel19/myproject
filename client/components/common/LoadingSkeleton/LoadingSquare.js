import React from "react";

import "./LoadingSkeleton.scss";

const LoadingSquare = ({className = ''}) => {
	return <div className={`loading-square loading-pulse ${className}`}></div>;
};

export default LoadingSquare;
