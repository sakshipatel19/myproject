import React, { Component, Fragment } from "react";
import Card from "../../../common/Card";
import DataLoadError from "../../common/DataLoadError/DataLoadError";
import NoResultsMessage from "../../common/NoResultsMessage";
import Search from "../../../common/Search/Search";
import Table from "../../../common/Table";
import Td from '../../../common/Table/Td';
import Label from "../../../common/Label";
import {
	DATE_COMPARE_COLORS
} from "../../../../constants/colors";
import DotWithLabel from "../../../common/DotWithLabel";
import { isNullOrUndefined } from "../../../../utils/number";
import { numberFormat, styles } from "../../../../utils/number";
import "./KeywordsTable.scss";
import Icon from "../../../common/Icon";
import KeywordTableFilter from "../../common/KewordTableFilter";
import LoadingTable from "../../../common/LoadingSkeleton/LoadingTable";

const defaultTableFilter = {
	pageNo: 1,
	pageSize: 15,
	sortBy: "keyword",
	sortType: "ASC"
};

class KeywordTable extends Component {
	state = {
		isFilterClicked: false,
		selectedKeywordsPaginator: {},
		searchTerms: [],
		filteredTableRows: []
	}
	componentDidMount() {
		const payload = this.getPayload(defaultTableFilter);
		this.props.setTableFilterInConfig(defaultTableFilter);
		this.props.getKeywordsTableData(payload);
	}
	componentDidUpdate(prevProps) {
		if (this.props.showSelectedKeywords !== prevProps.showSelectedKeywords) {
			this.props.showSelectedKeywords && this.setPaginator(this.props.selectedTableRows);
			this.setState({ searchTerms: [] });
		}
	}
	componentWillUnmount() {
		this.props.setTableFilterInConfig(defaultTableFilter);
	}

	handleKeywordTableFilter = () => {
		this.setState({ isFilterClicked: true });
	};
	onFilterClose = () => {
		this.setState({ isFilterClicked: false });
	};
	DataRowComponent = row => {
		const { tableHeader } = this.props;
		return (
			<tr>
				{tableHeader?.map((col, i, arr) => {
					let cellValue = col.isNumber ? this.tableDataConstructor(row[col.key]) : row[col.key];
					cellValue = col.key === 'searchVolume' ? this.searchVolumeScoreConstructor(cellValue) : cellValue;
					const className = [];
					i === 0 && className.push("first-column");
					i === arr.length - 1 && className.push("last-column");
					(col.isNumber || col.key === 'searchVolume') && className.push("number-text");

					return (i === 0 ?
						<Td className={className.join(' ')}
							isCheckboxRequired={!this.props.viewTrends}
							onCheckBoxSelect={row.onCheckBoxSelect}
							isCheckboxSelected={row.isCheckboxSelected} key={i}>{cellValue}</Td> :
						<td className={className.join(' ')} key={i}>
							{cellValue}
						</td>
					);
				})
				}
			</tr>
		);
	};
	searchVolumeScoreConstructor = searchVolume => {
		return numberFormat(searchVolume, this.props.countryCode, styles.decimal);
	};
	tableDataConstructor = data => {
		const { isDateCompareSelected } = this.props;
		if (!isDateCompareSelected) {
			return `${this.getScore(data?.initial)}`;
		} else {
			return (
				<Fragment>
					<DotWithLabel
						text={this.getScore(data?.initial)}
						color={DATE_COMPARE_COLORS[0]}
						className="primary"
					/>
					<DotWithLabel
						text={this.getScore(data?.compare)}
						color={DATE_COMPARE_COLORS[1]}
						className="secondary"
					/>
				</Fragment>
			);
		}
	};
	getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: this.props?.labelTextFormat
				? this.props.labelTextFormat(score)
				: `${score}%`;
	onTableFilterChange = tableFilter => {
		if (this.props.showSelectedKeywords) {
			const updatedPaginator = { ...this.state.selectedKeywordsPaginator, currenPage: tableFilter.pageNo }
			this.setState({ selectedKeywordsPaginator: updatedPaginator });
		} else {
			this.props.setTableFilterInConfig(tableFilter);
			const payload = this.getPayload(tableFilter, tableFilter.searchTerms);
			this.props.getKeywordsTableData(payload);
		}
	};
	onSeachKeywordsChange = searchKeywords => {
		if (this.props.showSelectedKeywords) {
			this.setState({ searchTerms: searchKeywords }, this.filterTableRows);
		} else {
			const tableFilter = {
				...defaultTableFilter,
				searchTerms: searchKeywords,
				typeSOSVolumeFilter: this.props.tableFilter.typeSOSVolumeFilter
			};
			const payload = this.getPayload(tableFilter, searchKeywords);
			this.props.setTableFilterInConfig(tableFilter);
			this.props.getKeywordsTableData(payload);
		}
	};
	filterTableRows = () => {
		const { selectedTableRows } = this.props;
		const { searchTerms } = this.state;
		if (searchTerms.length > 0) {
			const filteredTableRows = selectedTableRows.filter(item => searchTerms.some(term => item.keyword.toLowerCase().includes(term.toLowerCase())));
			const updatedPaginator = {
				currenPage: 1,
				totalPages: Math.ceil(filteredTableRows.length / 15),
				totalRecords: filteredTableRows.length
			}
			this.setState({ filteredTableRows, selectedKeywordsPaginator: updatedPaginator });

		} else {
			const updatedPaginator = {
				currenPage: 1,
				totalPages: Math.ceil(selectedTableRows.length / 15),
				totalRecords: selectedTableRows.length
			}
			this.setState({ filteredTableRows: [], selectedKeywordsPaginator: updatedPaginator });

		}
	}
	onApplyFilter = filter => {
		const { tableFilter } = this.props;
		const filterObj = {
			...defaultTableFilter,
			searchTerms: tableFilter.searchTerms,
			typeSOSVolumeFilter: filter
		};
		this.onTableFilterChange(filterObj);
	};

	getPayload = (tableFilter, searchTerms = []) => {
		return {
			tableFilter,
			searchTerms,
			keywords: ["All"]
		};
	};
	createUniqueKeyString = obj =>
		`${obj.keyword}-${obj.brand}`;

	getHeaderObject = (name, keyword, style, isSortable = true) => {
		return {
			name: name,
			key: keyword,
			isSortable: isSortable,
			style: style
		};
	};
	getBrandCompareTableHeader = data => {
		if (data === null || data === undefined) return;
		let header = [];
		const width = 100.0 / ((data[0]?.brandScores?.length || 0) + 2);
		header.push(
			this.getHeaderObject("Keyword", "keyword", { width: `${width}%` })
		);
		data[0]?.brandScores?.map((brand, i) => {
			header.push(
				this.getHeaderObject(
					brand.brand,
					`${brand.brand}-${i}`,
					{
						width: `${width}%`,
						backgroundColor: `${brand.compareKey === "client" ? "#F2F2F2" : ""}`
					},
					false
				)
			);
		});
		header.push(
			this.getHeaderObject("Search Volume", "searchVolume", {
				width: `${width}%`
			})
		);
		header.length > 0 && (header[0].isCheckboxRequired = !this.props.viewTrends);
		return header;
	};
	setStyle = (brand, width) => {
		let styles = {};
		if (brand.compareKey === "client")
			styles = Object.assign(styles, { backgroundColor: "#FAFAFA" });
		styles = Object.assign(styles, { width: `${width}%` });
		return styles;
	};
	getTableCellBrandCompare = (heading, row, width) => {
		const tabledata = row?.brandScores?.map((brand, i) => {
			return (
				<td
					style={this.setStyle(brand, width)}
					key={`${heading}-${brand.brand}`}
				>
					{heading === "Overall Score"
						? this.tableDataConstructor(brand.overallScore)
						: heading === "Organic"
							? this.tableDataConstructor(brand.organicScore)
							: heading === "Sponsered Products"
								? this.tableDataConstructor(brand.spScore)
								: heading === "Sponsered Brands"
									? this.tableDataConstructor(brand.sbScore)
									: null}
				</td>
			);
		});
		return tabledata;
	};
	getTableRowBrandCompare = row => {
		const headings = this.props.brandCompareHeader;
		const width = 100.0 / ((row?.brandScores?.length || 0) + 2);
		const tablerow = headings.map((heading, i) => {
			return (
				<tr key={heading}>
					<th style={{ width: `${width}%` }} colSpan={1}>{heading}</th>
					{this.getTableCellBrandCompare(heading, row, width)}
					{i === 0 ? (
						<td rowSpan={headings.length} style={{ width: `${width}%` }}>
							{this.searchVolumeScoreConstructor(row.searchVolume)}
						</td>
					) : null}
				</tr>
			);
		});
		return tablerow;
	};
	BrandCompareDataRowComponent = row => {
		return (
			<tr>
				<td className="table-cell" colSpan={row?.brandScores?.length + 2}>
					<table className="custom-keyword-table">
						<thead>
							<tr className="first-custom-row">
								<Td colSpan={row?.brandScores?.length + 1}
									isCheckboxRequired={!this.props.viewTrends}
									onCheckBoxSelect={row.onCheckBoxSelect}
									isCheckboxSelected={row.isCheckboxSelected}
									brandCompareView={this.props.isBrandCompare}>
									{row.keyword}
								</Td>
								<td>{row.keywordType}</td>
							</tr>
						</thead>
						<tbody>{this.getTableRowBrandCompare(row)}</tbody>
					</table>
				</td>
			</tr>
		);
	};
	setPaginator = (selectedRows) => {
		this.setState({
			selectedKeywordsPaginator: {
				currenPage: 1,
				totalPages: Math.ceil(selectedRows.length / 15),
				totalRecords: selectedRows.length
			}
		});
	}

	render() {
		const {
			keywordsTable,
			tableFilter,
			onRetryClick,
			isDateCompareSelected,
			isBrandCompare,
			selectedTableRows,
			onCheckboxClick,
			viewTrends,
			showSelectedKeywords,
			selectedTableRowsSelection,
			clearViewTrends,
			editSelection,
			title,
			enable,
			tableHeader
		} = this.props;
		const searchTerms = showSelectedKeywords ? this.state.searchTerms : tableFilter.searchTerms;
		const searchVolume = keywordsTable.data?.searchVolumes || [];
		const data = this.state.searchTerms.length > 0 ? this.state.filteredTableRows : selectedTableRows;
		const selectedKeywordSearchNoResults = this.state.searchTerms.length > 0 && !this.state.filteredTableRows.length;
		tableHeader.length > 0 && (tableHeader[0].isCheckboxRequired = !viewTrends);
		return (enable ?
			<div className={`keywords-table-wrapper section-header-main ${selectedTableRows.length > 0 && !viewTrends ? 'selected-view' : ''}`}>
				<Card>
					<div className="keywords-header-wrapper">
						<Label text={title} labelClass={"section-header-title"} />
						{viewTrends && <div className="keywords-clear" onClick={clearViewTrends}><Icon name={"remove"} size={16} />Clear</div>}
						{viewTrends && <div className="keywords-edit" onClick={editSelection}><Icon name={"edit"} size={16} />Edit</div>}

					</div>
					<div
						className={`${!isBrandCompare
							? "keywords-table-search-container"
							: "keywords-table-search-brand-compare"
							}`}
					>
						<div className="keywords-table-search">
							<Search
								placeholder={"Type to search here..."}
								getSearchedKeywordList={this.onSeachKeywordsChange}
								searchKeywordList={searchTerms || []}
								showSelectedKeywords={showSelectedKeywords}
							/>
						</div>
						{!showSelectedKeywords && <div
							className="keywords-table-filter"
							onClick={this.handleKeywordTableFilter}
						>
							{tableFilter?.typeSOSVolumeFilter ? (
								<Icon name={"funnelSelected"} size={16} />
							) : (
									<Icon name={"funnel"} size={16} />
								)}
							FILTER
						</div>}
						{!showSelectedKeywords && this.state.isFilterClicked && (
							<KeywordTableFilter
								searchVolumeScale={searchVolume}
								maxSearchVol={keywordsTable.data?.maxSearchVolume || 0}
								onFilterClose={this.onFilterClose}
								onApplyFilter={this.onApplyFilter}
								filterData={tableFilter?.typeSOSVolumeFilter}
							/>
						)}
					</div>
					<div
						className={`${!isBrandCompare
							? "keywords-table-container"
							: "keywords-table-container-brand-compare"
							}`}
					>
						{keywordsTable?.fetching ? (
							<LoadingTable />
						) : keywordsTable?.error ? (
							<DataLoadError handleRetry={onRetryClick} />
						) : keywordsTable?.data?.shareOfShelfList === null || (showSelectedKeywords && selectedKeywordSearchNoResults) ? (
							<NoResultsMessage />
						) : (
										<Table
											header={
												!isBrandCompare
													? tableHeader
													: this.getBrandCompareTableHeader(
														keywordsTable?.data?.shareOfShelfList
													)
											}
											data={showSelectedKeywords ? data : keywordsTable?.data?.shareOfShelfList}
											paginator={showSelectedKeywords ? this.state.selectedKeywordsPaginator : keywordsTable?.data?.paginator}
											tableFilter={tableFilter}
											createCompareString={this.createUniqueKeyString}
											DataRowComponent={
												!isBrandCompare
													? this.DataRowComponent
													: this.BrandCompareDataRowComponent
											}
											onTableFilterChange={this.onTableFilterChange}
											createUniqueKeyString={this.createUniqueKeyString}
											selectedTableRows={showSelectedKeywords ? selectedTableRowsSelection : selectedTableRows}
											onCheckboxClick={onCheckboxClick}
											showSelectedKeywords={showSelectedKeywords}
											isInternalSorting={showSelectedKeywords}
											brandCompareView={isBrandCompare}
										/>
									)}
					</div>
				</Card >
			</div> : null
		);
	}
}
export default KeywordTable;
