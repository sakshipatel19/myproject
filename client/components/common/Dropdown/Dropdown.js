import React, { Fragment } from "react";
import Select, { components } from "react-select";
import "./Dropdown.scss";
import Icon from "../Icon";

const selectStyles = {
	control: (styles, { isDisabled }) => {
		return {
			borderStyle: "none",
			display: "flex",
			alignItems: "center",
			borderRadius: "7px",
			backgroundColor: isDisabled ? "#FAFAFA" : "#FFFFFF",
			height: "30px",
			paddingRight: "8px",
			boxShadow: isDisabled ? "none" :
				"0 1px 2px 0 rgba(0,67,132,0.04), 0 2px 4px 0 rgba(0,67,132,0.16)",
			border: isDisabled ? "1px solid #E7E7E7" : "1px solid transparent",
			"&:hover": {
				border: isDisabled ? "none" : "1px solid #0676ed"
			}
		};
	}
};

class Dropdown extends React.Component {
	onChange = selectedOption => {
		if (selectedOption.value !== this.props.selectedOption)
			this.props.onSelect(selectedOption.value);
	};

	createOptions = (options = []) =>
		options?.map(option => {
			return {
				value: option.value,
				label: this.createLabel(option)
			};
		});

	createLabel = (option = {}) => {
		const isSelected = this.props.selectedOption === option.value;
		let label;

		if (option.image)
			label = (
				<Fragment>
					<img src={option.image} className="select-option-image" />
					<span className="select-option-label-image">
						{option.label?.substring(0, 3)}
					</span>
				</Fragment>
			);
		else
			label = (
				<span className={`select-option-label`}>
					{option?.label?.length > 18 && isSelected
						? `${option?.label?.substring(0, 15)}...`
						: option?.label}
				</span>
			);

		return (
			<div
				className={`select-option-container ${isSelected ? "selected" : ""}`}
			>
				{label}
			</div>
		);
	};

	createLabelForSelectedValue = option => {
		let label;
		if (option?.image)
			label = (
				<div className={`select-option-container selected`}>
					<Fragment>
						<img src={option.image} className="select-option-image" />
						<span className="select-option-label-image">
							{option.label?.substring(0, 3)}
						</span>
					</Fragment>
				</div>
			);
		else
			label = (
				<div className={`select-option-container selected`}>
					<span className="select-option-label">
						{option?.label?.length > 21
							? `${option?.label?.substring(0, 18)}...`
							: option?.label}
					</span>
				</div>
			);
		return {
			value: option,
			label
		};
	};

	MenuComponent = props => {
		return (
			<components.Menu className={"dropdown-main-menu-container"} {...props}>
				{props.children}
				<Icon name={"upBlue"} size={10} iconClass={"dropdown-open-indicator"} />
			</components.Menu>
		);
	};

	DropdownIndicator = props => {
		return <Icon name={"down"} size={12} {...props} />;
	};

	OptionComponent = props => {
		return (
			<components.Option {...props} className={"dropdown-option"}>
				{props.children}
			</components.Option>
		);
	};

	MenuListComponent = props => {
		return (
			<components.MenuList
				{...props}
				className={"dropdown-menu-list"}
				data-test={"dropdown-menu-list"}
			>
				{props.children}
			</components.MenuList>
		);
	};

	filterOptions = () => {
		let newOptions = [...(this.props.options || [])];
		newOptions?.forEach((option, i) => {
			if (option.value === this.props.selectedOption) {
				newOptions.splice(i, 1);
				newOptions.unshift(option);
			}
		});
		return newOptions;
	};
	render() {
		const options = this.createOptions(this.filterOptions());
		let selectedOption = this.props.options?.find(
			e => e.value === this.props.selectedOption
		);
		selectedOption = this.createLabelForSelectedValue(selectedOption);

		return (
			<Select
				className={`dropdown-container`}
				data-test="dropdown-component"
				value={selectedOption}
				onChange={this.onChange}
				options={options}
				placeholder=""
				components={{
					IndicatorSeparator: null,
					DropdownIndicator:
						(options?.length > 1 && !this.props.isDisabled) ? this.DropdownIndicator : null,
					Menu: this.MenuComponent,
					Option: this.OptionComponent,
					MenuList: this.MenuListComponent
				}}
				styles={selectStyles}
				defaultValue={options[0]}
				isSearchable={false}
				isDisabled={this.props.isDisabled || options?.length <= 1}
			/>
		);
	}
}

export default Dropdown;
