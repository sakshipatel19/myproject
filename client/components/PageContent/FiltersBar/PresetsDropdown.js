import React, { Component } from "react";
import FilterDropdown from "./FilterDropdown";
import { fetchPresetsList } from "./filters-bar-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "../../global-actions";

class PresetsDropdown extends Component {
	componentDidMount() {
		this.props.fetchPresetsList(this.props);
	}

	onViewAllPreset = selectedItems => {

		this.props.onApplyFilters({
			brandNames: [],
			categoryNames: [],
			productIdList: []
		}, true);
	};
	onPresetSelect = (allPresets, selectedPreset) => {
		let brandNames = [],
			categoryNames = [],
			productIdList = [];
		allPresets.forEach(item => {
			if (item.presetId === selectedPreset.presetId) {
				brandNames = [...item.brands];
				categoryNames = [...item.categories];
				productIdList = [...item.itemids];
			}
		});
		this.props.setPresetNameInConfig(selectedPreset.name);
		this.props.onApplyFilters({
			brandNames,
			categoryNames,
			productIdList
		});
	};

	render() {
		return (
			<div className="presets-dropdown">
				<FilterDropdown
					items={this.props.presetsList?.data?.presets}
					closeFilterMenu={this.props.closeFilterMenu}
					onViewAllPreset={this.onViewAllPreset}
					onApplyFilters={this.onPresetSelect}
					isPresetsDropdown
				/>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		...store.global.config,
		...store.filtersBar
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchPresetsList, ...globalActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PresetsDropdown);
