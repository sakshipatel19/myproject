import React, { Fragment } from "react";
import { isNullOrUndefined } from "../../../utils/number";
import DifferenceIndicator from "../../common/DifferenceIndicator";
import Table from "../../common/Table";
import { DATE_COMPARE_COLORS } from "../../../constants/colors";
import "./Summary.scss";

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
			e => compareList.indexOf(`${e.compareKey}-${e.heading}`) >= 0
		);
	}

	/// updating colors for data by mapping selected brands
	data = data?.map(e => ({
		...e,
		color: compareListArray?.find(
			ele => ele.type === e.compareKey && ele.name === e.heading
		)?.color
	}));

	/// ordering Data based on Header
	data = compareListArray?.map(e =>
		data?.find(d => d.heading === e.name && d.compareKey === e.type)
	);

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

	const createRowComponent = (row, header) => {
		return (
			<Fragment key={row.label}>
				<tr className={"attribute-brand-row attribute-section-title-row"}>
					<td className={"attribute-name"}>{row.label}</td>
					<td colSpan={header?.length - 1 || 1}> </td>
				</tr>
				{row?.data?.map(ele => {
					return (
						<tr className={"attribute-brand-row"} key={ele.label}>
							<td className={"attribute-name"}>{ele.label}</td>
							{ele?.data.map(e => (
								<td
									key={`${e.compareKey}-${e.brandName}`}
									className={`attribute-score-data ${e.compareKey === "client" ? "client-brand-name" : ""
										}`}
								>
									{bindScoreData(e)}
								</td>
							))}
						</tr>
					);
				})}
			</Fragment>
		);
	};

	const bindScoreData = obj => {
		return (
			<div className={"brand-score-details"}>
				<span className={"attribute-compare-score initial-score"}>
					<div className={"initial"}>{getScore(obj.initial)}</div>
				</span>
				{createVerticalBar(obj.color, obj.initial)}
				{isDateCompare &&
					createVerticalBar(DATE_COMPARE_COLORS[1], obj.compare)}
				<span className={"attribute-compare-score date-compare-score"}>
					{isDateCompare && (
						<div className={"date-compare"}>
							<DifferenceIndicator
								difference={obj.difference}
								className={"date-compare-difference"}
							/>
							{getScore(obj.compare)}
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
					style={{
						backgroundColor: color,
						height: `${value ? value : 0}%`
					}}
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
		const tableData = data[0]?.summaryAttributes?.map((e, i) => {
			return {
				label: e.header,
				data: e?.attributes?.map((ele, index) => {
					return {
						label: ele.name,
						data: data?.map(a => {
							const score = a?.summaryAttributes[i]?.attributes ? a.summaryAttributes[i].attributes[index]?.score : {
								compare: null,
								difference: null,
								initial: null
							};
							return {
								brandName: a.heading,
								compareKey: a.compareKey,
								color: a.color,
								...score
							};
						})
					};
				})
			};
		});
		return tableData;
	};

	const header = createHeader();

	return (
		<div className={"attribute-brand-compare-view"}>
			<Table
				header={header}
				data={data && createDataForTable()}
				DataRowComponent={row => createRowComponent(row, header)}
				createUniqueKeyString={row => row.label}
				tableFilter={{}}
			/>
		</div>
	);
};

export default Attributes;
