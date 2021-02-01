import React, { Component } from "react";
import { connect } from "react-redux";
import PageContent from "./PageContent";
import "./main.scss";
import LeftNavigation from "./LeftNavigation";
import Header from "./Header";
import BackToTop from "./PageContent/common/BackToTopArrow";

class LandingPage extends Component {
	render() {
		const { isAsinsLandingPage } = this.props;

		return (
			<div className="landing-page">
				<div className="left-nav-container"></div>
				<LeftNavigation />
				<div
					className={`main-page-content-container ${isAsinsLandingPage &&
						"asins-landing-page"}`}
				>
					<Header />
					<PageContent />
				</div>
				<div className="back-to-top">
					<BackToTop />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAsinsLandingPage: state.global.config.isAsinsLandingPage
});

const LandingPageContainer = connect(mapStateToProps, null)(LandingPage);

export default LandingPageContainer;
