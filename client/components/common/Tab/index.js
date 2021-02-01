import React from "react";
import "./Tab.scss";
import { numberFormat, styles } from "../../../utils/number";
import { isNullOrUndefined } from "../../../utils/number";
const Tab = ({
	data,
	selectedTab,
	onTabChange,
	className = "",
	countryCode
}) => {
	return (
		<div className={`tab-outer-container ${className}`}>
			{data.map(e => (
				<div
					key={e.key}
					className={`tab-details ${selectedTab === e.key ? "selected" : ""}`}
					onClick={() => onTabChange(e.key)}
				>
					<span className={`tab-name`}>{e.label}</span>
					<span className="tab-no-of-records">
						{!isNullOrUndefined(e.noOfRecords) && (
							<span className="tab-no-of-records">
								( {numberFormat(e.noOfRecords, countryCode, styles.decimal)} )
							</span>
						)}
					</span>
				</div>
			))}
		</div>
	);
};

export default Tab;
