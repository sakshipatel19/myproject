import React from "react";
import DotWithLabel from "../DotWithLabel";
import VerticalSeparator from "../VerticalSeparator";
import DifferenceIndicator from "../DifferenceIndicator";
import Icon from "../Icon";
import { isNullOrUndefined } from "../../../utils/number";
import { DATE_COMPARE_COLORS } from "../../../constants/colors";
import "./Pill.scss";

const dateCompareColor = DATE_COMPARE_COLORS;

const Pill = ({
	color,
	label,
	score,
	compareScore,
	difference,
	isCompareSelected,
	isBrandCompare,
	length,
	onRemovePill,
	labelTextFormat,
	isSelected
}) => {
	const formatScore = score =>
		isNullOrUndefined(score)
			? "NA"
			: labelTextFormat
			? labelTextFormat(score)
			: `${score}%`;

	return (
		<div
			className={"Pill-container"}
			style={
				(length > 1 && color) || isBrandCompare
					? { borderLeft: `7px solid ${color}` }
					: null
			}
		>
			<span className={"pill-label"}>{label} :</span>
			{isCompareSelected ? (
				<span className={"pill-value"}>
					<DotWithLabel text={formatScore(score)} color={color} />
					<DotWithLabel
						text={formatScore(compareScore)}
						color={dateCompareColor[1]}
					/>
					<VerticalSeparator className={"Pill-vertical-separator"} />
					<DifferenceIndicator
						difference={difference}
						labelTextFormat={labelTextFormat}
					/>
				</span>
			) : (
				<span className={"pill-value"}>{formatScore(score)}</span>
			)}
			{length > 1 && !isBrandCompare && !isSelected && (
				<Icon
					name={"remove"}
					size={12}
					iconClass={"pill-remove-icon"}
					handleIconClick={onRemovePill}
				/>
			)}
		</div>
	);
};

export default Pill;
