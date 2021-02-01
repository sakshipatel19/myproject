import React from "react";

import "./LoadingSkeleton.scss";
import LoadingSquare from "./LoadingSquare";

const LoadingProgressbar = () => {
	const noOfItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const createLoadingTable = () => {
		return noOfItem.map(item => (
			<div className="loading-pb-row">
				<div className="loading-pb-column">
					<LoadingSquare />
				</div>
			</div>
		));
	};
	return <div className="loading-table-container">{createLoadingTable()}</div>;
};

export default LoadingProgressbar;
