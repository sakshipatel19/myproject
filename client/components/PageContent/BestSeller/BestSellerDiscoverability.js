import React from "react";
import { isNullOrUndefined } from "../../../utils/number";
import BestSeller from "./BestSeller";

const BestSellerDisc = props => {
	const tableFilter = {
		sortBy: "overallScore",
		sortType: "DESC",
		pageNo: 1,
		pageSize: 15
	};

	const DataRowComponent = row => {
		return (
			<tr>
				{/* <td>{`#${row.rank}`}</td> */}
				<td>{row.brand}</td>
				<td className={"number-text"}>{getScore(row.overallScore)}</td>
				<td className={"number-text"}>{getScore(row.organicScore)}</td>
				<td className={"number-text"}>{getScore(row.paidScore)}</td>
				<td></td>
			</tr>
		);
	};

	const getScore = score => {
		return isNullOrUndefined(score) ? "NA" : `${score}%`;
	};

	const createUniqueKeyString = row => `${row.rank}_${row.brand}`;


	return (props.enable ?
		<div className="bestseller-by-search">
			<BestSeller
				{...props}
				showDetailPageLink
				DataRowComponent={DataRowComponent}
				createUniqueKeyString={createUniqueKeyString}
				tableFilter={tableFilter}
			/>
		</div> : null
	);
};

export default BestSellerDisc;
