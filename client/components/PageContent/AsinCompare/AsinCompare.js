import React, { Component } from "react";

import Overlay from "../../common/Overlay";
import AsinCompareModal from "./AsinCompareModal";

class AsinCompare extends Component {
	componentDidMount() {
		this.props.clearTopSellerBrandsList();
		this.props.fetchClientBrandsList(this.props);
		this.props.fetchCompetitorBrandsList(this.props);
	}
	render() {
		return (
			<div className="brand-compare-popup-container">
				<Overlay onClick={this.props.hideBrandCompare} />
				<AsinCompareModal {...this.props} />
			</div>
		);
	}
}

export default AsinCompare;
