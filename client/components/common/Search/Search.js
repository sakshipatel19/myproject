import React, { Component } from "react";

import "./Search.scss";
import SearchIcon from "../../../assets/images/Search.svg";
import RemoveIcon from "../../../assets/images/Remove.svg";
import VerticalSeparator from "../VerticalSeparator";
import Icon from "../Icon";
class Search extends Component {
	state = {
		searchKeyword: "",
		searchKeywordList: []
	};

	handleSearchKeyPress = event => {
		if (event.key === "Enter") {
			let { searchKeyword } = this.state;
			searchKeyword = searchKeyword?.trim();
			if (!searchKeyword) return;
			const searchKeywordList = [...this.props.searchKeywordList];
			if (searchKeywordList.indexOf(searchKeyword) === -1) {
				searchKeywordList.push(searchKeyword);
				this.setState({ searchKeyword: "" });
				this.props.getSearchedKeywordList(searchKeywordList);
			}
		}
	};
	handleSearchOnChnage = event => {
		this.setState({ searchKeyword: event.target.value });
	};
	handleSearchTagRemove = keyword => {
		const searchKeywordList = [...this.props.searchKeywordList];
		let index = searchKeywordList.indexOf(keyword);
		index > -1 && searchKeywordList.splice(index, 1);

		searchKeywordList.length == 0
			? this.props.getSearchedKeywordList([])
			: this.props.getSearchedKeywordList(searchKeywordList);
	};
	handleClearAllSearch = () => {
		this.props.getSearchedKeywordList([]);
	};
	createSearchedKeywordList = () => {
		const { searchKeywordList } = this.props;

		return searchKeywordList.map((keyword, index) => {
			return (
				<div className="search-tag" key={`${keyword}_${index}`}>
					{keyword}
					<span>
						<Icon
							iconClass="search-tag-remove"
							size={20}
							name="error"
							handleIconClick={() => this.handleSearchTagRemove(keyword)}
						/>
					</span>
				</div>
			);
		});
	};
	render() {
		return (
			<div className="common-search-container">
				<div className="search-input-container">
					<span>
						<img scr={SearchIcon} />
					</span>
					<input
						className="search-input"
						type="text"
						placeholder={this.props.placeholder || "Search Keywords"}
						value={this.state.searchKeyword}
						onChange={event => {
							this.handleSearchOnChnage(event);
						}}
						onKeyPress={event => this.handleSearchKeyPress(event)}
					/>
				</div>
				<div className="search-keyword-list-container">
					{this.props.searchKeywordList && this.createSearchedKeywordList()}
					{this.props.searchKeywordList?.length >= 1 && (
						<div className="clear-all-search">
							<VerticalSeparator />
							<div className="clear-all">
								CLEAR ALL
								<span onClick={() => this.handleClearAllSearch()}>
									<Icon name="error" size={12} iconClass="clear-all-icon" />
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Search;
