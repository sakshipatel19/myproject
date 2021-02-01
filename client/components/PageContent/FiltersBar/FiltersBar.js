import React, { Component, Fragment } from "react";
import "./FiltersBar.scss";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import VerticalSeparator from "../../common/VerticalSeparator";
import Overlay from "../../common/Overlay";
import BrandsDropdown from "./BrandsDropdown";
import CategoriesDropdown from "./CategoriesDropdown";
import AsinDropdown from "./AsinDropdown";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import PresetsDropdown from "./PresetsDropdown";
import Presets from "../Presets";

class FiltersBar extends Component {
	state = {
		selectedFilter: "",
		viewPreset: false
	};

	openFilterMenu = filterType => {
		this.setState({ selectedFilter: filterType });
	};

	openPresetsMenu = () => {
		this.setState({ selectedFilter: filterType });
	};

	closeFilterMenu = event => {
		this.setState({ selectedFilter: "" });
		event && event.stopPropagation();
	};

	isFiltersApplied = () => {
		return this.props.productIdList && this.props.productIdList.length > 0;
	};

	isPresetsApplied = type => {
		const presetName = this.props.presetName;
		if (type === "presets" && presetName !== "") return true;
		else if (type !== "presets" && presetName !== "") return false;
		else if (type === "presets" && presetName === "") return false;
		else return true;
	};

	renderFiltersArrowIcon = filterType => {
		if (this.state.selectedFilter === filterType) return "upBlue";
		if (this.isFiltersApplied() && this.isPresetsApplied(filterType))
			return "downBlue";
		return "down";
	};

	renderFilterBar = isAsinsLandingPage => {
		const filters = isAsinsLandingPage
			? ["asin"]
			: ["brands", "categories", "asin", "presets"];
		return filters.map(filterType => {
			return (
				<div
					className={`${filterType}-filter-container ${
						this.state.selectedFilter === filterType ? "selected" : ""
					} ${
						this.isFiltersApplied() && this.isPresetsApplied(filterType)
							? "applied"
							: ""
					}`}
					onClick={() => this.openFilterMenu(filterType)}
					key={filterType}
				>
					<Icon
						name={`${filterType}${
							(this.isFiltersApplied() && this.isPresetsApplied(filterType)) ||
							isAsinsLandingPage
								? "Selected"
								: ""
						}`}
						size={18}
					/>
					<Label
						text={filterType === "asin" ? "ITEM ID" : filterType.toUpperCase()}
					/>
					<Icon
						name={`${this.renderFiltersArrowIcon(filterType)}`}
						size={12}
						handleIconClick={
							this.state.selectedFilter === filterType
								? this.closeFilterMenu
								: () => this.openFilterMenu(filterType)
						}
					/>
					{filterType !== "presets" && <VerticalSeparator />}
				</div>
			);
		});
	};

	onApplyFilters = (list, isViewPreset) => {
		if (!isViewPreset) {
			apiCallBasedOnRoute({ ...this.props, ...list });
			this.props.setBrandNamesInConfig(list.brandNames);
			this.props.setCategoryNamesInConfig(list.categoryNames);
			this.props.setProductsListInConfig(list.productIdList);
			this.props.setScoreTypeSelectorToDefault(
				!this.props.scoreTypeSelectorToDefault
			);
		} else {
			this.setState({
				viewPreset: !!isViewPreset
			});
			document.body.classList.add("noscroll");
		}

		this.closeFilterMenu();
	};

	renderDropdownContent = filterType => {
		switch (filterType) {
			case "brands":
				return (
					<BrandsDropdown
						closeFilterMenu={this.closeFilterMenu}
						onApplyFilters={this.onApplyFilters}
					/>
				);
			case "categories":
				return (
					<CategoriesDropdown
						closeFilterMenu={this.closeFilterMenu}
						onApplyFilters={this.onApplyFilters}
					/>
				);
			case "asin":
				return (
					<AsinDropdown
						closeFilterMenu={this.closeFilterMenu}
						onApplyFilters={this.onApplyFilters}
						setProductIdConfig={this.props.setProductIdConfig}
						isAsinsLandingPage={this.props.isAsinsLandingPage}
					/>
				);
			case "presets":
				return (
					<PresetsDropdown
						closeFilterMenu={this.closeFilterMenu}
						onApplyFilters={this.onApplyFilters}
					/>
				);
		}
	};

	isFilterSelected = () => this.state.selectedFilter !== "";
	hidePresetOverlay = () => {
		this.setState({
			viewPreset: false
		});
		document.body.classList.remove("noscroll");
	};
	render() {
		const { selectedFilter } = this.state;
		const { isAsinsLandingPage } = this.props;
		return (
			<Fragment>
				{this.isFilterSelected() && (
					<Overlay
						onClick={this.closeFilterMenu}
						className={"filters-bar-overlay"}
					/>
				)}

				<div
					className={`filters-bar-container`}
					style={this.isFilterSelected() ? { zIndex: "2" } : null}
				>
					<div
						className={`funnel-container ${
							this.isFiltersApplied() ? "applied" : ""
						}`}
					>
						<Icon
							name={`${
								this.isFiltersApplied() || isAsinsLandingPage
									? "funnelSelected"
									: "funnel"
							}`}
							size={18}
						/>
					</div>
					<VerticalSeparator />
					{this.renderFilterBar(isAsinsLandingPage)}
				</div>

				{this.isFilterSelected() && this.renderDropdownContent(selectedFilter)}
				{this.state.viewPreset && (
					<Presets hidePresetOverlay={this.hidePresetOverlay} />
				)}
			</Fragment>
		);
	}
}

export default FiltersBar;
