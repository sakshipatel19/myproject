import * as constants from "./notifications-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	notifications: null,
	notificationLoadMore: null,
	notificationFilter: null
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_NOTIFICATION_LIST[REQUEST]:
			return {
				...state,
				notifications: { data: null, fetching: true, error: null }
			};
		case constants.GET_NOTIFICATION_LIST[SUCCESS]:
			return {
				...state,
				notifications: { data: action.response, fetching: false, error: null }
			};
		case constants.GET_NOTIFICATION_LIST[ERROR]:
			return {
				...state,
				notifications: { data: null, fetching: false, error: action.response }
			};
		case constants.APPEND_NOTIFICATION_LIST[REQUEST]:
			return {
				...state,
				notificationLoadMore: { fetching: true, error: null }
			};
		case constants.APPEND_NOTIFICATION_LIST[SUCCESS]:
			return {
				...state,
				notifications: {
					fetching: false,
					error: null,
					data: AppendNotificationsToList(state, action.response)
				},
				notificationLoadMore: { fetching: false, error: null }
			};
		case constants.APPEND_NOTIFICATION_LIST[ERROR]:
			return {
				...state,
				notificationLoadMore: { fetching: false, error: action.response }
			};
		case constants.GET_NOTIFICATION_FILTER[REQUEST]:
			return {
				...state,
				notificationFilter: { data: null, fetching: true, error: null }
			};
		case constants.GET_NOTIFICATION_FILTER[SUCCESS]:
			return {
				...state,
				notificationFilter: {
					data: action.response,
					fetching: false,
					error: null
				}
			};
		case constants.GET_NOTIFICATION_FILTER[ERROR]:
			return {
				...state,
				notificationFilter: {
					data: null,
					fetching: false,
					error: action.response
				}
			};
	}

	return state;
};

export default reducer;

const AppendNotificationsToList = (state, response) => {
	return {
		...response,
		notificationsList: [
			...state.notifications?.data?.notificationsList,
			...response.notificationsList
		]
	};
};
