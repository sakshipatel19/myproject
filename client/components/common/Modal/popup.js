import React, { Fragment, Component } from "react";
import Overlay from "./overlay";
import "./popup.scss";
import Modal from ".";
import PopupFooter from "./popupFooter";
import PopupData from "./popup-data";

class Popup extends Component {
	state = {
		showSelectedTableRecords: false
	};

	onCloseClickSelectedKeywords = () => {
		this.setState({
			showSelectedTableRecords: false
		});
	};
	render() {
		const {
			OnViewTrendsClick,
			onClearSelectClick,
			tableSelectedRecords,
			onClickViewSelectedKeywords,
			showSelectedKeywords,
			enable = true
		} = this.props;

		const { showSelectedTableRecords } = this.state;

		return (enable ?
			<Modal>
				<PopupFooter
					onClick={OnViewTrendsClick}
					onClickSelectedKeywords={onClickViewSelectedKeywords}
					onClearSelectClick={onClearSelectClick}
					noOfRecords={tableSelectedRecords.length}
					keywordsSelectedLabel={showSelectedKeywords ? 'VIEW ALL' : 'VIEW SELECTED KEYWORDS'}
					clearResultLabel={"CLEAR RESULTS"}
					showSelectedTableRecords={this.state.showSelectedTableRecords}
				/>
			</Modal> : null
		);
	}
}

export default Popup;
