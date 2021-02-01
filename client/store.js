import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { loadState, saveState } from "./utils/sessionstorage";
import rootSaga from "./rootSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();
const store = createStore(
	rootReducer,
	persistedState,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// On any state change, save the state to sessionStorage.
// Prevent the saveState function from being called too many times in case that
// state updates vary fast.
store.subscribe(
	() =>
		saveState({
			global: store.getState().global
		})
);

export default store;
