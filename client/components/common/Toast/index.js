import React from "react";
import Icon from "../Icon";
import VerticalSeparator from "../VerticalSeparator";
import Button from "../Button";
import "./Toast.scss";

const Toast = ({ error, success, iconName, children, onCloseIconClick }) => {
	return (
		<div
			className={`toast-container ${error ? "error" : ""} 
            ${success ? "success" : ""}`}
		>
			<Icon name={iconName} size={16} />
			<div className="toast-main-content">{children}</div>
			<VerticalSeparator />
			<div
				className="close-button-container"
				onClick={() => onCloseIconClick()}
			>
				<Button secondary small buttonText="CLOSE" />
				<Icon name="error" size={16} />
			</div>
		</div>
	);
};

export default Toast;
