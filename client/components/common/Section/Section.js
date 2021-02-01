import React from "react";
import "./Section.scss";
const Section = ({ className = "", children, onClick, style }) => {
	return (
		<section
			className={`common-section ${className}`}
			onClick={onClick}
			style={style}
		>
			{children}
		</section>
	);
};

export default Section;
