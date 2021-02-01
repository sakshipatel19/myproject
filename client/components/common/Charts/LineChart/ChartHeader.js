import React from "react";
import Label from "../../Label";
import SelectorsTab from "./SelectorsTab";
import Download from "../../Download";

import "./LineChart.scss";

const ChartHeader = props => {
	const {
		title = "Scores",
		hideSelectors = false,
		onSelectorChange,
		onDownloadClick,
		downloadData,
		onSelectorUpdate
	} = props;

	return (
		<div className={"chart-header-container"}>
			<div>
				<Label
					labelClass={"chart-header-label section-header-title"}
					text={title}
				/>
			</div>
			<div className={"chart-header-right-content"}>
				{!hideSelectors && <SelectorsTab onChange={onSelectorChange} onUpdate={onSelectorUpdate} />}
				{onDownloadClick && (
					<div className={"summary-download-icon"}>
						<Download onClick={onDownloadClick} exportData={downloadData} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ChartHeader;
