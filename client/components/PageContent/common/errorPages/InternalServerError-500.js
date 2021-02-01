import React from "react";
import "./errorPages.scss";

import { Link } from "react-router-dom";

const InternalServerError = props => {
	const onReTryButtonClick = () => {
		return props.history.goBack();
	};

	return (
		<div className={"error-page-container"}>
			<h1 className="error-500">500</h1>
			<h1 className={"error-header"}>Internal Server Error</h1>
			<h3 className={"error-sub-header"}>Oops!! Something went wrong.</h3>
			<h3 className={"error-sub-header"}>
				Don't worry our engineering team is looking into it.
			</h3>
			<img
				src={"https://images.commerceintelligence.ai/common/500errorImage.webp"}
				alt={"Internal Server Error"}
				className={"error-image"}
			/>
			<div className="buttons-section">
				<button className={"button-retry"} onClick={onReTryButtonClick}>
					RETRY
				</button>
				<Link to={"/analysis/shelf/consideration/content"}>
					<button className={"button-go-to-dashboard"}>GO TO DASHBOARD</button>
				</Link>
			</div>
		</div>
	);
};

export default InternalServerError;
