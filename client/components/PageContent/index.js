import React, { Component } from "react";

import "./PageContent.scss";
import SummaryRoutes from "../nav-routes";
import CompareView from "./CompareView";

class PageContent extends Component {
	render() {
		return (
			<div className="main-page-content">
				<CompareView />
				<SummaryRoutes />
			</div>
		);
	}
}

export default PageContent;
