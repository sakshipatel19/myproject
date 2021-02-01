import React, { Component } from "react";

import "./Pagination.scss";
import VerticalSeparator from "../VerticalSeparator";
import Icon from "../Icon";

class Pagination extends Component {
	state = {
		currentPage: this.props?.currentPage || 1,
		totalPages: this.props?.totalPages || 20,
		gotoPage: "",
		gotoError: false
	};
	componentDidUpdate(prevProps) {
		if (this.props.currentPage !== prevProps.currentPage || this.props.totalPages !== prevProps.totalPages) {
			this.setState({ totalPages: this.props?.totalPages, currentPage: this.props?.currentPage });
		}
	}
	createButton = (
		firstIndex,
		lastIndex,
		currentpage,
		firstButton,
		lastButton
	) => {
		const button = [];
		if (firstButton) {
			let firstBtn = (
				<button
					className="button"
					key={"1"}
					value={1}
					onClick={e => this.setCurrentPage(e, 1)}
				>
					{1}
				</button>
			);
			button.push(firstBtn);
			button.push(
				<div key={"...first"} className="button placeholder">
					....
				</div>
			);
		}

		for (let i = firstIndex; i <= lastIndex; i++) {
			let classNames = currentpage == i ? `button active-btn` : "button";
			button.push(
				<button
					className={classNames}
					key={i}
					value={i}
					onClick={e => this.setCurrentPage(e, i)}
				>
					{i}
				</button>
			);
		}
		if (lastButton) {
			button.push(
				<div key={"...llast"} className="button placeholder">
					....
				</div>
			);
			let lastBtn = (
				<button
					key={this.state.totalPages}
					className="button"
					value={this.state.totalPages}
					onClick={e => this.setCurrentPage(e, this.state.totalPages)}
				>
					{this.state.totalPages}
				</button>
			);
			button.push(lastBtn);
		}
		return button;
	};
	setCurrentPage = event => {
		this.setState({ currentPage: Number(event.target.value) }, () => {
			this.props.getCurrentPageNo(this.state.currentPage);
		});
	};
	handlePreviousNextBtn = buttonName => {
		if (buttonName == "left" && this.state.currentPage >= 2) {
			this.setState({ currentPage: this.state.currentPage - 1 }, () => {
				this.props.getCurrentPageNo(this.state.currentPage);
			});
		} else if (
			buttonName == "right" &&
			this.state.currentPage <= this.state.totalPages - 1
		) {
			this.setState({ currentPage: this.state.currentPage + 1 }, () => {
				this.props.getCurrentPageNo(this.state.currentPage);
			});
		}
	};
	handleGotoInputChange = e => {
		const gotoValue = Number(e.target.value);
		gotoValue > this.state.totalPages || gotoValue <= 0
			? this.setState({ gotoError: true, gotoPage: gotoValue })
			: this.setState({ gotoPage: gotoValue, gotoError: false });
	};

	hanleGotoEventOnKeyPress = e => {
		if (event.key === "Enter" && this.state.gotoPage <= this.state.totalPages) {
			this.handleGoToBtn();
		}
		return false;
	};

	handleGoToBtn = () => {
		this.state.gotoPage > this.state.totalPages
			? this.setState({ gotoError: true })
			: this.setState({ currentPage: this.state.gotoPage }, () => {
				this.props.getCurrentPageNo(this.state.currentPage);
			});
	};
	createPaginationButtons = () => {
		const totalPages = Number(this.state.totalPages);
		const currentPage = Number(this.state.currentPage);
		let buttons = [];
		if (currentPage < 5 && totalPages <= 5) {
			buttons = this.createButton(1, totalPages, currentPage, null, null);
		}
		//when currentpage is between 1 and 5
		else if (currentPage < 5 && totalPages > 5) {
			buttons = this.createButton(1, 5, currentPage, null, true);
			// when curreentpage is between 5 to totalpages -4
		} else if (currentPage >= 5 && currentPage <= totalPages - 4) {
			buttons = this.createButton(
				currentPage - 1,
				currentPage + 1,
				currentPage,
				true,
				true
			);
			//when currentpage is between totalPages - 4  to totalpages
		} else if (totalPages - 4 < currentPage && currentPage <= totalPages) {
			buttons = this.createButton(
				totalPages - 4,
				totalPages,
				currentPage,
				true,
				null
			);
		}
		return <>{buttons}</>;
	};
	render() {
		return (
			<>
				<div className="pagination-container">
					<div className="pagination-buttons-container">
						<div className="left-arrow-button">
							<button
								className="button"
								onClick={() => this.handlePreviousNextBtn("left")}
								disabled={this.state.currentPage == 1}
							>
								{this.state.currentPage == 1 ? (
									<Icon
										name="leftDisable"
										size="15px"
										iconClass="left-disabled"
									/>
								) : (
										<>
											<Icon name="left" size="15px" iconClass="left" />
											<Icon
												name="arrowCircleLeft"
												size="24px"
												iconClass="arrowCircleLeft"
											/>
										</>
									)}
							</button>
						</div>
						<div className="pagination-button">
							{this.createPaginationButtons()}
						</div>
						<div className="right-arrow-button">
							<button
								className="button"
								onClick={() => this.handlePreviousNextBtn("right")}
								disabled={this.state.currentPage == this.state.totalPages}
							>
								{this.state.currentPage == this.state.totalPages ? (
									<Icon
										name="rightDisable"
										size="15px"
										iconClass="right-disabled"
									/>
								) : (
										<>
											<Icon name="right" size="15px" iconClass="right" />
											<Icon
												name="arrowCircleRight"
												size="24px"
												iconClass="arrowCircleRight"
											/>
										</>
									)}
							</button>
						</div>
					</div>
					<VerticalSeparator />
					<div className="go-to-page-container">
						<div className="goto">GO TO</div>
						<input
							type="number"
							className={`goto-input ${this.state.gotoError &&
								`goto-inupt-error`}`}
							onChange={e => this.handleGotoInputChange(e)}
							onKeyPress={e => this.hanleGotoEventOnKeyPress(e)}
						/>
						<div className="right-arrow-button">
							<button
								className="button"
								disabled={this.state.gotoError || this.state.gotoPage == ""}
								onClick={() => this.handleGoToBtn()}
							>
								{this.state.gotoError || this.state.gotoPage == "" ? (
									<Icon
										name="rightBlue"
										size="15px"
										iconClass="goto-right-disabled"
									/>
								) : (<>
									<Icon name="rightBlue" size="15px" iconClass="goto-right" />
									<Icon name="rightIconHover" size="15px" iconClass="goto-right-hover" />
								</>
									)}
							</button>
						</div>
					</div>
				</div>
				{this.state.gotoError && (
					<div className="pagination-error">Please enter a valid number</div>
				)}
			</>
		);
	}
}

export default Pagination;
