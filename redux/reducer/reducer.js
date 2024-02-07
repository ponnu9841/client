import { PROFILE_DATA, WINDOW_SIZE } from "../const";

// WINDOW SIZE
export const windowSizeData = (data = null, action) => {
	switch (action.type) {
		case WINDOW_SIZE:
			return action.data.windowSize;
		default:
			return data;
	}
};

export const getProfileData = (data = null, action) => {
	switch (action.type) {
		case PROFILE_DATA:
			return action.data.profileData;
		default:
			return data;
	}
};
