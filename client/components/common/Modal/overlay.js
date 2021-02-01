import React from "react";
import "./modal.scss";

const OverLay = ({ children, className = "", onClick }) => {
	return (
		<div className={`${className} overlay-container`} onClick={onClick}>
			{children}
		</div>
	);
};

export default OverLay;
