import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../common/Dropdown";
import VerticalSeparator from "../common/VerticalSeparator";
import Section from "../common/Section";
import "./Header.scss";
import Icon from "../common/Icon";
import auth0Client from "../../services/Auth";
import {
	defaultFromDate,
	defaultTableFilter,
	defaultToDate
} from "../global-reducers";
import { apiCallBasedOnRoute } from "../../services/apiCallBasedOnRoute";
import { detailsPages } from "../../constants/PageHeaders";
import { pageConfig } from "./pageConfig";
import Notifications from "./Notifications/Notifications";
import { checkboxStates } from "../common/Checkbox";

let notificationInterval = null;
const Header = props => {
	const { countryMarket, countryCode, marketCode, brandCompareView } = props;
	const getMarketPlacesList = (data, selectedCode) => {
		return data?.data?.countries
			?.find(e => e.countryCode === selectedCode)
			?.marketPlaces?.map(e => ({
				value: e.marketCode,
				label: e.marketLabel
			}));
	};

	const onSelectCountry = countryCode => {
		props.setCountryCodeInConfig(countryCode);

		const marketPlaces = getMarketPlacesList(props.countryMarket, countryCode);

		let marketCode = props.marketCode;
		if (marketPlaces) marketCode = marketPlaces[0].value;
		const pageConfigVal =
			pageConfig[`${countryCode}-${marketCode}`] || pageConfig.default;
		props.setMarketCodeInConfig(marketCode);
		props.setPageConfigInConfig(pageConfigVal);
		callApi(countryCode, marketCode);
		clearNotificationInterval();
		loadNotificationsList(countryCode, marketCode); //resetting notifications upon changing region
	};

	const onSelectMarketPlace = marketCode => {
		const pageConfigVal =
			pageConfig[`${props.countryCode}-${marketCode}`] || pageConfig.default;
		props.setMarketCodeInConfig(marketCode);
		props.setPageConfigInConfig(pageConfigVal);
		callApi(props.countryCode, marketCode);
		clearNotificationInterval();
		loadNotificationsList(props.countryCode, marketCode); //resetting notifications upon changing market
		getNotificationFilter(props.countryCode, marketCode);
		setSelectedFilterIds([]);
	};

	const countryOptions = countryMarket?.data?.countries?.map(e => ({
		value: e.countryCode,
		label: e.countryLabel,
		image: e.countryImgUrl
	}));

	const marketPlaceOptions = getMarketPlacesList(countryMarket, countryCode);

	const callApi = (countryCode, marketCode) => {
		const pageConfigVal =
			pageConfig[`${countryCode}-${marketCode}`] || pageConfig.default;
		resetFilters();
		apiCallBasedOnRoute({
			...props,
			countryCode,
			marketCode,
			brandNames: [],
			categoryNames: [],
			productIdList: [],
			fromDate: defaultFromDate,
			toDate: defaultToDate,
			compareFrom: "",
			compareTo: "",
			tableFilter: { ...defaultTableFilter },
			pageConfig: pageConfigVal
		});
	};

	const resetFilters = () => {
		props.setBrandNamesInConfig([]);
		props.setCategoryNamesInConfig([]);
		props.setProductsListInConfig([]);
		props.setTableFilterInConfig(defaultTableFilter);
		props.setPaidKeywodBrandsInConfig([]);
		props.setBySearchSelectedKeywordsInConfig([]);
		props.setCompareFromInConfig("");
		props.setCompareToInConfig("");
		props.setScoreTypeSelectorToDefault(!props.scoreTypeSelectorToDefault);
		props.setIsDateCompareSelected(false);
		props.setShowCompareDaterange(false);
		props.setFromDateInConfig(defaultFromDate);
		props.setToDateInConfig(defaultToDate);
	};

	const logout = () => auth0Client.logout();

	const disableFilters = () => {
		return (
			detailsPages.indexOf(props.selectedPage) > -1 ||
			props.brandCompareView ||
			props.isAsinsLandingPage
		);
	};

	const [showNotification, setShowNotification] = useState(false);
	const [selectedFilterIds, setSelectedFilterIds] = useState([]);
	const isFirstRun = useRef(true);

	const onNotificationClick = () => {
		setShowNotification(!showNotification);
	};
	const updateSelectedFilterIds = selectedIds => {
		setSelectedFilterIds(selectedIds);
	};
	const getNotificationFilter = (countryCode = "", marketCode = "") => {
		const payload = {
			clientOrg: props.clientOrg,
			countryCode: countryCode !== "" ? countryCode : props.countryCode,
			marketCode: marketCode !== "" ? marketCode : props.marketCode
		};
		props.getNotificationFilter(payload);
	};

	useEffect(() => {
		loadNotificationsList();
		getNotificationFilter();
		return function cleanup() {
			clearNotificationInterval(); //componentWillUnmount
		};
	}, []);

	useEffect(() => {
		if (isFirstRun.current) {
			//skip 1st run
			isFirstRun.current = false;
			return;
		}
		if (showNotification) {
			document.body.classList.add("noscroll");
			clearNotificationInterval();
		} else {
			document.body.classList.remove("noscroll");
			loadNotificationsList();
		}
	}, [showNotification]);

	const clearNotificationInterval = () => {
		clearInterval(notificationInterval);
		notificationInterval = null;
	};

	const setNotificationInterval = (countryCode = "", marketCode = "") => {
		const payload = {
			clientOrg: props.clientOrg,
			pageNo: 0,
			countryCode: countryCode !== "" ? countryCode : props.countryCode,
			marketCode: marketCode !== "" ? marketCode : props.marketCode,
			notificationTypeIdList: selectedFilterIds
		};
		notificationInterval = setInterval(() => {
			props.getNotificationsList(payload);
		}, 120000);
	};

	const updateNotificationStatus = newNotifications => {
		const payload = {
			newNotifications,
			clientOrg: props.clientOrg,
			pageNo: 0
		};
		props.updateNotificationStatus(payload);
	};

	const getNotificationsList = (page, notificationTypeIdList = []) => {
		const payload = {
			clientOrg: props.clientOrg,
			pageNo: page,
			countryCode: props.countryCode,
			marketCode: props.marketCode,
			notificationTypeIdList: notificationTypeIdList
		};
		props.getNotificationsList(payload);
	};

	const loadMoreNotifications = page => {
		const payload = {
			clientOrg: props.clientOrg,
			pageNo: page,
			countryCode: props.countryCode,
			marketCode: props.marketCode,
			notificationTypeIdList: selectedFilterIds
		};
		props.loadMoreNotificationsList(payload);
	};

	const loadNotificationsList = (countryCode = "", marketCode = "") => {
		const payload = {
			clientOrg: props.clientOrg,
			pageNo: 0,
			countryCode: countryCode !== "" ? countryCode : props.countryCode,
			marketCode: marketCode !== "" ? marketCode : props.marketCode,
			notificationTypeIdList: selectedFilterIds
		};
		props.getNotificationsList(payload);
		setNotificationInterval(countryCode, marketCode);
	};

	const getParentFilterStatus = filter => {
		if (selectedFilterIds === []) return checkboxStates.unselected;
		const selectedItems = filter.types.filter(
			type => selectedFilterIds.indexOf(type.notificationTypeId) !== -1
		).length;

		if (filter.types.length === selectedItems && selectedItems !== 0)
			return checkboxStates.fullySelected;
		else if (selectedItems === 0) return checkboxStates.unselected;
		else return checkboxStates.partiallySelected;
	};

	const createFilterObject = () => {
		let temp = {},
			temp1 = {},
			temp2 = [],
			result = [];
		for (let i = 0; i < filter.length; i++) {
			temp["name"] = filter[i].funcType;
			temp["filterStatus"] = getParentFilterStatus(filter[i]);
			temp1["funcType"] = temp;
			temp = {};
			for (let j = 0; j < filter[i].types.length; j++) {
				temp["notificationTypeId"] = filter[i].types[j]["notificationTypeId"];
				temp["notificationLabel"] = filter[i].types[j]["notificationLabel"];
				temp["isSelected"] =
					selectedFilterIds.indexOf(temp["notificationTypeId"]) !== -1
						? true
						: false;
				temp2.push(temp);
				temp = {};
			}
			temp1["types"] = temp2;
			temp2 = [];
			result.push(temp1);
			temp1 = {};
		}
		return result;
	};

	let filterData = props.notificationFilter?.data || null;
	let filter = [],
		modifiedFilter = [];
	if (filterData) {
		filter = filterData.funcTypes;
		modifiedFilter = createFilterObject();
	}

	return (
		<div className={"main-header"}>
			<div className={"header-left-container"}>
				<img
					alt="client-logo"
					className="client-logo-image"
					src={process.env.CLIENT_LOGO}
				/>
			</div>
			<div className={"header-right-container"}>
				<div className="header-filters">
					<Dropdown
						options={countryOptions}
						onSelect={onSelectCountry}
						selectedOption={countryCode}
						isDisabled={disableFilters()}
					/>

					<Dropdown
						options={marketPlaceOptions}
						onSelect={onSelectMarketPlace}
						selectedOption={marketCode}
						isDisabled={disableFilters()}
					/>
				</div>
				<VerticalSeparator className={"filter-icon-separator"} />
				<div className={"header-icons"}>
					<Section className={"header-icon-section notification"}>
						<Icon
							name={
								props.notifications?.data?.newNotificationsCount > 0
									? "bellWithDot"
									: "bell"
							}
							size={18}
							handleIconClick={onNotificationClick}
						/>
						{showNotification ? (
							<Notifications
								closeNotification={onNotificationClick}
								loadMore
								notifications={props.notifications}
								updateNotificationStatus={updateNotificationStatus}
								getNotificationsList={getNotificationsList}
								loadMoreNotifications={loadMoreNotifications}
								notificationLoadMore={props.notificationLoadMore}
								getNotificationFilter={getNotificationFilter}
								notificationFilter={props.notificationFilter}
								filter={modifiedFilter}
								updateSelectedFilterIds={updateSelectedFilterIds}
								selectedFilterIds={selectedFilterIds}
							/>
						) : null}
					</Section>
					<Section className={"header-icon-section"}>
						<Icon name={"profile"} size={18} handleIconClick={logout} />
					</Section>
				</div>
			</div>
		</div>
	);
};

export default Header;
