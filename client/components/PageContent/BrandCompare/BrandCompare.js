import React, { Component } from "react";

import Overlay from "../../common/Overlay";
import BrandCompareModal from "./BrandCompareModal";

class BrandCompare extends Component {
	componentDidMount() {
		this.props.clearTopSellerBrandsList();
		this.props.fetchClientBrandsList(this.props);
		this.props.fetchCompetitorBrandsList(this.props);
	}
	render() {
		return (
			<div className="brand-compare-popup-container">
				<Overlay onClick={this.props.hideBrandCompare} />
				<BrandCompareModal {...this.props} />
			</div>
		);
	}
}

export default BrandCompare;
