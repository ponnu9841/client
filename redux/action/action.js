import { WINDOW_SIZE, PROFILE_DATA, USER_LOGOUT } from "../const";

export const getWindowSize = (data) => {
	return {
		type: WINDOW_SIZE,
		data,
	};
};

export const profieDetails = (data) => {
	return {
		type: PROFILE_DATA,
		data,
	};
};

export const logOut = (data) => {
	return {
		type: USER_LOGOUT,
		data,
	};
};
