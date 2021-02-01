import React from "react";
import VerticalSeparator from "../../common/VerticalSeparator";
import Icon from "../../common/Icon";

const FiltersContainer = ({
	selectedBrandsCount,
	selectedCategoriesCount,
	selectedProductsCount,
	presetName,
	removeAllFilters = () => {}
}) => {
	return (
		<div className="selected-filters-container">
			<div className="selected-filters-text">
				{presetName === "" ? (
					<>
						<span>{selectedBrandsCount}</span>
						{selectedBrandsCount > 1 ? " BRANDS - " : " BRAND - "}
						<span>{selectedCategoriesCount}</span>
						{selectedCategoriesCount > 1 ? " CATEGORIES - " : " CATEGORY - "}
						<span>{selectedProductsCount}</span>
						{selectedProductsCount > 1 ? " ITEM IDS" : " ITEM ID"}
					</>
				) : (
					<>{presetName}</>
				)}
			</div>
			<VerticalSeparator />

			{/* <div
				className="save-preset-container"
				onClick={() => console.log("save presets action")}
			>
				<Icon name="savePreset" size="16" iconClass="error-icon" />
				<span className="clear-all-text">SAVE AS PRESET</span>
			</div> */}
			{/* <VerticalSeparator /> */}

			<div className="clear-all-container" onClick={() => removeAllFilters()}>
				<Icon name="clear" size="16" iconClass="error-icon" />
				<span className="clear-all-text">CLEAR ALL</span>
			</div>
		</div>
	);
};

export default FiltersContainer;
