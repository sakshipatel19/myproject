import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftNavOverlay extends Component {
	createSubRoutes = () => {
		const { data } = this.props;

		const subRoute = data.map((obj, i) => {
			return (
				<div key={obj.label}>
					<div className="sub-route-heading">{obj.label}</div>
					{Array.isArray(obj.value)
						? obj.value.map(route => {
								return this.getSubRouteLink(route, obj.label);
						  })
						: this.getSubRouteLink(obj)}
				</div>
			);
		});
		return subRoute;
	};
	getSubRouteLink(route, label) {
		const { activeNav, activeRoute } = this.props;
		let link = `/analysis/${activeNav}/${
			label ? label.toLowerCase() : route.value.toLowerCase()
		}`;
		if (label) {
			link = `${link}/${route.value}`;
		}

		return (
			<Link key={route.label} to={link} className="sub-route-link">
				<div
					className={`sub-route ${activeRoute == route.value && "selected"}`}
				>
					{route.label}
				</div>
			</Link>
		);
	}
	render() {
		const { activeNav, data } = this.props;

		return (
			<div className="left-nav-overlay-container">
				<div className="left-nav-overlay">
					<div className="logo-text">Commerce Intelligence</div>
					<div className="left-nav-overlay-sub-routes-container">
						<div className="route-heading">
							{activeNav && activeNav.toUpperCase()}
						</div>
						<div className="sub-route-container">
							{data && this.createSubRoutes()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LeftNavOverlay;
