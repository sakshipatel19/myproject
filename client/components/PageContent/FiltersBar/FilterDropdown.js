import React, { useState, useEffect } from "react";
import Icon from "../../common/Icon";
import Checkbox, { checkboxStates } from "../../common/Checkbox";
import HorizontalSeparator from "../../common/HorizontalSeparator";
import Button from "../../common/Button";
import { compareValues } from "../../../utils/array";
import "./FilterDropdown.scss";

const FilterDropdown = ({
	items,
	closeFilterMenu,
	onApplyFilters,
	onViewButtonClick,
	isPresetsDropdown,
	isAsinsLandingPage = false,
	onViewAllPreset
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [checkboxItems, setCheckboxItems] = useState(items);
	const [allCheckboxStatus, setAllCheckboxStatus] = useState(
		checkboxStates.unselected
	);

	const shouldAllCheckboxBeChecked = items => {
		let newAllCheckboxStatus = checkboxStates.unselected;
		const howManyItemsSelected = items?.filter(
			item => item.filterStatus === checkboxStates.fullySelected
		);
		if (items) {
			newAllCheckboxStatus =
				howManyItemsSelected?.length === items?.length
					? checkboxStates.fullySelected
					: howManyItemsSelected?.length > 0
						? checkboxStates.partiallySelected
						: checkboxStates.unselected;
		}

		return newAllCheckboxStatus;
	};

	useEffect(() => {
		setCheckboxItems(items?.sort(compareValues("filterStatus")));
		setAllCheckboxStatus(shouldAllCheckboxBeChecked(items));
	}, [items]);

	const filteredItems = checkboxItems?.filter(item =>
		item.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	const getNewCheckboxStatus = currentStatus => {
		return currentStatus === checkboxStates.fullySelected ||
			currentStatus === checkboxStates.partiallySelected
			? checkboxStates.unselected
			: checkboxStates.fullySelected;
	};

	const updateCheckboxState = clickedItem => {
		const updatedCheckBoxItems = checkboxItems.map(item => {
			if (item.name === clickedItem.name) {
				return {
					...item,
					filterStatus: getNewCheckboxStatus(item.filterStatus)
				};
			} else {
				return item;
			}
		});

		const newAllCheckboxStatus = shouldAllCheckboxBeChecked(
			updatedCheckBoxItems
		);

		setCheckboxItems(updatedCheckBoxItems);
		setAllCheckboxStatus(newAllCheckboxStatus);
	};

	const onAllCheckboxClick = () => {
		let newCheckboxStatus = getNewCheckboxStatus(allCheckboxStatus);
		const updatedCheckBoxItems = checkboxItems.map(item => {
			return { ...item, filterStatus: newCheckboxStatus };
		});
		setCheckboxItems(updatedCheckBoxItems);
		setAllCheckboxStatus(newCheckboxStatus);
	};

	return (
		<div className={`filter-dropdown`}>
			<div className={`filter-dropdown-content`}>
				{!isPresetsDropdown && (
					<>
						<div className="search-container">
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
						{!isAsinsLandingPage && (
							<div className="checkbox-all">
								<Checkbox
									name="All"
									status={allCheckboxStatus}
									onStateChange={onAllCheckboxClick}
								/>
							</div>
						)}
						<HorizontalSeparator />
					</>
				)}
				<div
					className={`checkbox-list-container ${isAsinsLandingPage ? "asin-landing-page" : ""
						}`}
				>
					{filteredItems?.map((item, index) => {
						const getItemName = (name, numOfProducts) => {
							if (numOfProducts) return `${name} (${numOfProducts})`;
							else return `${name}`;
						};
						return (
							<div
								className="checkbox-container"
								key={`${item.name}_${index}`}
								onMouseEnter={e => {
									if (onViewButtonClick || isPresetsDropdown) {
										let newItems = [...checkboxItems];
										let product = newItems.find(
											newItem => newItem.name === item.name
										);
										onViewButtonClick && (product.showViewButton = true);
										isPresetsDropdown && (product.showRightArrow = true);
										setCheckboxItems(newItems);
										e.stopPropagation();
									}
								}}
								onMouseLeave={e => {
									if (onViewButtonClick || isPresetsDropdown) {
										let newItems = [...checkboxItems];
										let product = newItems.find(
											newItem => newItem.name === item.name
										);
										onViewButtonClick && (product.showViewButton = false);
										isPresetsDropdown && (product.showRightArrow = false);
										setCheckboxItems(newItems);
										e.stopPropagation();
									}
								}}
								onClick={() =>
									!isPresetsDropdown
										? updateCheckboxState(item)
										: onApplyFilters(checkboxItems, item)
								}
							>
								{!isPresetsDropdown ? (
									<>
										<Checkbox
											name={getItemName(item.name, item.numOfProducts)}
											status={item.filterStatus}
											key={item.name}
											isAsinsLandingPage={isAsinsLandingPage}
										/>
										{item.showViewButton && (
											<Button
												primary
												small
												buttonText="VIEW"
												className="view-asin-btn"
												onClick={e => {
													onViewButtonClick(item.name);
													e.stopPropagation();
												}}
											/>
										)}
									</>
								) : (
										<>
											<span className="presets-text">{item.name}</span>
											{item.showRightArrow && (
												<Icon name="presetRightArrow" size={14} />
											)}
										</>
									)}
							</div>
						);
					})}
				</div>

				<div className="filter-actions-container">
					{!isPresetsDropdown ? (
						<>
							<Button buttonText="CANCEL" secondary onClick={closeFilterMenu} />
							<div
								className="select-container"
								onClick={() => onApplyFilters(checkboxItems)}
							>
								<Button buttonText="SELECT" secondary />
								<Icon name="rightArrow" size={12} />
							</div>
						</>
					) : (
							<>
								<div
									className="select-container"
									onClick={() => onViewAllPreset(checkboxItems)}
								>
									<Button buttonText="VIEW ALL PRESETS" secondary={true} />
									<Icon name="rightArrow" size={12} />
								</div>
							</>
						)}
				</div>
			</div>
		</div>
	);
};

export default FilterDropdown;
