import React, { Component, Fragment } from "react";
import "./BrandTable.scss";
import LinearProgressBar from "../../common/LinearProgressBar";
import DotWithLabel from "../../common/DotWithLabel";
import Icon from "../../common/Icon";
import { applySort } from "../../../utils/array";
import Card from "../../common/Card";
import { isNullOrUndefined, numberFormat, styles } from "../../../utils/number";
import LoadingTable from "../../common/LoadingSkeleton/LoadingTable";
import DataLoadError from "../common/DataLoadError/DataLoadError";

const SORT_ORDER = {
	ascendingOrder: "ASC",
	descendingOrder: "DESC"
};

class BrandTableDetailPage extends Component {
	state = {
		showBestSellerBrandDetailPage: true,
		sortType: "ASC",
		sortBy: "label"
	};

	createTableHeaderObject = () => {
		return [
			{
				name: "Name",
				key: "brandName",
				sortable: true
			},
			{
				name: "",
				key: "",
				sortable: false
			},
			{
				name: "Rank",
				key: "salesScore",
				isNumber: true,
				sortable: true
			},
			{
				name: "Category Size",
				key: "categorySize",
				isNumber: true,
				sortable: true
			}
		];
	};

	bindHeaderRowData = (arrObj, dataLength) => {
		const headersList = arrObj.map((e, i) => {
			return (
				<div
					className={`${`brand-type-col-${e.key == "categorySize" ? 4 : i + 1
						}`} ${this.state.sortBy === e.key && dataLength > 5 ? "sortSelected" : ""
						} ${e.isNumber ? "number-text" : ""} ${dataLength <= 5 ? "disableSort" : ""
						} ${this.props.compareSelected ? "compare" : ""}`}
					onClick={() => this.onSortChange(e.key)}
					key={`${e.key}`}
				>
					{e.name}
					{e.sortable && <span className="sort-icon">
						<Icon
							iconClass={`${this.state.sortBy === e.key &&
								dataLength > 5 &&
								"visible"}`}
							name={this.state.sortType === "ASC" ? "sortUp" : "sortDown"}
							size={8}
						/>
					</span>}
				</div>
			);
		});

		return <div className="brand-type-row-header">{headersList}</div>;
	};

	onSortChange = sortBy => {
		let currentsortOrder = this.state.sortType;
		let sortType = SORT_ORDER.ascendingOrder;
		let currentSort = this.state.sortBy;
		if (currentSort === sortBy)
			sortType =
				currentsortOrder === SORT_ORDER.ascendingOrder
					? SORT_ORDER.descendingOrder
					: SORT_ORDER.ascendingOrder;
		this.setState({ sortType, sortBy });
	};

	createBrandTableBody = data => {
		const brandTableList = data?.brandsSalesScoreAndRevenueList || [];
		const { isBrandCompare, compareBrands } = this.props;
		const progressBarWidth = this.viewportWidth <= 1375 ? 400 : 500;
		const brandList = brandTableList.map((item, i) => {
			const { brandName, salesScore, categorySize } = item;
			return (
				<div className="brand-type-row" key={`${brandName}_${i}`}>
					<div className={`brand-type-col-1`}>{brandName}</div>

					{isBrandCompare && item?.salesScore?.compare !== null ? (
						<div
							className={`brand-type-col-3 ${this.props.compareSelected ? "compare-linear-progressbar" : ""
								}`}
						>
							<LinearProgressBar
								rounded
								animate
								percent={item?.salesScore?.compare / 100}
								width={progressBarWidth}
								height={5}
								backgroundColor="#f3f5f8"
								fillColor={isBrandCompare ? compareBrands[i]?.color : "#4CA0FA"}
							/>
						</div>
					) : salesScore?.compare !== null ? (
						<div className="brand-type-col-3 compare-linear-progressbar">
							<LinearProgressBar
								rounded
								animate
								percent={salesScore?.initial / 100}
								width={progressBarWidth}
								height={5}
								backgroundColor="#f3f5f8"
								fillColor="#4CA0FA"
							/>

							<LinearProgressBar
								rounded
								animate
								percent={salesScore?.compare / 100}
								width={progressBarWidth}
								height={5}
								backgroundColor="#f3f5f8"
								fillColor="#F79764"
							/>
						</div>
					) : (
								<div
									className={`brand-type-col-3 ${this.props.compareSelected ? "compare-linear-progressbar" : ""
										}`}
								>
									<LinearProgressBar
										rounded
										animate
										percent={salesScore?.initial / 100}
										width={progressBarWidth}
										height={5}
										backgroundColor="#f3f5f8"
										fillColor={isBrandCompare ? compareBrands[i]?.color : "#4CA0FA"}
									/>
								</div>
							)}
					<div
						className={`brand-type-col-2 ${this.props.compareSelected ? "compare-selected" : ""
							}`}
					>
						{this.props.compareSelected ? (
							<div className="dots-container">
								<Fragment>
									<DotWithLabel
										color="#4CA0FA"
										text={
											isNullOrUndefined(salesScore?.initial)
												? "NA"
												: `${salesScore?.initial}%`
										}
										className="normal"
									/>
									<DotWithLabel
										color="#F79764"
										text={
											isNullOrUndefined(salesScore?.compare)
												? "NA"
												: `${salesScore?.compare}%`
										}
										className="compare"

									/>
								</Fragment>
							</div>
						) : (
								<div>
									{isNullOrUndefined(salesScore?.initial)
										? "NA"
										: `${salesScore?.initial}%`}
								</div>
							)}
					</div>
					<div
						className={`brand-type-col-4 ${this.props.compareSelected ? "compare-selected" : ""
							}`}
					>
						{this.props.compareSelected ? (
							<div className="dots-container">
								<Fragment>
									<DotWithLabel
										color="#4CA0FA"
										text={
											isNullOrUndefined(categorySize?.initial)
												? "NA"
												: this.categorySizeFormat(categorySize?.initial)
										}
										className="normal"
									/>
									<DotWithLabel
										color="#F79764"
										text={
											isNullOrUndefined(categorySize?.compare)
												? "NA"
												: this.categorySizeFormat(categorySize?.compare)
										}
										className="compare"
									/>
								</Fragment>
							</div>
						) : (
								<div>
									{isNullOrUndefined(categorySize?.initial)
										? "NA"
										: this.categorySizeFormat(categorySize?.initial)}
								</div>
							)}
					</div>
				</div>
			);
		});
		return <div className="brand-type-row-content">{brandList}</div>;
	};
	categorySizeFormat = score => {
		return numberFormat(score, this.props.countryCode, styles.decimal);
	};
	render() {
		const { brandsScore, enable } = this.props;
		let data = brandsScore.data || [];
		let brandScoreInitial = data?.brandsSalesScoreAndRevenueList || [];
		this.viewportWidth = window.innerWidth;
		applySort(
			brandScoreInitial,
			this.state.sortBy,
			this.state.sortType,
			SORT_ORDER
		);
		return (enable ?
			<Card className="brand-type-container">
				<div className={"card-header"}>
					<div className="card-title section-header-title">{"Brands"}</div>
				</div>
				<div className="brand-type-detailpage-container-sales">
					{brandsScore?.fetching ? (
						<LoadingTable />
					) : brandsScore?.error ? (
						<DataLoadError />
					) : (
								<div className="detail-page">
									<div className="detailpage-container">
										{this.state.showBestSellerBrandDetailPage && (
											<div className="detailpage-table-body-sales">
												{this.bindHeaderRowData(
													this.createTableHeaderObject(),
													brandScoreInitial?.length
												)}
												{this.createBrandTableBody(data)}
											</div>
										)}
									</div>
								</div>
							)}
				</div>
			</Card> : null
		);
	}
}

export default BrandTableDetailPage;
