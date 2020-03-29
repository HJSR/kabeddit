import { defaultSubreddits } from "../utils/subredditsTree"

const constants = {
	UPDATE_FILTERS: 'UPDATE_FILTERS',
	SET_INITIALIZED: 'SET_INITIALIZED',
}

const initialState = {
	filters: {
		subreddits: defaultSubreddits,
		order: 'hot',
		time: 'day',
		showNSFW: false,
		blurNSFW: false,
		showThumbnails: false,
	},
	initialized: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_FILTERS:
			return Object.assign({}, state, {
				filters: {
					...state.filters,
					...action.newFilters
				},
			})
		case constants.SET_INITIALIZED:
			return Object.assign({}, state, {
				initialized: action.initialized,
			})
		default:
			return state
	}
}

const actions = {
	updateFilters: (newFilters) => ({
		type: constants.UPDATE_FILTERS,
		newFilters,
	}),
	setInitialized: (value) => ({
		type: constants.SET_INITIALIZED,
		initialized: value,
	})
}

export { actions };
export { reducer };