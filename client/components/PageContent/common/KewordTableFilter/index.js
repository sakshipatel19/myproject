import React, { Component, Fragment } from "react";

import Overlay from "../../../common/Overlay";
import RangeSlider from "../../../common/RangeSlider";
import Icon from "../../../common/Icon";
import { numberFormat, styles } from "../../../../utils/number";
import "./KeywordTableFilter.scss";
import VerticalSeparator from "../../../common/VerticalSeparator";

const shareOfShelfScale = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const keywordType = ["Brand", "Competitor", "Generic"];

class KeywordTableFilter extends Component {
	state = {
		isHideEnble: false,
		positionTop: 0,
		searchVolMin: null,
		searchVolMax: null,
		shareShelfMin: null,
		shareShelfMax: null,
		selectedType: []
	};
	componentDidMount() {
		const { filterData } = this.props;

		this.setState({
			searchVolMin: filterData?.userMinSearchVolume,
			searchVolMax: filterData?.userMaxSearchVolume,
			shareShelfMin: filterData?.userMinSOS,
			shareShelfMax: filterData?.userMaxSOS,
			selectedType:
				filterData?.type && filterData?.type[0] !== "All"
					? filterData?.type
					: [],
			isHideEnble: filterData?.hideZeroPercentage
		});
	}
	onApplyFilter = () => {
		let {
			selectedType,
			shareShelfMin,
			shareShelfMax,
			searchVolMin,
			searchVolMax,
			isHideEnble
		} = this.state;
		console.log(isHideEnble);
		const { searchVolumeScale } = this.props;

		let filter = {};

		if (
			selectedType?.length < 1 &&
			!shareShelfMin &&
			!shareShelfMax &&
			!searchVolMin &&
			!searchVolMax &&
			!isHideEnble
		)
			filter = null;
		else {
			if (!shareShelfMax && !shareShelfMin && shareOfShelfScale) {
				shareShelfMax = shareOfShelfScale[shareOfShelfScale.length - 1];
				shareShelfMin = shareOfShelfScale[0];
			}

			if (!searchVolMax && !searchVolMin && searchVolumeScale) {
				searchVolMax = searchVolumeScale[searchVolumeScale.length - 1];
				searchVolMin = searchVolumeScale[0];
			}

			if (!selectedType || selectedType?.length <= 0) {
				selectedType = ["All"];
			}

			filter = {
				searchVolumes: searchVolumeScale,
				type: selectedType,
				userMaxSOS: shareShelfMax,
				userMinSOS: shareShelfMin,
				userMaxSearchVolume: searchVolMax,
				userMinSearchVolume: searchVolMin,
				hideZeroPercentage: isHideEnble
			};
		}
		this.props.onApplyFilter(filter);
		this.props.onFilterClose();
	};

	onClearFilter = () => {
		this.setState({
			searchVolMin: null,
			searchVolMax: null,
			shareShelfMin: null,
			shareShelfMax: null,
			selectedType: [],
			isHideEnble: false
		});
	};
	handleToggleHide = () => {
		this.setState({ isHideEnble: !this.state.isHideEnble });
	};
	onChangeShareShelf = (minVal, maxVal) => {
		this.setState({ shareShelfMin: minVal, shareShelfMax: maxVal });
	};

	onChangeSearchVolume = (minVal, maxVal) => {
		this.setState({ searchVolMin: minVal, searchVolMax: maxVal });
	};

	onKeywordTypeClick = keyword => {
		let keywords = this.state.selectedType;
		if (keywords.indexOf(keyword) > -1)
			keywords = keywords.filter(e => e !== keyword);
		else keywords = [...keywords, keyword];

		this.setState({ selectedType: keywords });
	};
	render() {
		const {
			getSearchedKeywordList,
			searchKeywordList,
			filterData,
			searchVolumeScale,
			maxSearchVol,
			countryCode
		} = this.props;

		const {
			isHideEnble,
			positionTop,
			shareShelfMin,
			shareShelfMax,
			searchVolMin,
			searchVolMax,
			selectedType
		} = this.state;
		return (
			<Fragment>
				<Overlay
					onClick={this.props.onFilterClose}
					className={"search-filter-overlay"}
				/>
				<div className={`search-filter-popup-container`}>
					<div className={"popup"}>
						<div className={"popup-header"}>
							<label className="header-label">Filter</label>
							<Icon
								name={"clear"}
								size={16}
								handleIconClick={this.props.onFilterClose}
							/>
						</div>
						<div className={"popup-content"}>
							<div className={"slider-for-search-volume"}>
								<RangeSlider
									header={"Search Volume"}
									scale={searchVolumeScale}
									minVal={searchVolMin}
									maxVal={searchVolMax}
									onChangeSlider={this.onChangeSearchVolume}
									formatMinMaxLabel={val =>
										numberFormat(val, countryCode, styles.decimal)
									}
								/>
							</div>
							<RangeSlider
								header={"Overall Scores"}
								scale={shareOfShelfScale}
								minVal={shareShelfMin}
								maxVal={shareShelfMax}
								onChangeSlider={this.onChangeShareShelf}
								formatMinMaxLabel={val => `${val}%`}
								isHide
								isHideEnble={isHideEnble}
								handleToggleHide={this.handleToggleHide}
							/>
							<div className={"type-filter"}>
								<div className={"type-filter-header"}>Type</div>
								<div className={"type-filter-content"}>
									{keywordType.map(e => {
										const isSelected = selectedType.indexOf(e) > -1;
										return (
											<label
												key={e}
												onClick={() => this.onKeywordTypeClick(e)}
												className={`filter-keyword-type ${
													isSelected ? "keyword-type-selected" : ""
												}`}
											>
												{e}
											</label>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					{/* <div className="total-keyword-container">
						<div className="total-keyword-count">{maxSearchVol}</div>
						<VerticalSeparator />
						<div className="total-keyword-text">
							<Icon name="refresh" iconClass="count-refresh" />
							Update Total Keywords
						</div>
					</div> */}
					<div className={"filter-buttons"}>
						<label onClick={this.onClearFilter} className={"filter-clear-data"}>
							Reset
						</label>
						<label className={"filter-apply"} onClick={this.onApplyFilter}>
							Apply
							<Icon
								name={"sortRight"}
								size={12}
								iconClass={"filter-apply-icon"}
							/>
							<Icon
								name={"sortRightBlue"}
								iconClass={"filter-apply-icon-hover"}
								size={12}
							/>
						</label>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default KeywordTableFilter;
