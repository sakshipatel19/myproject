import React, { Component } from "react";
import { DateRangePicker } from "@blueprintjs/datetime";

import "normalize.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./DatePicker.scss";
import Icon from "../Icon";

const validateSelect = dateRange => {
	if (dateRange[0] === null || dateRange[1] === null) return false;
	return true;
};
class DatePicker extends Component {
	state = {
		dateRange: this.props.dateRange
	};
	handleRangeChange = dateRange => {
		const range =
			(this.props.handleRangeChange &&
				this.props.handleRangeChange(dateRange)) ||
			dateRange;

		this.setState({
			dateRange: range
		});
	};
	handleDateCancel = () => {
		this.props.handleDateCancel();
	};
	handleDateSelect = () => {
		const { dateRange } = this.state;
		if (validateSelect(dateRange)) this.props.handleDateSelect(dateRange);
	};
	render() {
		const { dateRange } = this.state;
		const { calenderClass } = this.props;
		const isSelectDisabled = validateSelect(dateRange);
		const classes = `date-range-inner-container ${calenderClass}`;

		return (
			<div className="date-range-outer-container">
				<i className={`${calenderClass}-i`}></i>
				<DateRangePicker
					className={classes}
					value={dateRange}
					onChange={this.handleRangeChange}
					contiguousCalendarMonths={false}
					maxDate={new Date()}
					minDate={new Date("2020-03-19")}
				/>

				<div className={`date-picker-buttons ${calenderClass}-btn`}>
					<div className="button-divider"></div>
					<div className="date-buttons">
						<div className="date-picker-cancel" onClick={this.handleDateCancel}>
							CANCEL
						</div>
						<div
							className={`date-picker-select ${!isSelectDisabled &&
								"disabled"}`}
							onClick={this.handleDateSelect}
						>
							SELECT
							<Icon name="rightArrow" iconClass="date-select" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DatePicker;
