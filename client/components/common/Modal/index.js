import React, { Fragment, Component } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

function Modal(props) {
	return createPortal(props.children, document.querySelector("#modal"));
}

export default Modal;
