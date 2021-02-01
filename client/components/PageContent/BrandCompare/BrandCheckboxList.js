import React, { useState } from "react";

import Checkbox, { checkboxStates } from "../../common/Checkbox";
import Icon from "../../common/Icon";
import "./BrandCompare.scss";

const BrandCheckboxList = ({
	items = [],
	onCheckboxClick,
	selectedItems = [],
	listHeading,
	subHeading
}) => {
	const [searchValue, setSearchValue] = useState("");

	const filteredItems = items?.filter(item =>
		item.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<div className="brand-compare-items-list-container">
			<div className="list-heading">{listHeading}</div>
			{subHeading && <div className="sub-heading">{subHeading}</div>}
			<div className={`search-container ${subHeading && "top-seller"}`}>
				<Icon name="search" size={12} />
				<input
					type="text"
					placeholder="Type to search here..."
					className="search-input"
					value={searchValue}
					onChange={e => {
						setSearchValue(e.target.value);
					}}
				/>
			</div>
			<div className="brand-compare-checkbox-list-container">
				{filteredItems?.map((item, index) => {
					const isChecked = selectedItems.some(e => e.name === item.name);
					return (
						<div
							className={`brand-compare-checkbox-container ${
								isChecked ? "selected" : ""
							}`}
							key={`${item.name}_${index}`}
						>
							<Checkbox
								name={item.name}
								status={
									isChecked
										? checkboxStates.fullySelected
										: checkboxStates.unselected
								}
								onStateChange={() => {
									onCheckboxClick(item, !isChecked);
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default BrandCheckboxList;
