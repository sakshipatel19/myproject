import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDiscBySearchBestSellerKeywordDetail } from "./by-search-actions";
import BestSellerKeywordDetail from "../BestSeller/BestSellerKeywordDetailPage";
import { setSelectedPageInConfig } from "../../global-actions";
import { BY_SEARCH } from "../../../constants/PageHeaders";


class BySearchBestSellerKeywordTable extends Component {
	getBestSellerKeywordDetail = obj => {
		const payload = {
			...this.props,
			...obj
		};
		this.props.fetchDiscBySearchBestSellerKeywordDetail(payload);
	};

	getRowScore = score => {
		return score === null ? "NA" : score + "%";
	};
	DataRowComponent = row => {
		const { bestsellerDetails } = this.props?.pageConfig[BY_SEARCH];
		const tableHeader = bestsellerDetails?.tableHeader;
		return (
			<tr className="aligncenter">
				{	tableHeader?.map((col, i, arr) => {
					const cellValue = col.isNumber ? this.getRowScore(row[col.key]?.initial) : row[col.key];
					const className = [];
					i === 0 && className.push("first-column");
					i === arr.length - 1 && className.push("last-column");
					(col.isNumber || col.key === 'searchVolume') && className.push("number-text");

					return (
						<td className={className.join(' ')} key={i}>
							{cellValue}
						</td>
					);
				})
				}
			</tr>
		);
	};
	render() {
		const {
			bestSellerDetail,
			setSelectedPageInConfig,
			selectedCategory,
			categoryNames,
			pageConfig
		} = this.props;
		return (
			<>
				<BestSellerKeywordDetail
					data={bestSellerDetail}
					getBestSellerKeywordDetail={this.getBestSellerKeywordDetail}
					DataRowComponent={this.DataRowComponent}
					setSelectedPageInConfig={setSelectedPageInConfig}
					selectedCategory={selectedCategory}
					categoryNames={categoryNames}
					{...pageConfig[BY_SEARCH]?.bestsellerDetails}
				/>
			</>
		);
	}
}

const mapStateToProps = store => {
	return {
		...store.global.config,
		...store.bySearch,
		selectedCategory: store.global.bestSellerSelectedCategory,
		categoryNames: store.global.bestSellersCategories
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchDiscBySearchBestSellerKeywordDetail,
			setSelectedPageInConfig
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BySearchBestSellerKeywordTable);
