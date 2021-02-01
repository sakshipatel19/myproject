import React from "react";
import { isNullOrUndefined } from "../../../../utils/number";
import DifferenceIndicator from "../../../common/DifferenceIndicator";
import Table from "../../../common/Table";
import { DATE_COMPARE_COLORS } from "../../../../constants/colors";
import "./Attributes.scss";
import Icon from "../../../common/Icon";

const Attributes = props => {
	const {
		isDateCompare,
		compareBrands,
		attributesScore,
		labelTextFormat
	} = props;

	let data = attributesScore?.brandWiseDataList;
	const compareListArray = compareBrands?.filter(e => e.isSelected);
	const compareList = compareListArray.map(e => `${e.type}-${e.name}`);

	//filtering brand list on checkbox value change
	if (compareListArray?.length !== compareBrands?.length) {
		data = data?.filter(
			e => compareList.indexOf(`${e.compareKey}-${e.brandName}`) >= 0
		);
	}

	/// updating colors for data by mapping selected brands
	data = data?.map(e => ({
		...e,
		color: compareListArray?.find(
			ele => ele.type === e.compareKey && ele.name === e.brandName
		)?.color
	}));

	//creating dynamic header
	const createHeader = () => {
		let header = [
			{
				name: "",
				key: "attributeName",
				style: { width: "25%" }
			}
		];
		const dynamicList = compareListArray.map(e => ({
			name: e.name,
			key: `${e.name}-${e.type}`,
			className: e.type === "client" ? "client-brand-name" : ""
		}));

		return [...header, ...dynamicList];
	};

	const createRowComponent = row => {
		return (
			<tr className={"attribute-brand-row"}>
				<td className={"attribute-name"}>
					{row.label}
					<Icon
						name={row.isActionable ? "actionable" : "nonActionable"}
						size={12}
						iconClass={"actionable-icon"}
					/>
				</td>
				{row?.data.map(e => (
					<td
						key={`${e.compareKey}-${e.brandName}`}
						className={`attribute-score-data 
						${e.compareKey === "client" ? "client-brand-name" : ""}
						`}
					>
						{bindScoreData(e)}
					</td>
				))}
			</tr>
		);
	};

	const bindScoreData = obj => {
		return (
			<div className={"brand-score-details"}>
				<span className={"attribute-compare-score initial-score"}>
					<div className={"initial"}>{getScore(obj.score)}</div>
				</span>
				{createVerticalBar(obj.color, obj.score)}
				{isDateCompare &&
					createVerticalBar(DATE_COMPARE_COLORS[1], obj.compareScore)}
				<span className={"attribute-compare-score date-compare-score"}>
					{isDateCompare && (
						<div className={"date-compare"}>
							<DifferenceIndicator
								difference={obj.difference}
								className={"date-compare-difference"}
							/>
							{getScore(obj.compareScore)}
						</div>
					)}
				</span>
			</div>
		);
	};

	// vertical bar chart
	const createVerticalBar = (color, value) => {
		return (
			<div className={"vertical-bar-container"}>
				<div
					className={"vertical-progress-bar"}
					style={{ backgroundColor: color, height: `${value ? value : 0}%` }}
				/>
			</div>
		);
	};

	const getScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: labelTextFormat
			? labelTextFormat(score)
			: `${score}%`;

	// creating Data format to render in table
	const createDataForTable = () => {
		const tableData = data[0]?.attributes?.map((e, i) => {
			return {
				label: e.label,
				isActionable: e.isActionable,
				data: data?.map(ele => ({
					brandName: ele.brandName,
					compareKey: ele.compareKey,
					color: ele.color,
					...ele.attributes[i]
				}))
			};
		});
		return tableData;
	};

	return (
		<div className={"attribute-brand-compare-view"}>
			<Table
				header={createHeader()}
				data={data && createDataForTable()}
				DataRowComponent={createRowComponent}
				createUniqueKeyString={row => row.label}
				tableFilter={{}}
			/>
		</div>
	);
};

export default Attributes;
