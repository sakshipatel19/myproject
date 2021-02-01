import React from "react";
import PropTypes from "prop-types";

import funnel from "../../../assets/icons/Funnel.svg";
import funnelSelected from "../../../assets/icons/FunnelSelected.svg";
import brands from "../../../assets/icons/Brand.svg";
import brandsSelected from "../../../assets/icons/BrandSelected.svg";
import categories from "../../../assets/icons/Category.svg";
import categoriesSelected from "../../../assets/icons/CategorySelected.svg";
import presets from "../../../assets/icons/Presets.svg";
import presetsSelected from "../../../assets/icons/PresetsSelected.svg";
import down from "../../../assets/icons/Down.svg";
import downBlue from "../../../assets/icons/DownBlue.svg";
import calenderBlue from "../../../assets/images/NewCalenderBlue.svg";
import calenderOrange from "../../../assets/images/NewCalenderOrange.svg";
import calenderCompare from "../../../assets/images/NewCompare.svg";
import calenderDisable from "../../../assets/images/CalenderDisable.svg";
import error from "../../../assets/images/Error.svg";
import upBlue from "../../../assets/icons/UpBlue.svg";
import bell from "../../../assets/icons/New_Bell.svg";
import bellWithDot from "../../../assets/icons/NoNew.svg";
import profile from "../../../assets/icons/Profile.svg";
import asin from "../../../assets/icons/Asin.svg";
import add from "../../../assets/icons/Add.svg";
import addRemove from "../../../assets/icons/Add Remove.svg";
import inBound from "../../../assets/icons/Inbound.svg";
import outBound from "../../../assets/icons/Outbound.svg";
import remove from "../../../assets/icons/RemoveUse.svg";
import closeLeftNav from "../../../assets/icons/RemoveUseAsinsPage.svg";
import removeNotification from "../../../assets/icons/RemoveUse_notification.svg";
import asinSelected from "../../../assets/icons/AsinSelected.svg";
import externalPage from "../../../assets/images/ExternalPage.svg";
import check from "../../../assets/images/Check.svg";
import sortUp from "../../../assets/images/Sort Up.svg";
import sortDown from "../../../assets/images/Sort Down.svg";
import dataError from "../../../assets/icons/AttentionSmall.svg";
// import refresh from "../../../assets/images/Refresh.svg";
import rightArrow from "../../../assets/images/RightLarge.svg";
import blueRightArrow from "../../../assets/images/BlueRightArrow.svg";
import sortRight from "../../../assets/images/Sort Right.svg";
import sortRightBlue from "../../../assets/images/Sort Right Blue.svg";
import sortLeft from "../../../assets/images/Sort Left.svg";
import noDataOutline from "../../../assets/images/NoDataOutline.svg";
import arrowCircleRight from "../../../assets/images/ArrowCircle-Right.svg";
import arrowCircleLeft from "../../../assets/images/ArrowCircle-Left.svg";
import imageNotAvailable from "../../../assets/images/ImageNotAvailable.svg";

import checkNormal from "../../../assets/icons/CheckNormal.svg";
import checkHover from "../../../assets/icons/CheckHover.svg";
import checkPartial from "../../../assets/icons/CheckPartial.svg";
import checkSelected from "../../../assets/icons/CheckSelected.svg";
import search from "../../../assets/icons/Search.svg";
import download from "../../../assets/images/Download.svg";
import actionable from "../../../assets/icons/Yes.svg";
import nonActionable from "../../../assets/icons/No.svg";
import savePreset from "../../../assets/icons/SavePreset.svg";
import clear from "../../../assets/icons/Clear.svg";
import dashboard from "../../../assets/images/Dashboard.svg";
import shelf from "../../../assets/images/Shelf.svg";
import boost from "../../../assets/images/Boost.svg";
import amplify from "../../../assets/images/Amplify.svg";
import ciLogo from "../../../assets/images/CI-Black-logo.svg";
import dashboardHighlighted from "../../../assets/images/DashboardHighlighted.svg";
import shelfHighlighted from "../../../assets/images/ShelfHighlighted.svg";
import boostHighlighted from "../../../assets/images/BoostHighlighted.svg";
import amplifyHighlighted from "../../../assets/images/AmplifyHighlighted.svg";
import backTop from "../../../assets/icons/BackTop.svg";
import ciWhiteLogo from "../../../assets/images/CI-Logo.svg";
import addBlue from "../../../assets/icons/Add Blue.svg";
import info from "../../../assets/images/Information.svg";
import left from "../../../assets/images/Left.svg";
import leftDisable from "../../../assets/images/LeftArrow-Disable.svg";
import right from "../../../assets/images/Right.svg";
import rightDisable from "../../../assets/images/RightArrow-Disable.svg";
import rightBlue from "../../../assets/images/Right-blue.svg";
import presetRightArrow from "../../../assets/images/presetRightArrow.svg";
import brandComapre from "../../../assets/icons/BrandCompare.svg";
import clearWhite from "../../../assets/icons/ClearWhite.svg";
import edit from "../../../assets/icons/Edit.svg";
import savePresetDisabled from "../../../assets/icons/Icon-Save-Disabled.svg";
import refresh from "../../../assets/icons/Refresh.svg";
import toggleEnable from "../../../assets/icons/ToggleEnabled.svg";
import toggleDisabled from "../../../assets/icons/ToggleDisabled.svg";
import rightIconHover from "../../../assets/icons/ActiveArrowBG.svg";

import "./Icon.scss";

const iconMapping = {
	funnel,
	funnelSelected,
	brands,
	brandsSelected,
	down,
	downBlue,
	categories,
	categoriesSelected,
	presets,
	presetsSelected,
	calenderBlue,
	calenderOrange,
	calenderCompare,
	calenderDisable,
	error,
	upBlue,
	bellWithDot,
	bell,
	profile,
	asin,
	add,
	addRemove,
	outBound,
	inBound,
	remove,
	removeNotification,
	asinSelected,
	externalPage,
	check,
	sortUp,
	sortDown,
	dataError,
	refresh,
	rightArrow,
	blueRightArrow,
	checkNormal,
	checkPartial,
	checkHover,
	checkSelected,
	search,
	download,
	actionable,
	nonActionable,
	savePreset,
	clear,
	dashboard,
	shelf,
	boost,
	amplify,
	ciLogo,
	dashboardHighlighted,
	shelfHighlighted,
	boostHighlighted,
	amplifyHighlighted,
	backTop,
	ciWhiteLogo,
	backTop,
	sortRight,
	addBlue,
	sortRightBlue,
	sortLeft,
	noDataOutline,
	info,
	left,
	leftDisable,
	right,
	rightDisable,
	rightBlue,
	brandComapre,
	clearWhite,
	edit,
	savePresetDisabled,
	arrowCircleRight,
	arrowCircleLeft,
	toggleEnable,
	toggleDisabled,
	rightIconHover,
	closeLeftNav,
	presetRightArrow,
	imageNotAvailable
};

const Icon = ({
	name,
	size,
	iconClass = "",
	handleIconClick = () => {},
	handleMouseEnterClick = () => {},
	handleMouseLeaveClick = () => {},
	title = ""
}) => (
	<img
		src={iconMapping[name]}
		width={size}
		height={size}
		className={`icon-class ${iconClass}`}
		onClick={handleIconClick}
		onMouseEnter={handleMouseEnterClick}
		onMouseLeave={handleMouseLeaveClick}
		title={title}
	/>
);

Icon.propTypes = {
	name: PropTypes.string.isRequired
};

export default Icon;
