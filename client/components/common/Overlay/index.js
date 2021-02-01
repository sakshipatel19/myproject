import React from "react";
import "./Overlay.scss";

const Overlay = ({ children, className = "", onClick }) => {
	return (
		<div className={`overlay ${className}`} onClick={onClick}>
			{children && <div className="overlay-main">{children}</div>}
		</div>
	);
};

export default Overlay;
