import React, { Component } from "react";
import PageContainer from "../PageContainer";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import { BY_SEARCH, pageTitle } from "../../../constants/PageHeaders";
import BestSeller from "../BestSeller/BestSellerDiscoverability";
import KeywordsTable from "./KeywordsTable/KeywordsTable";
import SummaryChart from "../common/SummaryChart";
import Popup from "../../common/Modal/popup";
import { isInternalServerError } from "../../../utils/isInternalServerError";
const defaultTableFilter = {
	pageNo: 1,
	pageSize: 15,
	sortBy: "keyword",
	sortType: "ASC"
};
class BySearch extends Component {
	state = {
		selectedTableRows: [],
		selectedTableRowsSelection: [],
		viewTrends: false,
		showSelectedKeywords: false
	};
	componentDidMount() {
		apiCallBasedOnRoute(this.props);
		this.props.setSelectedNavLinkInConfig(BY_SEARCH);
		this.props.setSelectedPageInConfig(BY_SEARCH);
		this.props.setSelectedPrimaryModuleInConfig(
			this.props.match?.params?.primaryModule
		);
		this.setState({
			selectedTableRows: this.props.bySearchSelectedKeywordsList,
			selectedTableRowsSelection: this.props.bySearchSelectedKeywordsList,
			viewTrends: this.props.bySearchSelectedKeywordsList.length > 0
		});
	}
	componentDidUpdate(nextProps, prevProps) {
		if (nextProps.brandCompareView !== this.props.brandCompareView) {
			this.setState({
				selectedTableRows: [],
				selectedTableRowsSelection: [],
				viewTrends: false,
				showSelectedKeywords: false
			});
		}

		if (
			isInternalServerError([
				nextProps.overallScore,
				nextProps.bestSeller,
				nextProps.keywordsTable
			])
		) {
			this.props.history.push("/500");
		}
	}
	getBestSellersList = selectedCategory => {
		const bestSellerFilter = {
			...this.props,
			selectedCategory
		};
		this.props.setBestSellerSelectedCategory(selectedCategory);
		this.props.fetchDiscBySearchBestSeller(bestSellerFilter);
	};
	onClickBestSellerTable = (category, categories) => {
		this.props.setBestSellerSelectedCategory(category);
		this.props.setBestSellerCategoriesList(categories);
	};
	getKeywordsTableData = payload => {
		const keywordsPayload = {
			...this.props,
			...payload
		};
		this.props.fetchBySearchKeywordsTableData(keywordsPayload);
	};

	onBestSellerRetryClick = () => {
		this.props.fetchDiscBySearchBestSeller(this.props);
	};
	onKeywordsTableRetryClick = () => {
		this.getKeywordsTableData(this.props);
	};

	onSummaryChartSelectorChange = scoreType => {
		this.props.fetchBySearchOverallScore({ ...this.props, scoreType });
	};

	onSummaryRetryClick = () => {
		const payload = {
			...this.props
		};
		this.props.fetchBySearchOverallScore(payload);
	};
	handleViewTrendClick = () => {
		const selectedKeywordList = this.state.selectedTableRowsSelection.map(
			e => ({
				keyword: e.keyword,
				brand: Array.isArray(e.brand) ? e.brand[0] : e.brand
			})
		);
		const payload = {
			...this.props,
			bySearchSelectedKeywordsList: selectedKeywordList,
			tableFilter: defaultTableFilter
		};

		apiCallBasedOnRoute(payload);
		this.props.setBySearchSelectedKeywordsInConfig(selectedKeywordList);
		this.props.setTableFilterInConfig(defaultTableFilter);
		this.props.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);
		this.setState({
			selectedTableRows: this.state.selectedTableRowsSelection,
			showSelectedKeywords: false,
			viewTrends: true
		});
		window.scrollTo(0, 0);
	};

	handleOnClearSelectClick = () => {
		this.setState({
			selectedTableRows: [],
			selectedTableRowsSelection: [],
			showSelectedKeywords: false,
			viewTrends: false
		});
	};
	onCheckboxClick = selectedTableRows => {
		if (selectedTableRows.length > 0) {
			if (this.state.showSelectedKeywords) {
				this.setState({ selectedTableRowsSelection: selectedTableRows });
			} else {
				this.setState({
					selectedTableRows,
					selectedTableRowsSelection: selectedTableRows
				});
			}
		} else {
			this.handleOnClearSelectClick();
		}
	};
	onClickViewSelectedKeywords = () => {
		this.setState(
			{ showSelectedKeywords: !this.state.showSelectedKeywords },
			state => {
				if (!this.state.showSelectedKeywords) {
					this.setState({
						selectedTableRows: this.state.selectedTableRowsSelection
					});
				}
			}
		);
	};
	clearViewTrends = () => {
		const payload = {
			...this.props,
			bySearchSelectedKeywordsList: [],
			tableFilter: defaultTableFilter
		};
		apiCallBasedOnRoute(payload);
		this.props.setBySearchSelectedKeywordsInConfig([]);
		this.props.setTableFilterInConfig(defaultTableFilter);
		this.props.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);
		this.handleOnClearSelectClick();
	};
	editSelection = () => {
		const payload = {
			...this.props,
			bySearchSelectedKeywordsList: [],
			tableFilter: defaultTableFilter
		};
		apiCallBasedOnRoute(payload);
		this.props.setBySearchSelectedKeywordsInConfig([]);
		this.props.setTableFilterInConfig(defaultTableFilter);
		this.props.setScoreTypeSelectorToDefault(
			!this.props.scoreTypeSelectorToDefault
		);
		this.setState({
			viewTrends: false
		});
	};
	render() {
		const {
			overallScore,
			isDateCompareSelected,
			bestSeller,
			keywordsTable,
			tableFilter,
			setTableFilterInConfig,
			setBySearchSelectedKeywordsInConfig,
			brandCompareView,
			compareBrands,
			bySearchSelectedKeywordsList,
			pageConfig
		} = this.props;
		const keywordsLength = bySearchSelectedKeywordsList?.length;
		const summaryTitle =
			this.state.viewTrends && keywordsLength
				? `Scores <span class="regular">for</span> ${keywordsLength} <span class="regular">Keyword${keywordsLength > 1 ? "s" : ""
				}</span>`
				: "Scores";
		const keywordTitle =
			this.state.viewTrends && keywordsLength
				? `Keywords (${keywordsLength})`
				: "Keywords";

		return (
			<PageContainer title={pageTitle[BY_SEARCH]}>
				<SummaryChart
					score={overallScore}
					isBrandCompare={brandCompareView}
					isCompareSelected={isDateCompareSelected}
					onSelectorChange={this.onSummaryChartSelectorChange}
					onRetryClick={this.onSummaryRetryClick}
					compareBrands={compareBrands}
					title={summaryTitle}
					{...pageConfig[BY_SEARCH]?.summaryChart}
				/>
				{!isDateCompareSelected && !brandCompareView && (
					<BestSeller
						data={bestSeller}
						getBestSellersList={this.getBestSellersList}
						onRetryClick={this.onBestSellerRetryClick}
						onClickBestSellerTable={this.onClickBestSellerTable}
						{...pageConfig[BY_SEARCH]?.bestSeller}
					/>
				)}
				<KeywordsTable
					keywordsTable={keywordsTable}
					isBrandCompare={brandCompareView}
					tableFilter={tableFilter}
					onRetryClick={this.onKeywordsTableRetryClick}
					isDateCompareSelected={isDateCompareSelected}
					getKeywordsTableData={this.getKeywordsTableData}
					setTableFilterInConfig={setTableFilterInConfig}
					setBySearchSelectedKeywordsInConfig={
						setBySearchSelectedKeywordsInConfig
					}
					selectedTableRows={this.state.selectedTableRows}
					selectedTableRowsSelection={this.state.selectedTableRowsSelection}
					onCheckboxClick={this.onCheckboxClick}
					viewTrends={this.state.viewTrends}
					showSelectedKeywords={this.state.showSelectedKeywords}
					clearViewTrends={this.clearViewTrends}
					editSelection={this.editSelection}
					title={keywordTitle}
					{...pageConfig[BY_SEARCH]?.keywordsTable}

				/>
				{this.state.selectedTableRows.length > 0 && !this.state.viewTrends && (
					<Popup
						OnViewTrendsClick={this.handleViewTrendClick}
						onClearSelectClick={this.handleOnClearSelectClick}
						tableSelectedRecords={
							this.state.showSelectedKeywords
								? this.state.selectedTableRowsSelection
								: this.state.selectedTableRows
						}
						onClickViewSelectedKeywords={this.onClickViewSelectedKeywords}
						showSelectedKeywords={this.state.showSelectedKeywords}
						{...pageConfig[BY_SEARCH]?.keywordsTable}

					></Popup>)}
			</PageContainer>
		);
	}
}

export default BySearch;
