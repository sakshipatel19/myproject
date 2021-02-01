import React from "react";

import Icon from "../Icon";
import { isNullOrUndefined } from "../../../utils/number";
import {
	INDICATOR_COLOR_DEFAULT,
	INDICATOR_COLOR_RED,
	INDICATOR_COLOR_GREEN
} from "../../../constants/colors";

import "./DifferenceIndicator.scss";

const DifferenceIndicator = ({
	difference,
	className = "",
	labelTextFormat,
	requireBraces
}) => {
	return (
		<div
			className={`score-difference ${className}`}
			style={{
				color:
					difference === 0 || isNullOrUndefined(difference)
						? INDICATOR_COLOR_DEFAULT
						: difference < 0
						? INDICATOR_COLOR_RED
						: INDICATOR_COLOR_GREEN
			}}
		>
			{requireBraces && "("}
			{isNullOrUndefined(difference)
				? "NA"
				: labelTextFormat
				? labelTextFormat(Math.abs(difference))
				: `${Math.abs(difference)}%`}
			{requireBraces && ")"}
			{difference !== 0 && !isNullOrUndefined(difference) && (
				<Icon
					name={difference < 0 ? "outBound" : "inBound"}
					iconClass={"score-difference-indicator"}
					size={12}
				/>
			)}
		</div>
	);
};

export default DifferenceIndicator;
