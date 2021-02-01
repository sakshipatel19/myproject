import React from "react";

import "./Dot.scss";
const Dot = ({ color }) => {
	return <span className="dot" style={{ backgroundColor: color }}></span>;
};

export default Dot;
