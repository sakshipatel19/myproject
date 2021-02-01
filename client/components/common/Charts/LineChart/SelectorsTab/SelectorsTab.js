import React, { useState, useEffect } from "react";
import "./SelectorTab.scss";
import { connect } from "react-redux";
import { dateDiffInDays } from "../../../../../utils/date";

const selectors = [
	{ label: "DAILY", key: "daily" },
	{ label: "WEEKLY", key: "weekly" },
	{ label: "MONTHLY", key: "monthly" }
];

const SelectorsTab = ({ onChange, onUpdate, selectorTypechange, fromDate, toDate }) => {
	const noOfDays = dateDiffInDays(fromDate, toDate);

	const [selectedTab, setSelectedTab] = useState(selectors[0].key);

	useEffect(() => {
		setSelectedTab(selectors[0].key);
		onUpdate && onUpdate(selectors[0].key);
	}, [selectorTypechange]);
	const isDisabled = type => {
		switch (type) {
			case "weekly":
				return isWeeklyDisabled(noOfDays);
			case "monthly":
				return isMonthlyDisabled(noOfDays);
		}
		return false;
	};

	const isMonthlyDisabled = noOfDays => {
		return noOfDays < 28;
	};

	const isWeeklyDisabled = noOfDays => {
		return noOfDays < 7;
	};

	const onTabClick = value => {
		setSelectedTab(value);
		onChange(value.toLowerCase());
	};

	return (
		<div className="selectors">
			{selectors.map(selector => (
				<div
					key={selector.key}
					className={`selector-item 
                    ${selectedTab === selector.key ? "selected" : ""}
                    
					${isDisabled(selector.key) ? "disabled" : ""}
					`}
					onClick={() => onTabClick(selector.key)}
				>
					{selector.label}
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {

	const { fromDate, toDate } = state?.global?.config;
	return {
		selectorTypechange: state?.global?.scoreTypeSelectorToDefault,
		fromDate,
		toDate
	};
};

export default connect(mapStateToProps)(SelectorsTab);
