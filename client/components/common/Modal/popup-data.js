import React, { Component } from "react";
import "./popup.scss";

class PopUpData extends Component {
	componentDidMount() {
		document.body.style.overflow = "hidden";
	}

	componentWillUnmount() {
		document.body.style.overflow = "unset";
	}

	render() {
		const { className = "", children } = this.props;
		return (
			<div className={`popup-container`}>
				<div className={"popup"}>{children}</div>
			</div>
		);
	}
}

export default PopUpData;
