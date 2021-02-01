import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	setSelectedPageInConfig,
	setTableFilterInConfig
} from "../../../global-actions";
import {
	fetchAvailabilityLostBuyBoxDetails,
	fetchAvailabilityLostBuyBox
} from "./../availability-actions";
import DataLoadError from "../../common/DataLoadError/DataLoadError";
import NoResultsMessage from "../../common/NoResultsMessage";
import Card from "../../../common/Card";
import PageContainer from "../../PageContainer";
import LostBuyBoxDetailsHeader from "./LostBuyBoxDetailsHeader";
import Search from "../../../common/Search/Search";
import Table from "../../../common/Table";
import { LOST_BUY_BOX, pageTitle } from "../../../../constants/PageHeaders";
import {
	DONUT_CHART_PRIMARY_COLORS,
	DONUT_CHART_SECONDARY_COLORS
} from "../../../../constants/colors";
import DotWithLabel from "../../../common/DotWithLabel";
import { isNullOrUndefined } from "util";
import LoadingTable from "../../../common/LoadingSkeleton/LoadingTable";

const defaultTableFilter = {
	pageNo: 1,
	pageSize: 15,
	sortBy: "productName",
	sortType: "ASC",
	searchTerms: []
};

const tableHeader = [
	{
		name: "Product",
		key: "productName",
		isSortable: true,
		style: { width: "40%" }
	},
	{
		name: "Score",
		key: "score",
		isSortable: true,
		style: { width: "15%" },
		isNumber: true
	},
	{
		name: "Out of Stock",
		key: "outOfStock",
		isSortable: true,
		style: { width: "15%" },
		isNumber: true
	},
	{
		name: "Pricing",
		key: "pricing",
		isSortable: true,
		style: { width: "15%" },
		isNumber: true
	},
	{
		name: "Other Factors",
		key: "otherFacts",
		isSortable: true,
		style: { width: "15%" },
		isNumber: true
	}
];

class LostBuyBoxDetails extends Component {
	componentDidMount() {
		const payload = this.getPayload(defaultTableFilter);
		this.props.setTableFilterInConfig(defaultTableFilter);
		this.props.setSelectedPageInConfig(LOST_BUY_BOX);
		this.props.fetchAvailabilityLostBuyBox(payload);
		this.props.fetchAvailabilityLostBuyBoxDetails(payload);
	}

	DataRowComponent = row => {
		return (
			<tr>
				<td className={"table-cell-product-name"}>
					<div>{row.productName}</div>
					<div className={"table-cell-product-code"}>{row.productId}</div>
				</td>
				<td className={"number-text"}>{`${row.score?.scoreInitial}%`}</td>
				<td className={"number-text"}>{`${row.outOfStock?.scoreInitial}%`}</td>
				<td className={"number-text"}>{`${row.pricing?.scoreInitial}%`}</td>
				<td className={"number-text"}>{`${row.otherFacts?.scoreInitial}%`}</td>
			</tr>
		);
	};
	DataRowComponentWithCompare = row => {
		const { isDateCompareSelected } = this.props;
		return (
			<tr>
				<td className={"table-cell-product-name"}>
					<div>{row.productName}</div>
					<div className={"table-cell-product-code"}>{row.productId}</div>
				</td>
				<td className={"number-text"}>
					<DotWithLabel
						text={this.getScore(row.score?.scoreInitial)}
						color={DONUT_CHART_PRIMARY_COLORS[0]}
					/>
					<DotWithLabel
						text={this.getScore(row.score?.scoreCompare)}
						color={DONUT_CHART_SECONDARY_COLORS[0]}
					/>
				</td>
				<td className={"number-text"}>
					<DotWithLabel
						text={this.getScore(row.outOfStock?.scoreInitial)}
						color={DONUT_CHART_PRIMARY_COLORS[0]}
					/>
					<DotWithLabel
						text={this.getScore(row.outOfStock?.scoreCompare)}
						color={DONUT_CHART_SECONDARY_COLORS[0]}
					/>
				</td>
				<td className={"number-text"}>
					<DotWithLabel
						text={this.getScore(row.pricing?.scoreInitial)}
						color={DONUT_CHART_PRIMARY_COLORS[0]}
					/>
					<DotWithLabel
						text={this.getScore(row.pricing?.scoreCompare)}
						color={DONUT_CHART_SECONDARY_COLORS[0]}
					/>
				</td>
				<td className={"number-text"}>
					<DotWithLabel
						text={this.getScore(row.otherFacts?.scoreInitial)}
						color={DONUT_CHART_PRIMARY_COLORS[0]}
					/>
					<DotWithLabel
						text={this.getScore(row.otherFacts?.scoreCompare)}
						color={DONUT_CHART_SECONDARY_COLORS[0]}
					/>
				</td>
			</tr>
		);
	};
	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.props?.labelTextFormat
			? this.props.labelTextFormat(score)
			: `${score}%`;
	onTableFilterChange = tableFilter => {
		this.props.setTableFilterInConfig(tableFilter);
		const payload = this.getPayload(tableFilter);
		this.props.fetchAvailabilityLostBuyBoxDetails(payload);
	};

	componentWillUnmount() {
		this.props.setTableFilterInConfig(defaultTableFilter);
	}

	onSeachKeywordsChange = searchKeywords => {
		const tableFilter = {
			...this.props.tableFilter,
			searchTerms: searchKeywords
		};
		this.props.setTableFilterInConfig(tableFilter);
		const payload = this.getPayload(tableFilter, searchKeywords);
		this.props.fetchAvailabilityLostBuyBoxDetails(payload);
	};
	getPayload(tableFilter, searchTerms = []) {
		return {
			...this.props,
			tableFilter,
			searchTerms
		};
	}
	createUniqueKeyString = obj => `${obj.productId}`;

	render() {
		const {
			lostBuyBoxDetails,
			lostBuyBox,
			tableFilter,
			onRetryClick,
			isDateCompareSelected
		} = this.props;
		const searchTerms = tableFilter.searchTerms;
		return (
			<PageContainer title={pageTitle[LOST_BUY_BOX]}>
				<div className="lost-buy-box-details-container">
					<Card>
						<div className={"lost-buy-box-details"}>
							<LostBuyBoxDetailsHeader
								data={lostBuyBox}
								isDateCompareSelected={isDateCompareSelected}
							/>
							<div className="lost-buy-box-search-container">
								<Search
									placeholder={"Search by Title, Product"}
									getSearchedKeywordList={this.onSeachKeywordsChange}
									searchKeywordList={searchTerms || []}
								/>
							</div>
							<div className={"lost-buy-box-table-container"}>
								{lostBuyBoxDetails?.fetching ? (
									<LoadingTable />
								) : lostBuyBoxDetails?.error ? (
									<DataLoadError handleRetry={onRetryClick} />
								) : lostBuyBoxDetails?.data === "" ? (
									<NoResultsMessage />
								) : (
									<Table
										header={tableHeader}
										data={
											lostBuyBoxDetails?.data?.buyBoxTableDetails
												?.buyBoxTableList
										}
										paginator={
											lostBuyBoxDetails?.data?.buyBoxTableDetails?.paginator
										}
										tableFilter={tableFilter}
										createCompareString={e => e.productName}
										DataRowComponent={
											isDateCompareSelected
												? this.DataRowComponentWithCompare
												: this.DataRowComponent
										}
										onTableFilterChange={this.onTableFilterChange}
										createUniqueKeyString={this.createUniqueKeyString}
									/>
								)}
							</div>
						</div>
					</Card>
				</div>
			</PageContainer>
		);
	}
}

const mapStateToProps = state => {
	let config = state.global.config;
	let { lostBuyBoxDetails, lostBuyBox } = state.availability;
	return { ...config, lostBuyBoxDetails, lostBuyBox };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setSelectedPageInConfig,
			fetchAvailabilityLostBuyBoxDetails,
			fetchAvailabilityLostBuyBox,
			setTableFilterInConfig
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(LostBuyBoxDetails);
