import React, { Component, Fragment } from "react";
import "./BrandTable.scss";
import LinearProgressBar from "../../common/LinearProgressBar";
import DotWithLabel from "../../common/DotWithLabel";
import Icon from "../../common/Icon";
import { applySort } from "../../../utils/array";

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
				key: "label"
			},
			{
				name: "Score",
				key: "score",
				isNumber: true
			}
		];
	};

	bindHeaderRowData = (arrObj, dataLength) => {
		const headersList = arrObj.map((e, i) => {
			return (
				<div
					className={`${`brand-type-col-${i + 1}`} ${this.state.sortBy === e.key && dataLength > 5 ? "sortSelected" : ""
						} ${e.isNumber ? "number-text" : ""} ${dataLength <= 5 ? "disableSort" : ""
						}`}
					onClick={() => this.onSortChange(e.key)}
					key={`${e.key}`}
				>
					{e.name}
					<span className="sort-icon">
						<Icon
							iconClass={`${this.state.sortBy === e.key &&
								dataLength > 5 &&
								"visible"}`}
							name={this.state.sortType === "ASC" ? "sortUp" : "sortDown"}
							size={8}
						/>
					</span>
				</div>
			);
		});

		return <div className="brand-type-row header">{headersList}</div>;
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
		const brandTableList = data?.brandScoreInitial || [];
		const brandList = brandTableList.map((item, i) => {
			return (
				<div className="brand-type-row" key={`${item?.label}_${i}`}>
					<div className={`brand-type-col-1`}>{item.label}</div>
					{item.compareScore !== null ? (
						<div className="brand-type-col-3 compare-linear-progressbar">
							<LinearProgressBar
								rounded
								animate
								percent={item.score / 100}
								width={674}
								height={5}
								backgroundColor="#f3f5f8"
								fillColor={"#4CA0FA"}
							/>
							<LinearProgressBar
								rounded
								animate
								percent={item.compareScore / 100}
								width={674}
								height={4.8}
								backgroundColor="#f3f5f8"
								fillColor="#F79764"
							/>
						</div>
					) : (
							<div className="brand-type-col-3">
								<LinearProgressBar
									rounded
									animate
									percent={item.score / 100}
									width={674}
									height={5}
									backgroundColor="#f3f5f8"
									fillColor={"#4CA0FA"}
								/>
							</div>
						)}
					<div className={`brand-type-col-2`}>
						{this.props.compareSelected ? (
							<div className="dots-container">
								<Fragment>
									<DotWithLabel
										color="#4CA0FA"
										text={item?.score === null ? "NA" : `${item?.score}%`}
									/>
									<DotWithLabel
										color="#F79764"
										text={
											item?.compareScore === null
												? "NA"
												: `${item?.compareScore}%`
										}
									/>
								</Fragment>
							</div>
						) : (
								<div>
									{item?.score === null || item?.score === undefined
										? "NA"
										: `${item?.score}%`}
								</div>
							)}
					</div>
				</div>
			);
		});
		return <div className="brand-type-row-content">{brandList}</div>;
	};

	render() {
		let data = this.props.data || [];
		let brandScoreInitial = data?.brandScoreInitial || [];
		applySort(
			brandScoreInitial,
			this.state.sortBy,
			this.state.sortType,
			SORT_ORDER
		);
		return (
			<div className="detailpage-container">
				{this.state.showBestSellerBrandDetailPage && (
					<div className="detailpage-table-body">
						{this.bindHeaderRowData(
							this.createTableHeaderObject(),
							brandScoreInitial?.length
						)}
						{this.createBrandTableBody(data)}
					</div>
				)}
			</div>
		);
	}
}

export default BrandTableDetailPage;
