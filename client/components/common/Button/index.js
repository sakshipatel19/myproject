import React from "react";
import "./Button.scss";

const Button = props => {
	return (
		<button
			className={`
            ${props.primary ? "primary-button" : ""} 
            ${props.secondary ? "secondary-button" : ""}
            ${props.small ? "small" : ""} 
            ${props.disabled ? "disabled" : ""} ${props.className || ""}`}
			style={props.buttonStyles}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
