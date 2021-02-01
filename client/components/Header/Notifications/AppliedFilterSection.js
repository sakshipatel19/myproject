import React, { Fragment, useState, useEffect } from "react";
import { checkboxStates } from "../../common/Checkbox";
import Icon from "../../common/Icon";
import VerticalSeparator from "../../common/VerticalSeparator";

const AppliedFilterSection = props => {
	const { filter, selectedFilterIds } = props;
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [rightArrow, setRightArrow] = useState(true);
	const [leftArrow, setLeftArrow] = useState(false);
	const filterSlider = React.createRef();

	useEffect(() => {
		generateFilterItems();
	}, []);

	useEffect(() => {
		const scrollWidth = filterSlider.current.scrollWidth;
		const clientWidth = filterSlider.current.clientWidth;
		const scrollLeft = filterSlider.current.scrollLeft;
		//if less filters are there then disable rightArrow
		if (scrollWidth <= clientWidth) setRightArrow(false);
		else setRightArrow(true);
		if (scrollLeft === 0) setLeftArrow(false);
	}, [selectedFilters]);

	const generateFilterItems = () => {
		let filterItems = [];
		filter.map(item => {
			if (item.funcType.filterStatus === checkboxStates.fullySelected)
				filterItems.push(item.funcType.name);
			else if (item.funcType.filterStatus === checkboxStates.unselected) return;
			else {
				item.types.map(type => {
					if (selectedFilterIds.indexOf(type.notificationTypeId) !== -1)
						filterItems.push(type.notificationLabel);
				});
			}
		});
		setSelectedFilters(filterItems);
	};
	const onCloseFilter = name => {
		let filters = [...selectedFilterIds];
		let labels = [...selectedFilters];

		labels.splice(labels.indexOf(name), 1);
		filter.map(item => {
			if (name === item.funcType.name) {
				item.types.map(type => {
					filters.splice(filters.indexOf(type.notificationTypeId), 1);
				});
			} else {
				item.types.map(type => {
					if (name === type.notificationLabel)
						filters.splice(
							selectedFilterIds.indexOf(type.notificationTypeId),
							1
						);
				});
			}
		});

		props.onCloseFilterIcon(filters);
		setSelectedFilters(labels);
	};
	const getFilterDivs = () => {
		return selectedFilters?.map((item, i) => {
			return (
				<div className={"filter-item"} key={`${item}-${i}`}>
					<span className={"label"}>{item}</span>
					<Icon
						name="remove"
						size={14}
						iconClass="remove"
						handleIconClick={() => onCloseFilter(item)}
					/>
				</div>
			);
		});
	};
	const onLeftClick = () => {
		const scrollLeft = filterSlider.current.scrollLeft;
		const scrollWidth = filterSlider.current.scrollWidth;
		const clientWidth = filterSlider.current.clientWidth;

		if (scrollLeft === 0) {
			setLeftArrow(false);
			return;
		}
		filterSlider.current.scroll({
			top: 0,
			left: scrollLeft - 30,
			behavior: "smooth"
		});
		scrollLeft < scrollWidth - clientWidth && setRightArrow(true);
		//again check for above condition after scrolling
		if (scrollLeft - 30 <= 0) {
			setLeftArrow(false);
			return;
		}
	};
	const onRightClick = () => {
		const scrollLeft = filterSlider.current.scrollLeft;
		const scrollWidth = filterSlider.current.scrollWidth;
		const clientWidth = filterSlider.current.clientWidth;
		if (scrollWidth - scrollLeft <= clientWidth) {
			setRightArrow(false);
			return;
		}
		filterSlider.current.scroll({
			top: 0,
			left: scrollLeft + 30,
			behavior: "smooth"
		});
		scrollLeft > 0 && setLeftArrow(true);
		//after scrolling once again checking for above condition
		if (scrollWidth - (scrollLeft + 30) <= clientWidth) {
			setRightArrow(false);
			return;
		}
	};
	return (
		<Fragment>
			<VerticalSeparator />
			<div className="notification-filter-slider">
				<div
					style={
						leftArrow ? { visibility: "visible" } : { visibility: "hidden" }
					}
				>
					<Icon name={"left"} size={15} handleIconClick={onLeftClick} />
				</div>
				<div className="filters-content" ref={filterSlider}>
					{getFilterDivs()}
				</div>
				<div
					style={
						rightArrow ? { visibility: "visible" } : { visibility: "hidden" }
					}
				>
					<Icon
						name={"right"}
						size={15}
						handleIconClick={onRightClick}
						iconClass="rightArrow"
					/>
				</div>
			</div>
		</Fragment>
	);
};
export default AppliedFilterSection;
