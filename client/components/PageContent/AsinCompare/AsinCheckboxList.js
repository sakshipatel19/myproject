import React, { useState } from "react";

import Checkbox, { checkboxStates } from "../../common/Checkbox";
import Icon from "../../common/Icon";
import "./AsinCompare.scss";

const AsinCheckboxList = ({
	items = [],
	onCheckboxClick,
	selectedItems = [],
	listHeading,
	subHeading
}) => {
	const [searchValue, setSearchValue] = useState("");

	const filteredItems = items?.filter(
		item =>
			item?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
			item?.productId?.toLowerCase().includes(searchValue.toLowerCase())
	);
	return (
		<div className="brand-compare-items-list-container asin">
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
			<div className="brand-compare-checkbox-list-container asin">
				{filteredItems?.map((item, index) => {
					const isChecked = selectedItems.some(
						e => e.productId === item.productId
					);
					return (
						<div
							className={`brand-compare-checkbox-container ${isChecked ? "selected" : ""
								}`}
							key={`${item.productId}_${index}`}
						>
							<Checkbox
								name={item.title}
								status={
									isChecked
										? checkboxStates.fullySelected
										: checkboxStates.unselected
								}
								onStateChange={() => {
									onCheckboxClick(item, !isChecked);
								}}
							/>
							<div className="asin-id">{item.productId}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AsinCheckboxList;
