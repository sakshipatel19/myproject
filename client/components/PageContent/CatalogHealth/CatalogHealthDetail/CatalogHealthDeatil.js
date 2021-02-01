import React, { Component, Fragment } from "react";
import Search from "../../../common/Search/Search";
import Table from "../../../common/Table";
import Tab from "../../../common/Tab";
import Card from "../../../common/Card";
import PageContainer from "../../PageContainer";
import DropDown from "../../../common/Dropdown/DropdownWithState";
import "./CatalogHealthDetail.scss";
import Icon from "../../../common/Icon";
import { defaultTab, defaultTableFilter } from "./cataloghealth-reducers";
import { CATALOUGE_HEALTH, pageTitle } from "../../../../constants/PageHeaders";

import DataLoadError from "../../common/DataLoadError/DataLoadError";
import NoResultsMessage from "../../common/NoResultsMessage";
import Download from "../../../common/Download";
import LoadingTable from "../../../common/LoadingSkeleton/LoadingTable";

class CatalogHealthDetail extends Component {
	state = {
		selectedCategory: "All"
	};
	componentDidMount() {
		this.props.setSelectedPageInConfig(CATALOUGE_HEALTH);
		window.scrollTo(0, 0);
	}

	onTabChange = tab => {
		let payload = {
			...this.props,
			selectedTab: tab,
			tableFilter: defaultTableFilter,
			categoryNames:
				this.state.selectedCategory === "All"
					? this.props.categoryNames
					: [this.state.selectedCategory]
		};
		this.props.setSelectedTab(tab);
		this.props.setTableFilter(defaultTableFilter);
		this.props.fetchCatalogueHealthTable(payload);
	};

	onTableFilterChange = tableFilter => {
		const payload = {
			...this.props,
			tableFilter,
			categoryNames:
				this.state.selectedCategory === "All"
					? this.props.categoryNames
					: [this.state.selectedCategory]
		};
		this.props.setTableFilter(tableFilter);
		this.props.fetchCatalogueHealthTable(payload);
	};

	onSeachKeywordsChange = searchList => {
		const payload = {
			...this.props,
			tableFilter: defaultTableFilter,
			searchTerms: searchList,
			selectedTab: defaultTab,
			categoryNames:
				this.state.selectedCategory === "All"
					? this.props.categoryNames
					: [this.state.selectedCategory]
		};
		this.props.setSearchTermsFilter(searchList);
		this.props.setSelectedTab(defaultTab);
		this.props.setTableFilter(defaultTableFilter);
		this.props.fetchCatalogueHealthTabs(payload);
		this.props.fetchCatalogueHealthTable(payload);
	};

	getTableHeader = () => {
		return this.props.tableHeader;
	};

	handleCategorySelection = selectedCategory => {
		let categoryNames = [];
		categoryNames.push(selectedCategory);
		this.setState({ selectedCategory });
		const payload = {
			...this.props,
			categoryNames:
				selectedCategory === "All" ? this.props.categoryNames : categoryNames,
			tableFilter: defaultTableFilter,
			selectedTab: defaultTab
		};
		this.props.setSelectedTab(defaultTab);
		this.props.setTableFilter(defaultTableFilter);
		this.props.fetchCatalogueHealthTabs(payload);
		this.props.fetchCatalogueHealthTable(payload);
	};

	onDownloadTableClick = type => {
		const payload = {
			tableFilter: defaultTableFilter,
			selectedTab: this.props.selectedTab,
			categoryNames:
				this.state.selectedCategory === "All"
					? this.props.categoryNames
					: [this.state.selectedCategory],
			exportType: type
		};

		this.props.onDownloadClick(payload);
	};

	createUniqueKeyString = obj => `${obj.productId}`;

	render() {
		const {
			data,
			catalogHealthTableData,
			tabData,
			selectedTab,
			tableFilter,
			searchTerms,
			paginator,
			DataRowComponent,
			categoriesList,
			categoryNames,
			onRetryClick,
			tableExportData,
			onDownloadClick
		} = this.props;

		let tabRecords = tabData.data?.tabs || [];
		let categories = [...(categoriesList.data?.categories || [])];
		let configCategories = [...categoryNames];
		if (configCategories) configCategories.splice(0, 0, "All");
		categories = categories?.map(value => value.name);
		if (categories) categories.splice(0, 0, "All");
		return (
			<PageContainer title={pageTitle[CATALOUGE_HEALTH]}>
				<div className="catalog-health-detail-container">
					<Card>
						<div className="catalog-health-search-container">
							<div className="catalog-health-search">
								<Search
									placeholder={"Type to search here..."}
									getSearchedKeywordList={this.onSeachKeywordsChange}
									searchKeywordList={searchTerms || []}
								/>
							</div>
							<div className="catalog-health-filter">
								<Icon name={"funnel"} size={16} />
								FILTER
							</div>
						</div>
						<div className={"catalog-health-tab-container"}>
							<div className="catalog-health-tab">
								<Tab
									data={tabRecords}
									selectedTab={selectedTab}
									onTabChange={this.onTabChange}
								/>
							</div>
							<div className="catalog-health-tab-dropdown">
								<DropDown
									options={(configCategories.length > 1
										? configCategories
										: categories
									)?.map(value => ({ value, label: value }))}
									onSelect={this.handleCategorySelection}
									selectedOption={this.state.selectedCategory}
								/>
							</div>
							<div className="download-icon">
								{onDownloadClick && (
									<Download
										onClick={this.onDownloadTableClick}
										exportData={tableExportData}
									/>
								)}
							</div>
						</div>
						{catalogHealthTableData.fetching ? (
							// <LoadingIndicator />
							<LoadingTable />
						) : catalogHealthTableData.error ? (
							<DataLoadError handleRetry={onRetryClick} />
						) : data.length === 0 ? (
							<NoResultsMessage />
						) : (
							<div className={"catalog-health-table-container"}>
								<Table
									header={this.getTableHeader()}
									data={data}
									tableFilter={tableFilter}
									onTableFilterChange={this.onTableFilterChange}
									DataRowComponent={DataRowComponent}
									paginator={paginator}
									ispaginationRequired={paginator?.totalPages > 1}
									createUniqueKeyString={this.createUniqueKeyString}
								/>
							</div>
						)}
					</Card>
				</div>
			</PageContainer>
		);
	}
}

export default CatalogHealthDetail;
