import React from "react";

import "./DataLoadError.scss";
import Icon from "../../../common/Icon";

const DataLoadError = props => {
	const error = props?.error;
	let errorMessage = `Data Load Error`;
	return (
		<div className="data-load-error-container">
			<Icon name="dataError" size="18" />
			<div className="error-message">{errorMessage}</div>
			<div className="retry-message" onClick={() => props.handleRetry()}>
				<Icon name="refresh" iconClass="retry-icon" />
				<div className="refresh-text">REFRESH</div>
			</div>
		</div>
	);
};

export default DataLoadError;
