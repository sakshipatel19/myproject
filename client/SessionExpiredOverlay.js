import React from "react";
import Overlay from "./components/common/Overlay";
import Icon from "./components/common/Icon";
import Button from "./components/common/Button";
import "./App.scss";

const SessionExpiredOverlay = ({ onCloseIconClick }) => {
	return (
		<Overlay>
			<div className="modal-header-container">
				<div className="modal-header-content">Session Expired</div>
			</div>
			<div className="modal-main-content">
				<Icon
					name="sessionExpired"
					size={48}
					iconClass="session-expired-icon"
				/>
				<div className="session-expired-message">
					<div>Your session has expired due to inactivity.</div>
					<div>To continue, please login again.</div>
				</div>
				<Button primary buttonText="LOGIN" onClick={() => onCloseIconClick()} />
			</div>
		</Overlay>
	);
};

export default SessionExpiredOverlay;
