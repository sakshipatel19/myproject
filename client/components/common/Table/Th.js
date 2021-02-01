import React, { Fragment } from "react";
import Checkbox, { checkboxStates } from "../Checkbox";
import Icon from "../Icon";

const Th = ({
	children,
	className = "",
	colSpan,
	rowSpan,
	isSortable,
	isSortBySelected,
	sortOrder,
	onSortOrderChange,
	isCheckboxRequired,
	onCheckBoxSelect,
	isCheckboxSelected,
	checkboxClassName,
	style,
	isNumber,
	checkboxStyle,
	iconName,
	brandCompareView
}) => (
		<Fragment>
			{isCheckboxRequired && !brandCompareView ? (
				<th
					className={`${checkboxClassName} table-checkbox-cell`}
					rowSpan={rowSpan}
					colSpan={colSpan}
					style={checkboxStyle}
				>
					<Checkbox
						onStateChange={(e) => onCheckBoxSelect(e, !isCheckboxSelected)}
						status={isCheckboxSelected === 'partial' ? checkboxStates.partiallySelected : isCheckboxSelected
							? checkboxStates.fullySelected
							: checkboxStates.unselected
						}
						name=""
					></Checkbox>
				</th>
			) : null}

			<th
				className={`${isSortable ? "columnSortable" : ""} ${className} ${isSortBySelected ? "sortSlelected" : ""
					} ${isNumber ? "number-text" : ""}`}
				onClick={isSortable ? onSortOrderChange : null}
				colSpan={colSpan}
				rowSpan={rowSpan}
				style={style}
			>
				{isCheckboxRequired && brandCompareView ? <Checkbox
					onStateChange={(e) => onCheckBoxSelect(e, !isCheckboxSelected)}
					status={isCheckboxSelected === 'partial' ? checkboxStates.partiallySelected : isCheckboxSelected
						? checkboxStates.fullySelected
						: checkboxStates.unselected
					}
					name=""
				></Checkbox> : null}
				{children}
				{iconName && (
					<span className="external-icon">
						{"( "}
						<Icon name={iconName} size={12} />
						{" )"}
					</span>
				)}
				{isSortBySelected ? (
					<Icon
						iconClass={"table-sort-image"}
						name={sortOrder === "ASC" ? "sortUp" : "sortDown"}
					/>
				) : null}
			</th>
		</Fragment>
	);

export default Th;
