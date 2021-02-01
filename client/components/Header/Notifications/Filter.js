import React, { Component } from "react";
import Checkbox, { checkboxStates } from "./../../common/Checkbox";
import HorizontalSeparator from "../../common/HorizontalSeparator";
import Icon from "../../common/Icon";

class Filter extends Component {
	state = {
		filter: {},
		selectedItems: [],
		isResetClicked: false
	};
	componentDidMount() {
		const { modifiedFilter } = this.props;
		let temp = [],
			temp1 = {},
			temp2 = {},
			selectedItems = [];
		for (let i = 0; i < modifiedFilter.length; i++) {
			temp2[`${modifiedFilter[i].funcType.name}`] = {
				filterStatus: modifiedFilter[i].funcType.filterStatus
			};
			for (let j = 0; j < modifiedFilter[i].types.length; j++) {
				temp1[modifiedFilter[i].types[j]["notificationTypeId"]] =
					modifiedFilter[i].types[j]["isSelected"];
				if (modifiedFilter[i].types[j]["isSelected"])
					selectedItems.push(modifiedFilter[i].types[j]["notificationTypeId"]);
				temp.push(temp1);
				temp1 = {};
			}
			temp2[`${modifiedFilter[i].funcType.name}`]["types"] = temp;
			temp = [];
		}
		this.setState({ filter: temp2, selectedItems });
	}

	onChildFilterClick = (funcType, index, type) => {
		let filter = { ...this.state.filter };
		let filter1 = { ...filter[funcType] };
		let types = [...filter1.types];
		let selectedItems = [...this.state.selectedItems];
		types[index][type.notificationTypeId] = !this.state.filter[funcType]?.types[
			index
		][type.notificationTypeId];
		if (types[index][type.notificationTypeId])
			selectedItems.push(type.notificationTypeId);
		else {
			const index = selectedItems.indexOf(type.notificationTypeId);
			if (index > -1) selectedItems.splice(index, 1);
		}
		filter1.types = types;
		filter[funcType] = filter1;
		this.setState({ filter, selectedItems }, () =>
			this.statusOfParentCheckBox(funcType)
		);
	};
	statusOfParentCheckBox = funcType => {
		let filter = { ...this.state.filter };
		let status = "";
		const selectedItems = filter[funcType]?.types.filter(
			e => e[Object.keys(e)[0]] === true
		).length;

		if (selectedItems === 0) status = checkboxStates.unselected;
		else if (selectedItems === filter[funcType]?.types.length)
			status = checkboxStates.fullySelected;
		else status = checkboxStates.partiallySelected;
		let filter1 = { ...filter[funcType] };
		filter1.filterStatus = status;
		filter[funcType] = filter1;
		this.setState({ filter });
	};
	onParentFilterClick = funcType => {
		let filter = { ...this.state.filter };
		let filter1 = { ...filter[funcType] };
		let currentStatus = filter1.filterStatus;
		let selectedItems = [...this.state.selectedItems];
		if (
			currentStatus === checkboxStates.fullySelected ||
			currentStatus === checkboxStates.partiallySelected
		) {
			filter1.filterStatus = checkboxStates.unselected;
		} else filter1.filterStatus = checkboxStates.fullySelected;
		let types = [...filter1.types];
		types = types.map(type => {
			const keys = Object.keys(type);
			const index = selectedItems.indexOf(keys[0]);
			if (currentStatus === checkboxStates.unselected) {
				if (index === -1) selectedItems.push(keys[0]);
				return {
					[keys[0]]: true
				}; //setting all children types to true
			} else {
				if (index !== -1) selectedItems.splice(index, 1);
				return {
					[keys[0]]: false
				};
			}
		});
		filter1.types = types;
		filter[funcType] = filter1;
		this.setState({ filter, selectedItems });
	};
	onApplyButtonClick = () => {
		this.props.onApplyFilterButton([...this.state.selectedItems]);
	};
	onResetButtonClick = () => {
		let filter = { ...this.state.filter },
			filter1 = {},
			types = [];
		const keys = Object.keys(filter);
		for (let i = 0; i < keys.length; i++) {
			filter1 = { ...filter[keys[i]] };
			filter1.filterStatus = checkboxStates.unselected;
			types = [...filter1.types];
			types = types.map(type => {
				const id = Object.keys(type)[0];
				return {
					[id]: false
				};
			});
			filter1.types = types;
			filter[keys[i]] = filter1;
		}
		this.setState({ filter, selectedItems: [], isResetClicked: true });
	};
	onCancelButtonClick = () => {
		this.onResetButtonClick();
		this.props.closeFilter();
	};
	render() {
		const { modifiedFilter } = this.props;
		const stateFilter = this.state.filter;
		const { selectedItems, isResetClicked } = this.state;
		return (
			<div className="notification-filter-main-container">
				<div className="filter-options-body">
					{modifiedFilter.map((item, i) => {
						return (
							<div
								className="filter-main-option-container"
								key={`${item}-${i}`}
							>
								<Checkbox
									name={item.funcType.name}
									status={
										stateFilter[item.funcType.name]?.filterStatus ||
										checkboxStates.unselected
									}
									className={"filter-checkbox"}
									onStateChange={() =>
										this.onParentFilterClick(item.funcType.name)
									}
								/>
								<div className="filter-types-container">
									{item.types.map((type, i) => {
										return (
											<div
												key={`${type}-${i}`}
												className={`filter-type-box ${
													stateFilter[item.funcType.name]?.types[i][
														type.notificationTypeId
													]
														? "selected"
														: ""
												}`}
												onClick={() =>
													this.onChildFilterClick(item.funcType.name, i, type)
												}
											>
												<span className="filter-label">
													{type.notificationLabel}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				<HorizontalSeparator />
				<div className="filter-buttons">
					<div
						className={`filter-reset ${
							selectedItems.length !== 0 ? "enable" : ""
						}`}
						onClick={() => this.onResetButtonClick()}
					>
						RESET
					</div>
					<div
						className="filter-cancel"
						onClick={() => this.onCancelButtonClick()}
					>
						CANCEL
					</div>
					<div
						className={`filter-apply ${
							selectedItems.length !== 0 || isResetClicked ? "enable" : ""
						}`}
						onClick={() => this.onApplyButtonClick()}
					>
						APPLY <Icon name="sortRight" size={12} />
					</div>
				</div>
			</div>
		);
	}
}

export default Filter;
