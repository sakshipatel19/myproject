export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

const apiActions = [REQUEST, SUCCESS, ERROR];

export const createActionConstants = base => {
	return apiActions.reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	}, {});
};

export const action = (type, payload = {}) => {
	return { type, ...payload };
};

export const createActions = key => {
	return {
		request: payload => action(key[REQUEST], { payload }),
		success: response => action(key[SUCCESS], { response }),
		error: response => action(key[ERROR], { response })
	};
};
