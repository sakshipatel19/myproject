import Header from "./Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "../global-actions";
import {
	getNotificationsList,
	updateNotificationStatus,
	loadMoreNotificationsList,
	getNotificationFilter
} from "./Notifications/notifications-actions";

const mapStateToProps = state => {
	const {
		notifications,
		notificationLoadMore,
		notificationFilter
	} = state.notifications;
	return {
		...state.global.config,
		scoreTypeSelectorToDefault: state.global.scoreTypeSelectorToDefault,
		notifications,
		notificationLoadMore,
		notificationFilter
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			...globalActions,
			getNotificationsList,
			updateNotificationStatus,
			loadMoreNotificationsList,
			getNotificationFilter
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
