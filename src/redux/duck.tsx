import { defaultSubreddits } from "../utils/subredditsTree"

const constants = {
	UPDATE_FILTERS: 'UPDATE_FILTERS',
}

const initialState = {
	subreddits: defaultSubreddits,
	order: 'hot',
	time: 'day',
	showNSFW: false, 
	blurNSFW: false, 
	showThumbnails: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_FILTERS:
			return Object.assign({}, state, {
				...action.newFilters,
			})
		default:
			return state
	}
}

const actions = {
	updateFilters: (newFilters) => ({
		type: constants.UPDATE_FILTERS,
		newFilters,
	})
}

export { actions };
export { reducer };