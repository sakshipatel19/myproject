import React, { Component, Fragment } from "react";
import Icon from "../common/Icon";
import LeftNavOverlay from "./LeftNavOverlay";
import Overlay from "../common/Overlay";
import { navData } from "./navData";
import "./LeftNavigation.scss";
import { connect } from "react-redux";
import HorizontalSeparator from "../common/HorizontalSeparator";
import {
	setisAsinsViewPageInConfig,
	setisAsinCompareInConfig
} from "../global-actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

class LeftNavigation extends Component {
	state = {
		showNavOverlay: false,
		hoveredModule: null
	};

	onShowNavOverlay = data => {
		const { primaryModule } = this.props;
		this.setState({
			showNavOverlay: primaryModule !== data.type,
			hoveredModule: data.type
		});
	};

	getSelectedNavdata = activeNav => {
		return navData.find(nav => nav.type === activeNav);
	};

	hideNavOverlay = () => {
		this.setState({
			showNavOverlay: false,
			hoveredModule: null
		});
	};

	createLeftnavIcons = activeNav => {
		return navData.map(nav => {
			return (
				<div
					key={nav.type}
					className={`left-nav-main-route ${activeNav == nav.type && "hoverd"}`}
					onMouseEnter={() => this.onShowNavOverlay(nav)}
				>
					<Icon
						name={activeNav == nav.type ? nav.iconHover : nav.icon}
						size="18"
						iconClass="nav-route"
					/>

					{activeNav == nav.type && (
						<div className="hover-nav-text">{nav.label}</div>
					)}
				</div>
			);
		});
	};

	closeAsinsPage = () => {
		this.props.setisAsinsViewPageInConfig(false);
		this.props.setisAsinCompareInConfig(false);
		this.setState({ hoveredModule: null });
		const previousLocation =
			this.props.location?.state?.from || this.props.closeRedirectUrl;
		if (previousLocation) this.props.history.push(previousLocation);
		else this.props.history.goBack();
	};

	render() {
		const { selectedNavLink, primaryModule, isAsinsLandingPage } = this.props;

		let { showNavOverlay, hoveredModule } = this.state;

		if (!hoveredModule) hoveredModule = primaryModule;

		const data = this.getSelectedNavdata(hoveredModule);

		return (
			<>
				{showNavOverlay && <Overlay onClick={this.hideNavOverlay} />}
				<div
					className="left-navigation-main-container"
					onMouseLeave={() => this.hideNavOverlay()}
				>
					<div className="left-nav-main-routes">
						<div className="ci-logo">
							<Icon name="ciWhiteLogo" size="35" />
						</div>
						{this.createLeftnavIcons(hoveredModule)}
						{isAsinsLandingPage && (
							<>
								<HorizontalSeparator styles={{ opacity: "0.23" }} />
								<div
									className={`left-nav-main-route close-left-nav ${hoveredModule ==
										"close" && "hoverd"}`}
									onMouseEnter={() => this.setState({ hoveredModule: "close" })}
									onClick={this.closeAsinsPage}
								>
									<Icon name={"closeLeftNav"} size={18} />
									{hoveredModule === "close" && (
										<div className="hover-nav-text">CLOSE</div>
									)}
								</div>
							</>
						)}
					</div>
					{!data?.hidesecondaryNav && !isAsinsLandingPage && (
						<LeftNavOverlay
							data={data?.value}
							activeNav={hoveredModule}
							activeRoute={selectedNavLink}
							setSelectedNavLink={this.setSelectedNavLink}
						/>
					)}
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({ ...state.global.config });

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{ setisAsinsViewPageInConfig, setisAsinCompareInConfig },
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(LeftNavigation));
