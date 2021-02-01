import React, { Component } from "react";
import PageContainer from "../PageContainer";
import { BESTSELLER_DETAILS, pageTitle } from "../../../constants/PageHeaders";
import Card from "../../common/Card";
import Search from "../../common/Search/Search";
import Table from "../../common/Table";
import Dropdown from "../../common/Dropdown/DropdownWithState";
import Icon from "../../common/Icon";
import LoadingTable from "../../common/LoadingSkeleton/LoadingTable";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import NoResultsMessage from "../common/NoResultsMessage";
import "./BestSeller.scss";

const defaultTableFilter = {
	pageNo: 1,
	pageSize: 15,
	sortBy: "keyword",
	sortType: "ASC"
};
class BestSellerKeywordDetail extends Component {
	state = {
		tableFilter: defaultTableFilter
	};
	getCommonPayload = (selectedCategory = "") => {
		return {
			tableFilter: this.state.tableFilter,
			selectedCategory: selectedCategory
		};
	};
	componentDidMount() {
		let payload = {
			tableFilter: this.state.tableFilter,
			selectedCategory: this.props.selectedCategory,
			categoryNames: this.props.categoryNames
		};
		this.props.setSelectedPageInConfig(BESTSELLER_DETAILS);
		this.props.getBestSellerKeywordDetail(payload);
		window.scrollTo(0, 0);
	}
	onSeachKeywordsChange = searchList => {
		let tableFilter = {
			...defaultTableFilter,
			searchTerms: searchList
		};
		this.onTableFilterChange(tableFilter);
	};

	onTableFilterChange = tableFilter => {
		const payload = {
			tableFilter,
			selectedCategory: this.props.data?.data?.selectedCategory
		};
		this.setState({ tableFilter });
		this.props.getBestSellerKeywordDetail(payload);
	};
	onCategoryDropdownChange = selectedCategory => {
		this.setState({ tableFilter: defaultTableFilter });
		this.props.getBestSellerKeywordDetail(
			this.getCommonPayload(selectedCategory)
		);
	};

	createUniqueKeyString = obj =>
		`${obj.keyword}_${obj.keywordType}_${obj.brand}`;

	render() {
		const {
			data,
			tableHeader,
			DataRowComponent,
			getBestSellerKeywordDetail,
			categoryNames,
			enable
		} = this.props;
		const keywordsData = data?.data || {};
		const paginator = keywordsData?.paginator || {};
		const shareOfShelfList = keywordsData?.shareOfShelfList || [];
		const searchTerms = this.state.tableFilter?.searchTerms || [];
		const selectedCategory = keywordsData?.selectedCategory || "";

		return (enable ?
			<PageContainer title={pageTitle[BESTSELLER_DETAILS]}>
				<div className="bestseller-keyword-detail-container">
					<Card>
						<div className="bestseller-keyword-search-container">
							<div className="bestseller-keyword-search">
								<Search
									placeholder={"Type to search here..."}
									getSearchedKeywordList={this.onSeachKeywordsChange}
									searchKeywordList={searchTerms || []}
								/>
							</div>
							<div className="bestseller-keyword-dropdown">
								<Dropdown
									options={categoryNames?.map(value => ({
										value,
										label: value
									}))}
									onSelect={this.onCategoryDropdownChange}
									selectedOption={selectedCategory}
								/>
							</div>
							<div className="bestseller-keyword-filter">
								<Icon name={"funnel"} size={16} />
								FILTER
							</div>
						</div>
						{data?.fetching ? (
							<LoadingTable />
						) : data?.error ? (
							<DataLoadError
								handleRetry={() =>
									getBestSellerKeywordDetail(
										this.getCommonPayload(selectedCategory)
									)
								}
							/>
						) : shareOfShelfList?.length === 0 ? (
							<NoResultsMessage />
						) : (
										<div className="bestseller-keyword-table-container">
											<Table
												header={tableHeader}
												data={shareOfShelfList}
												tableFilter={this.state.tableFilter}
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
			</PageContainer> : null
		);
	}
}

export default BestSellerKeywordDetail;
