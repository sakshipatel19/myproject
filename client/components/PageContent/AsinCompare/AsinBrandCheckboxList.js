import React, { useState } from "react";

import Checkbox, { checkboxStates } from "../../common/Checkbox";
import Icon from "../../common/Icon";
import "./AsinCompare.scss";

const AsinBrandCheckboxList = ({
	items = [],
	onCheckboxClick,
	selectedItems = [],
	listHeading,
	type
}) => {
	const [searchValue, setSearchValue] = useState("");

	const filteredItems = items?.filter(item =>
		item.name.toLowerCase().includes(searchValue.toLowerCase())
	);
	return (
		<div className="brand-compare-items-list-container">
			<div className="list-heading">{listHeading}</div>
			<div className={`search-container`}>
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
							onClick={() => {
								onCheckboxClick(item, !isChecked);
							}}
						>
							<div className="asin-comapre-list-item">
								{isChecked && (
									<Icon name="remove" size={12} iconClass="asin-brand-remove" />
								)}
								{item.name}
							</div>
							<Icon name="rightBlue" size={12} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AsinBrandCheckboxList;
