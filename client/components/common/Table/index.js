import React, { Component, Fragment } from "react";
import Th from "./Th";
import Td from "./Td";
import "./table.scss";
import Pagination from "../Pagination/Pagination";
import { applySort } from "../../../utils/array";
export const SORT_ORDER = {
	ascendingOrder: "ASC",
	descendingOrder: "DESC"
};

class Table extends Component {
	state = {
		sortBy: this.props.tableFilter?.sortBy,
		sortType: this.props.tableFilter?.sortType
	};

	onCheckboxAllSelect = (evt, status) => {
		const {
			data,
			selectedTableRows = [],
			createUniqueKeyString,
			onCheckboxClick
		} = this.props;
		evt && evt.stopPropagation();
		let selectRows = [];
		let keyArray = data.map(e => createUniqueKeyString(e));

		selectRows = selectedTableRows?.filter(
			e => keyArray.indexOf(createUniqueKeyString(e)) < 0
		);

		if (status) selectRows = [...data, ...selectRows];

		onCheckboxClick(selectRows);
	};

	onCheckBoxSelect = (status, obj) => {
		const {
			selectedTableRows = [],
			createUniqueKeyString,
			onCheckboxClick
		} = this.props;
		let data = selectedTableRows;
		if (status) data = [...selectedTableRows, obj];
		else
			data = selectedTableRows.filter(
				e => createUniqueKeyString(e) !== createUniqueKeyString(obj)
			);
		onCheckboxClick(data);
	};

	bindHeaderRowData = (arrObj, tableFilter, index = 1) => {
		let { sortBy, sortType } = tableFilter;
		return (
			<tr key={`table_row_${index}`}>
				{arrObj.map((e, i) => {
					let isTableAllSelected = false,
						isTableSomeSelected = false;
					if (e.isCheckboxRequired) {
						let { data, selectedTableRows, createCompareString } = this.props;
						const selectedKeywords = selectedTableRows?.map(e =>
							createCompareString(e)
						);

						if (selectedKeywords?.length > 0)
							isTableAllSelected = data?.every(
								e => selectedKeywords?.indexOf(createCompareString(e)) > -1
							);
						if (!isTableAllSelected)
							isTableSomeSelected = data?.some(
								e => selectedKeywords?.indexOf(createCompareString(e)) > -1
							);

					}
					return (
						<Th
							{...e}
							isSortBySelected={sortBy === e.key}
							sortOrder={sortType}
							onSortOrderChange={() => this.onSortChange(e.key)}
							isCheckboxSelected={isTableSomeSelected ? 'partial' : isTableAllSelected}
							onCheckBoxSelect={this.onCheckboxAllSelect}
							brandCompareView={this.props.brandCompareView}
						>
							{e.name}
						</Th>
					);
				})}
			</tr>
		);
	};

	bindTableBody = obj => {
		const { header, createCompareString } = this.props;
		let isCheckboxSelected = false;
		isCheckboxSelected = this.isCheckboxSelected(obj);
		return (
			<tr
				key={createCompareString(obj)}
				className={isCheckboxSelected ? "selected-row" : ""}
			>
				{header.map(e => {
					return (
						<Td
							key={e.key}
							{...e}
							brandCompareView={this.props.brandCompareView}
							isCheckboxSelected={isCheckboxSelected}
							onCheckBoxSelect={status => this.onCheckBoxSelect(status, obj)}
						>
							{obj[e.key]}
						</Td>
					);
				})}
			</tr>
		);
	};

	isCheckboxSelected = obj => {
		let isCheckboxSelected = false;
		const { selectedTableRows, createCompareString } = this.props;
		if ((createCompareString, selectedTableRows?.length > 0)) {
			const compareRowValue = createCompareString(obj);
			isCheckboxSelected = selectedTableRows?.some(
				e => createCompareString(e) === compareRowValue
			);
		}
		return isCheckboxSelected;
	};

	onSortChange = sortBy => {
		let currentSort = this.props.tableFilter.sortBy;
		let currentsortOrder = this.props.tableFilter.sortType;

		if (this.props.isInternalSorting) {
			currentSort = this.state.sortBy;
			currentsortOrder = this.state.sortType;
		}

		let sortType = SORT_ORDER.ascendingOrder;
		if (currentSort === sortBy)
			sortType =
				currentsortOrder === SORT_ORDER.ascendingOrder
					? SORT_ORDER.descendingOrder
					: SORT_ORDER.ascendingOrder;

		if (this.props.isInternalSorting)
			this.setState({ sortBy, sortType });

		this.props.onTableFilterChange && this.props.onTableFilterChange({
			...this.props.tableFilter,
			sortBy,
			sortType,
			pageNo: 1
		});
	};

	onPageNoChange = pageNo => {
		const tableFilter = { ...this.props.tableFilter, pageNo };
		this.props.onTableFilterChange(tableFilter);
	};
	getSelectedTableData = (selectedTableRows) => {
		const { totalPages, currenPage } = this.props.paginator;
		const start = (currenPage - 1) * 15;
		const end = (start + 15);
		return selectedTableRows.slice(start, end);
	}
	getTableHeader = (header) => {
		const tableHeader = [];
		let subHeader = [];
		tableHeader.push(header);
		header.forEach((column) => {
			if (column.subHeader && column.subHeader.length > 0) {
				column.subHeader.forEach((subCol) => subHeader.push(subCol));
			}
		});
		subHeader && subHeader.length > 0 && tableHeader.push(subHeader);
		return tableHeader;
	}
	render() {
		const {
			header,
			DataRowComponent,
			isInternalSorting,
			ispaginationNotRequired,
			createUniqueKeyString,
			paginator,
			showSelectedKeywords
		} = this.props;

		let { tableFilter, data } = this.props;

		let tableHeader = this.getTableHeader(header);
		let HeaderData = null;

		if (isInternalSorting) {
			data = applySort(
				data,
				this.state.sortBy,
				this.state.sortType,
				SORT_ORDER
			);
			tableFilter = {
				...tableFilter,
				sortBy: this.state.sortBy,
				sortType: this.state.sortType
			};
		}

		if (tableHeader)
			if (Array.isArray(tableHeader[0]))
				HeaderData = tableHeader.map((e, index) =>
					this.bindHeaderRowData(e, tableFilter, index)
				);
			else HeaderData = this.bindHeaderRowData(tableHeader, tableFilter);

		let tableBody = null;
		if (data) {
			const selectedTableData = showSelectedKeywords ? this.getSelectedTableData(data) : data;
			tableBody = selectedTableData.map((e, index) =>
				DataRowComponent ? (
					<DataRowComponent
						{...e}
						key={createUniqueKeyString(e)}
						onCheckBoxSelect={status => this.onCheckBoxSelect(status, e)}
						isCheckboxSelected={this.isCheckboxSelected(e)}
					/>
				) : (
						this.bindTableBody(e)
					)
			);
		}
		return (
			<Fragment>
				<table className={"common-table-container"}>
					<thead>{HeaderData}</thead>
					<tbody>{tableBody}</tbody>
				</table>
				{paginator?.totalPages > 1 && !ispaginationNotRequired && (
					<Pagination
						currentPage={showSelectedKeywords ? paginator?.currenPage : tableFilter.pageNo}
						totalPages={paginator?.totalPages}
						getCurrentPageNo={this.onPageNoChange}
					/>
				)}
			</Fragment>
		);
	}
}

export default Table;
