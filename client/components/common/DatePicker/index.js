import React, { Component } from "react";
import { connect } from "react-redux";
import DateRangePickerCustom from "./DateRangePickerComponent";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import Icon from "../Icon";
import "./DatePicker.scss";
import { detailsPages } from "../../../constants/PageHeaders";

class DateRangeCompareComponent extends Component {
	disableDatePicker = () => {
		return detailsPages.indexOf(this.props.selectedPage) > -1;
	};
	handleComapreClick = () => {
		this.props.actions.setShowCompareDaterange(true);
	};
	handleComapreCloseClick = () => {
		this.props.actions.setShowCompareDaterange(false);
		this.props.actions.setCompareFromInConfig("");
		this.props.actions.setCompareToInConfig("");
		this.props.actions.setIsDateCompareSelected(false);
		this.props.actions.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);
		apiCallBasedOnRoute(
			Object.assign({}, this.props, {
				fromDate: this.props.fromDate,
				toDate: this.props.toDate,
				compareFrom: "",
				compareTo: ""
			})
		);
	};

	fetchScores = (fromDate, toDate, compareFrom, compareTo) => {
		if (fromDate === "") {
			fromDate = this.props.fromDate;
			toDate = this.props.toDate;
			this.props.actions.setCompareFromInConfig(compareFrom);
			this.props.actions.setCompareToInConfig(compareTo);
			this.props.actions.setIsDateCompareSelected(true);
		} else {
			this.props.actions.setFromDateInConfig(fromDate);
			this.props.actions.setToDateInConfig(toDate);
			compareFrom = "";
			compareTo = "";
			this.props.actions.setCompareFromInConfig(compareFrom);
			this.props.actions.setCompareToInConfig(compareTo);
			this.props.actions.setIsDateCompareSelected(false);
		}

		this.props.actions.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);

		apiCallBasedOnRoute(
			Object.assign({}, this.props, {
				fromDate,
				toDate,
				compareFrom,
				compareTo
			})
		);
	};
	handleRangeChange = dateRange => {
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const startDate = new Date(this.props.fromDate);
		const endDate = new Date(this.props.toDate);
		const diffDays = Math.floor(Math.abs((startDate - endDate) / oneDay));
		const nextDate = new Date(dateRange[0].getTime() + oneDay * diffDays);
		const todayDate = new Date();

		if (nextDate.getTime() > todayDate.getTime()) {
			return [null, null];
		}
		return [dateRange[0], nextDate];
	};

	render() {
		const { fromDate, toDate, compareFrom, compareTo } = this.props;

		return (
			<div className="date-range-compare-container">
				<div
					className={`${"date-range-main-container"} ${this.disableDatePicker() &&
						"disable"}`}
				>
					<DateRangePickerCustom
						fromDate={fromDate}
						toDate={toDate}
						calenderIcon={
							this.disableDatePicker() ? "calenderDisable" : "calenderBlue"
						}
						calenderClass="blue"
						handleSelect={this.fetchScores}
					/>
					{this.props.showCompareDateRange && (
						<DateRangePickerCustom
							fromDate={compareFrom}
							toDate={compareTo}
							compare={true}
							calenderIcon="calenderOrange"
							calenderClass="compare"
							handleRangeChange={this.handleRangeChange}
							handleSelect={this.fetchScores}
						/>
					)}
				</div>
				{!this.disableDatePicker() && (
					<div className="calender-compare-icon">
						<Icon
							name={
								this.props.showCompareDateRange ? "error" : "calenderCompare"
							}
							iconClass="calender-compare"
							size="18"
							handleIconClick={
								this.props.showCompareDateRange
									? this.handleComapreCloseClick
									: this.handleComapreClick
							}
						/>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = store => {
	const { selectedPage } = store.global.config;
	return {
		selectedPage
	};
};

export default connect(mapStateToProps)(DateRangeCompareComponent);
