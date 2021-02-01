import React from "react";
import "./NoResultsMessage.scss";

const NoResultsMessage = props => {
	return (
		<div className="no-results-msg">
			<div className="no-results-msg-header">No results found.</div>
			<div className="no-results-suggestions">
				<div>Suggestions:</div>
				<div>Make sure that all words are spelled correctly.</div>
				<div>Try different keywords.</div>
				<div>Try more general keywords.</div>
			</div>
		</div>
	);
};

export default NoResultsMessage;
