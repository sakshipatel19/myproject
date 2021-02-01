import React from "react";
import "./Card.scss";

const Card = ({ className = "", children }) => {
	return <div className={`card-container ${className}`}>{children}</div>;
};

export default Card;
