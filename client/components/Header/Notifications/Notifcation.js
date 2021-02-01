import React from "react";
import Section from "../../common/Section";
import { isNullOrUndefined } from "../../../utils/number";

const Notification = ({ notification }) => {
	const marketPlaceCapitalised =
		notification?.marketPlace?.charAt(0).toUpperCase() +
		notification?.marketPlace?.slice(1);
	const getValue = val => {
		return isNullOrUndefined(val) ? "NA" : val;
	};
	return (
		<Section className="individual-notification-section">
			<div className="notification-card-container">
				<div className="notification-card-heading">
					<div className="notification-card-heading-text">
						{notification.notificationHeading}
						{notification.new && <span className="new">NEW</span>}
					</div>
					<div className="notification-card-heading-time">
						{notification.notificationTime}
					</div>
				</div>
				<div className="notification-card-body">
					<div
						dangerouslySetInnerHTML={{
							__html: notification.notificationContent
						}}
					></div>
					<div className="row-1">
						<div className="parameter">{`Type: ${getValue(
							notification.funcType
						)}`}</div>
						<div className="parameter column2">{`Marketplace: ${getValue(
							marketPlaceCapitalised
						)}`}</div>
					</div>
					<div className="row-2">
						<div className="parameter">{`Brand: ${getValue(
							notification.brandName
						)}`}</div>
						<div className="parameter column2 seller-name">
							FulFillment Details:
							<span title={getValue(notification.sellerName)}>
								{getValue(notification.sellerName)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Notification;
