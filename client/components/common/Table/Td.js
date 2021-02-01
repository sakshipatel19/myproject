import React, { Fragment } from "react";
import Checkbox, { checkboxStates } from "../Checkbox";
import Dot from "../Dot/Dot";

const Td = ({
	children,
	className = "",
	isCheckboxRequired,
	onCheckBoxSelect,
	isCheckboxSelected,
	isNumber,
	postfix,
	brandCompareView,
	colSpan
}) => {
	let initial = "";
	let compare = "";
	const bgColors = brandCompareView
		? ["#16ABE0", "#FF97B5", "#A98DCD"]
		: ["#63D9D1", "#FFBF7A"];
	if (Array.isArray(children)) {
		initial = children[0];
		compare = children[1];
	} else initial = children;
	return (
		<Fragment>
			{isCheckboxRequired && !brandCompareView ? (
				<td className="table-checkbox-cell">
					<Checkbox
						onStateChange={() => onCheckBoxSelect(!isCheckboxSelected)}
						status={
							isCheckboxSelected
								? checkboxStates.fullySelected
								: checkboxStates.unselected
						}
						name=""
					></Checkbox>
				</td>
			) : null}
			<td className={`${isNumber ? "number-text" : ""} ${className}`} colSpan={colSpan}>
				{isCheckboxRequired && brandCompareView ? <Checkbox
					onStateChange={() => onCheckBoxSelect(!isCheckboxSelected)}
					status={
						isCheckboxSelected
							? checkboxStates.fullySelected
							: checkboxStates.unselected
					}
					name=""
				></Checkbox> : null}
				{children != undefined && children != null
					? `${children}${postfix || ""}`
					: "NA"}
			</td>
		</Fragment>
	);
};

export default Td;
