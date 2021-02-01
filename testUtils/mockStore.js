import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../client/rootReducer";
import { loadState, saveState } from "../client/utils/sessionstorage";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() =>
	saveState({
		global: store.getState().global
	})
);
export default store;
