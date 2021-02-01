import React from "react";

import "./LoadingSkeleton.scss";
import LoadingSquare from "./LoadingSquare";

const LoadingTable = () => {
	const noOfItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const createLoadingTable = () => {
		return noOfItem.map((item, i) => (
			<div className="loading-table-row" key={i}>
				{[1, 2, 3, 4].map((a, index) => {
					return (
						<div className="loading-table-column" key={index}>
							<LoadingSquare />
						</div>
					);
				})}
			</div>
		));
	};
	return <div className="loading-table-container">{createLoadingTable()}</div>;
};

export default LoadingTable;
