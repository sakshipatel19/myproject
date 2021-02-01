import React, { Component } from "react";
import DatePicker from "./DatePicker";
import moment from "moment";
import Icon from "../Icon";
import Overlay from "../Overlay";

class DateRangePickerCustom extends Component {
	state = { showCalender: false };
	handleCalenderClick = () => {
		this.setState({ showCalender: true });
	};
	handleCalenderCancel = () => {
		this.setState({ showCalender: false });
	};

	handleCalenderSelect = dateRange => {
		if (this.props.compare) {
			this.props.handleSelect(
				"",
				"",
				moment(dateRange[0]).format("YYYY-MM-DD"),
				moment(dateRange[1]).format("YYYY-MM-DD")
			);
		} else {
			this.props.handleSelect(
				moment(dateRange[0]).format("YYYY-MM-DD"),
				moment(dateRange[1]).format("YYYY-MM-DD"),
				"",
				""
			);
		}

		this.setState({ showCalender: false });
	};

	render() {
		const { fromDate, toDate } = this.props;
		const startDate =
			fromDate == "" ? "Start Date" : moment(fromDate).format("ll");
		const endDate = toDate == "" ? "End Date" : moment(toDate).format("ll");

		const dateRange = [
			fromDate == "" ? null : new Date(fromDate),
			toDate == "" ? null : new Date(toDate)
		];

		return (
			<>
				{this.state.showCalender ? (
					<Overlay onClick={this.handleCalenderCancel} />
				) : null}

				<div className="date-range-picker-component-container">
					<div className={`${this.props.calenderClass} ${this.state.showCalender && "pop"}`}>
						<Icon
							name={this.props.calenderIcon}
							iconClass="calender-icons"
							size="16"
							handleIconClick={this.handleCalenderClick}
						/>
					</div>
					{this.state.showCalender && (
						<DatePicker
							calenderClass={this.props.calenderClass}
							dateRange={dateRange}
							handleDateCancel={this.handleCalenderCancel}
							handleRangeChange={this.props.handleRangeChange}
							handleDateSelect={this.handleCalenderSelect}
						/>
					)}
					<div
						className="dates"
						onClick={this.handleCalenderClick}
					>{`${startDate} - ${endDate}`}</div>
				</div>
			</>
		);
	}
}

export default DateRangePickerCustom;
