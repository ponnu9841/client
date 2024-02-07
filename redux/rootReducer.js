import { combineReducers } from "redux";
import { windowSizeData, getProfileData } from "./reducer/reducer";

const appReducer = combineReducers({
	windowSizeData,
	getProfileData,
});

const rootReducer = (state, action) => {
	if (action.type === "USER_LOGOUT") {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export default rootReducer;
