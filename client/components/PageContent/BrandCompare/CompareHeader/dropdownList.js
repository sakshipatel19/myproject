import React, { Component, Fragment } from "react";
import Select, { components } from "react-select";
import Icon from "../../../common/Icon";
import Checkbox, { checkboxStates } from "../../../common/Checkbox";
import lodash from "lodash";
import Overlay from "../../../common/Overlay";

const selectStyles = {
	control: () => ({
		borderStyle: "none",
		display: "flex",
		alignItems: "center"
	})
};

class Dropdown extends Component {
	state = {
		options: lodash.cloneDeep(this.props.options)
	};

	createOptions = obj => {
		let allChecktatus = checkboxStates.unselected;
		let options = obj.map(e => {
			let label = this.createLabelObject({
				...e,
				value: e.category,
				status: e.isSelected
					? checkboxStates.fullySelected
					: checkboxStates.unselected
			});
			return { label, ...e, value: e.category };
		});

		const selectedCheckboxes = obj.filter(e => e.isSelected)?.length;
		if (selectedCheckboxes === obj.length)
			allChecktatus = checkboxStates.fullySelected;
		else if (selectedCheckboxes > 0)
			allChecktatus = checkboxStates.partiallySelected;

		const defaultOption = {
			label: this.createLabelObject({
				status: allChecktatus,
				value: "All Categories",
				category: "All Categories",
				isSelected: allChecktatus === checkboxStates.fullySelected
			}),
			value: "All Categories",
			status: allChecktatus,
			isSelected: allChecktatus === checkboxStates.fullySelected
		};

		return [defaultOption, ...options];
	};

	createLabelObject = obj => {
		let isSelected = obj.status == "FullySelected" ? "selected" : "";
		return (
			<div
				className={`select-option-container ${isSelected}`}
				onClick={() => this.onChangeCategory(obj)}
			>
				<Checkbox name={obj.value.replace(/_/g, " ")} status={obj.status} />
			</div>
		);
	};

	onChangeCategory = val => {
		let options = this.state.options;
		if (val.value === "All Categories") {
			options.forEach(e => {
				e.isSelected = !val.isSelected;
			});
		} else {
			const index = options.findIndex(e => e.category === val.category);
			val.isSelected = !val.isSelected;
			options[index] = val;
		}

		this.setState({ options: options });
	};

	onMenuCloseClick = () => {
		this.props.onCancelClick();
	};

	onFilterCheckboxClick = e => {
		e.stopPropagation();
		this.props.onFilterCheckboxClick();
	};

	createControlComponent = () => {
		return (
			<div
				className="dropdown-select-content"
				onClick={this.props.onMenuOpenClick}
			>
				<Checkbox
					status={
						this.props.isSelected
							? checkboxStates.fullySelected
							: checkboxStates.unselected
					}
					onStateChange={this.onFilterCheckboxClick}
					className="brand-checkbox"
				/>

				<div className={"compare-header-brandName"}>{this.props.brandName}</div>
				<Icon name="down" size={12} iconClass="down-arrow-compare" />
			</div>
		);
	};

	onApplyCategory = () => {
		let options = this.state.options.map(e => ({
			asin: e.asin,
			category: e.category,
			isSelected: e.isSelected
		}));
		this.props.onApplyCick(options);
		this.props.onCancelClick();
	};
	onCancelCategory = () => {
		this.setState({ options: lodash.cloneDeep(this.props.options) });
		this.props.onCancelClick();
	};

	footerComponent = ({ children, ...props }) => {
		let options = this.createOptions(this.state.options);
		const isAlteastoneSelected = options[0].status;
		return (
			<components.Menu className={"dropdown-menu-content"} {...props}>
				{options.map(e => e.label)}
				<div className="compare-tab-footer-content">
					<div
						className={`compare-ribbon-dropdown-cancel ${isAlteastoneSelected ===
							checkboxStates.unselected && `disabled`}`}
						onClick={this.onCancelCategory}
					>
						<label className={"select-text"}>CANCEL</label>
					</div>
					<div
						className={`compare-ribbon-dropdown-select ${isAlteastoneSelected ===
							checkboxStates.unselected && `disabled`}`}
						onClick={
							isAlteastoneSelected !== checkboxStates.unselected &&
							this.onApplyCategory
						}
					>
						<label className={"select-text"}>SELECT</label>
						<Icon name={"rightArrow"} size={16} iconClass={"apply-icon"} />
					</div>
				</div>
			</components.Menu>
		);
	};

	createAllCategoriesOption = obj => {
		return (
			<div className="select-option-container">
				<Checkbox name={obj.value.replace(/_/g, " ")} status={obj.status} />
			</div>
		);
	};
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	console.log(nextProps, prevState);
	// 	// if (nextProps.options !== prevState.options) {
	// 	// 	this.setState({
	// 	// 		options: lodash.cloneDeep(nextProps.options)
	// 	// 	});
	// 	// }
	// }
	// componentWillReceiveProps(newProps) {
	// 	if (newProps.options !== this.props.options) {
	// 		this.setState({
	// 			options: lodash.cloneDeep(newProps.options)
	// 		});
	// 	}
	// }

	render() {
		let options = this.createOptions(this.props.options);
		return (
			<Fragment>
				<Select
					className="compare-brand-dropdown-container"
					value={options[0]}
					onChange={this.onChangeCategory}
					options={options}
					components={{
						IndicatorSeparator: null,
						Menu: this.footerComponent,
						Control: this.createControlComponent
					}}
					hideSelectedOptions={true}
					styles={selectStyles}
					defaultValue={options[0]}
					isSearchable={false}
					menuIsOpen={this.props.isDropdownMenuOpen}
				/>
			</Fragment>
		);
	}
}

export default Dropdown;
