import React from "react";
import Button from "../Button";
import Icon from "../Icon";
import "./popup.scss";

const PopupFooter = ({
	onClick,
	onClearSelectClick,
	noOfRecords,
	onClickSelectedKeywords,
	keywordsSelectedLabel,
	clearResultLabel,
	showSelectedTableRecords
}) => {
	return (
		<div className="popupFooter">
			<div className="popup-footer-container">
				<div className="pouup-keywords-section">
					<label
						className="popup-records-selected-label"
						onClick={onClickSelectedKeywords}
					>
						<span className="popup-records-count">{noOfRecords}</span>
						{keywordsSelectedLabel}
						<Icon
							iconClass={"popup-arrow-up-icon"}
							name={showSelectedTableRecords ? "downLarge" : "upLarge"}
							size={12}
						/>
					</label>
					<div className="remove-selected-records" onClick={onClearSelectClick}>
						<Icon name="remove" size={18} iconClass={"popup-remove-icon"} />
						{clearResultLabel}
					</div>
				</div>
				<div className="pouup-keywords-section">
					<Button
						primary
						onClick={onClick}
						className={"popup-view-Trend-Button"}
						buttonText={"View Trends"}
					/>
				</div>
			</div>
		</div>
	);
};

export default PopupFooter;
