import React, { Component } from "react";
import "./InPageNavigation.scss";
import DotWithLabel from "../../../common/DotWithLabel";
import { compareTwoArrays } from "../../../../utils/array";

class InPageNavigation extends Component {
	state = {
		list: []
	};

	scrollOnClick = element => {
		element.scrollIntoView({ behavior: "smooth" });
	};

	componentDidMount() {
		const list = this.fetchListFromRef();
		this.setState({ list });
	}

	componentDidUpdate() {
		const list = this.fetchListFromRef();
		const array1 = list?.map(e => e.label);
		const array2 = this.state.list?.map(e => e.label);
		if (!compareTwoArrays(array1, array2)) this.setState({ list });
	}

	fetchListFromRef = () => {
		const containerNode = this.props.containerRef?.current;
		if (containerNode) {
			const childNodes = containerNode?.querySelectorAll(
				".section-header-main"
			);

			return [...childNodes].map((item, i) => {
				let label = item.querySelector(".section-header-title")?.innerText;
				return {
					item,
					label: (label && label) || null
				};
			});
		}
		return null;
	};

	getInPageNavigation = () => {
		const list = this.state.list?.map((ele, i) => {
			return (
				<div className="inPageNavigation-link" key={ele.label}>
					{i !== 0 && ele.label && <DotWithLabel color={"#212129"} size={6} />}
					<span
						className={"inPageNavigation-link-item"}
						onClick={i === 0 ? null : () => this.scrollOnClick(ele.item)}
					>
						{ele.label}
					</span>
				</div>
			);
		});

		return list?.length > 1 && list;
	};

	render() {
		return (
			<div className="inPageNavigation-container">
				{this.getInPageNavigation()}
			</div>
		);
	}
}

export default InPageNavigation;
