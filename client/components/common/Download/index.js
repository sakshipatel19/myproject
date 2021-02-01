import React from "react";
import Icon from "../Icon";

export const downloadType = {
	csv: "csv",
	zip: "zip"
};

const Download = ({ onClick, exportData }) => {
	return (
		<Icon
			name={"download"}
			size={16}
			iconClass={exportData?.fetching ? "icon-disable" : ""}
			handleIconClick={() => onClick(downloadType.csv)}
		/>
	);
};

export default Download;
