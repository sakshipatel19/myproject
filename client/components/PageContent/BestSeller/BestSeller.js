import React, { Component, Fragment } from "react";
import "./BestSeller.scss";
import DropDown from "./../../common/Dropdown/DropdownWithState";
import Card from "../../common/Card";
import Table from "../../common/Table";
import Tab from "../../common/Tab";
import LoadingIndicator from "../../common/LoadingSkeleton/LoadingSquare";
import DataLoadError from "../common/DataLoadError/DataLoadError";
import { withRouter } from "react-router";
import VerticalSeparator from "../../common/VerticalSeparator";
import { Link } from "react-router-dom";
import Icon from "../../common/Icon";
import { isNullOrUndefined } from "../../../utils/number";
import LoadingTable from "../../common/LoadingSkeleton/LoadingTable";

const defaultTableFilter = {
	sortBy: "rankNum",
	sortType: "ASC",
	pageNo: 1,
	pageSize: 15
};

class BestSeller extends Component {
	state = {
		tab: "",
		categoryNames: []
	};

	componentDidMount() {
		const tab = this.props.tabData || [];
		if (tab.length != 0) this.setState({ tab: tab[0].key });
	}
	static getDerivedStateFromProps(newProps, prevState) {
		if (
			newProps?.data?.data?.categoryNames !==
			prevState?.data?.data?.categoryNames &&
			newProps?.data?.data?.categoryNames?.length > 0
		)
			return { categoryNames: newProps?.data?.data?.categoryNames };
		return null;
	}
	getTableHeader = () => {
		return [
			{
				name: "Rank",
				key: "rankNum",
				isSortable: true,
				isNumber: false,
				style: { width: "8%" }
			},
			{
				name: "Brand",
				key: "brandName",
				isSortable: true,
				style: { width: "19%" }
			},
			{
				name: "Product Name",
				key: "productName",
				isSortable: false,
				iconName: "externalPage",
				style: { width: "41%" }
			},
			{
				name: "ASIN",
				key: "productId",
				isSortable: false,
				style: { width: "15%" }
			},
			{
				name: "Score",
				key: "score",
				isSortable: true,
				style: { width: "17%" }
			}
		];
	};
	DataRowComponent = row => {
		return (
			<tr>
				<td className={"table-cell-rank"}>{`#${row.rankNum}`}</td>
				<td className={"table-cell-brandName"}>{row.brandName}</td>
				<td
					className={"table-cell-productName"}
					onClick={() => window.open(`http://${row?.productUrl}`, "_blank")}
				>
					{row.productName}
				</td>
				<td className={"table-cell-productId"}>{row.productId}</td>
				<td className={"table-cell-score"}>{this.getScore(row.score)}</td>
			</tr>
		);
	};

	getScore = score => {
		return isNullOrUndefined(score) ? "NA" : `${score}%`;
	};

	onTabChange = tab => {
		this.setState({ tab });
		this.props.getBestSellersListOnTabChange(
			this.props.data?.data?.selectedCategory,
			tab
		);
	};

	handleCategorySelection = selectedCategory => {
		this.props.getBestSellersList(selectedCategory, this.state.tab);
	};

	createUniqueKeyString = obj => `${obj.productId}__${obj.rank}`;

	onClickBestSellerTable = () => {
		this.props.onClickBestSellerTable(
			this.props.data?.data?.selectedCategory,
			this.state.categoryNames
		);
	};
	render() {
		const {
			onRetryClick,
			showDetailPageLink,
			tableHeader,
			DataRowComponent,
			createUniqueKeyString,
			tableFilter,
			enable
		} = this.props;
		const { data } = this.props?.data || {};
		let bestSellerBrandDataList = data?.bestSellerBrandDataList || [];

		const tabData = this.props.tabData || [];
		const bestseller = this.props?.data || {};
		return (enable ?
			<div className="bestseller-container section-header-main">
				<Card>
					<div
						className={`${"card-header"} ${tabData.length != 0 ? "tabPresent" : ""
							}`}
					>
						<div className="card-title section-header-title">
							{"Top Sellers"}
						</div>
						<div className="bestseller-tab-container">
							{tabData.length != 0 && (
								<div className="bestseller-tab">
									<Tab
										data={tabData}
										selectedTab={this.state.tab}
										onTabChange={this.onTabChange}
									/>
								</div>
							)}
							<div className={"bestseller-dropdown-container"}>
								<DropDown
									options={data?.categoryNames?.map(value => ({
										value,
										label: value
									}))}
									onSelect={this.handleCategorySelection}
									selectedOption={data?.selectedCategory}
								/>
								{showDetailPageLink && (
									<Fragment>
										<VerticalSeparator
											className={"best-seller-details-separator"}
										/>
										<Link
											to={`${this.props.location.pathname}/bestseller-details`}
											className={"best-seller-details-link"}
											onClick={this.onClickBestSellerTable}
										>
											TOP SELLER KEYWORDS
											<Icon
												name={"sortRight"}
												size={12}
												iconClass={"best-sller-detail-icon"}
											/>
											<Icon
												name={"sortRightBlue"}
												size={12}
												iconClass={"best-sller-detail-icon-hover"}
											/>
										</Link>
									</Fragment>
								)}
							</div>
						</div>
					</div>
					{bestseller.fetching ? (
						<LoadingTable className="bestseller-loading-indicator" />
					) : bestseller.error ? (
						<DataLoadError handleRetry={onRetryClick} />
					) : (
								<div className="bestseller-detailpage-container">
									<Table
										header={tableHeader || this.getTableHeader()}
										data={bestSellerBrandDataList}
										tableFilter={tableFilter || defaultTableFilter}
										DataRowComponent={DataRowComponent || this.DataRowComponent}
										createUniqueKeyString={
											createUniqueKeyString || this.createUniqueKeyString
										}
										isInternalSorting
									/>
								</div>
							)}
				</Card>
			</div> : null
		);
	}
}

export default withRouter(BestSeller);
