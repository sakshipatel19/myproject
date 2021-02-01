import React, { Component, Fragment } from "react";
import "./BrandTable.scss";
import Card from "../../common/Card";
import Table from "../../common/Table";
import LoadingIndicator from "../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import LinearProgressBar from "../../common/LinearProgressBar";
import DotWithLabel from "../../common/DotWithLabel";

const tableFilter = {
	sortBy: "brandName",
	sortType: "ASC",
	pageNo: 1,
	pageSize: 15
};

class BrandTable extends Component {
	getProgressbarComponent = (initialScore, compareScore) => {
		return (
			<div className="progressbar-container-with-dots">
				<div className="progressbar-container">
					<LinearProgressBar
						rounded
						animate
						percent={initialScore / 100}
						width={195}
						height={5}
						backgroundColor="#f3f5f8"
						fillColor="#4CA0FA"
					/>
					{compareScore !== null && (
						<div className="compare-linear-progressbar">
							<LinearProgressBar
								rounded
								animate
								percent={compareScore / 100}
								width={195}
								height={5}
								backgroundColor="#f3f5f8"
								fillColor="#F79764"
							/>
						</div>
					)}
				</div>
				{this.getLabelWithDotsContainer(initialScore, compareScore)}
			</div>
		);
	};
	getLabelWithDotsContainer = (initialScore, compareScore) => {
		return (
			<div
				className={`dots-container ${this.props.compareSelected ? "compare" : ""
					}`}
			>
				{this.props.compareSelected ? (
					<Fragment>
						<DotWithLabel
							size={5}
							color="#4CA0FA"
							text={initialScore === null ? "NA" : `${initialScore}%`}
						/>
						<DotWithLabel
							size={5}
							color="#F79764"
							text={compareScore === null ? "NA" : `${compareScore}%`}
						/>
					</Fragment>
				) : (
						<div className="dot-text">
							{initialScore === null ? "NA" : `${initialScore}%`}
						</div>
					)}
			</div>
		);
	};
	DataRowComponent = row => {
		const { tableHeader } = this.props;

		return (
			<tr className="aligncenter">
				{tableHeader.map((col, i) => {
					switch (col.key) {
						case "brandName":
							return (<td className={"table-cell-brandName"} key={i}>{row.brandName}</td>)
							break;
						case "averageDiscount":
							return (<td className={"table-cell-averageDiscount"} key={i}>
								{this.getLabelWithDotsContainer(
									row.averageDiscount.initial,
									row.averageDiscount.compare
								)}
							</td>)
							break;
						default:
							return (<td className={"table-cell"} key={i}>
								{this.getProgressbarComponent(
									row[col.key].initial,
									row[col.key].compare
								)}
							</td>)
							break;

					}

				})
				}
			</tr>
		);
	};

	createUniqueKeyString = obj => `${obj.brandName}`;

	disableSortingInHeader = (headers) => {
		headers.map(header => {
			header.isSortable = false;
		});
		return headers;
	};
	render() {
		const { data, onRetryClick, enable, tableHeader } = this.props;
		const brandsPriceAndPromotionScoreList =
			data?.data?.brandsPriceAndPromotionScoreList || [];
		const header =
			brandsPriceAndPromotionScoreList?.length <= 5
				? this.disableSortingInHeader(tableHeader)
				: tableHeader;
		return (enable ?
			<div className="brandtable-container section-header-main">
				<Card>
					<div className={"card-header"}>
						<div className="card-title section-header-title">{"Brands"}</div>
					</div>
					{data.fetching ? (
						<LoadingIndicator className="brandtable-loading-indicator" />
					) : data.error ? (
						<DataLoadError handleRetry={onRetryClick} />
					) : (
								<div className="brandtable-detailpage-container">
									<Table
										header={header}
										data={brandsPriceAndPromotionScoreList}
										tableFilter={tableFilter}
										DataRowComponent={this.DataRowComponent}
										createUniqueKeyString={this.createUniqueKeyString}
										isInternalSorting
									/>
								</div>
							)}
				</Card>
			</div> : null
		);
	}
}

export default BrandTable;
