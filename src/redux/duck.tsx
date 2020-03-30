import subredditsTree, { defaultSubreddits } from "../utils/subredditsTree"

const constants = {
	UPDATE_FILTERS: 'UPDATE_FILTERS',
	SET_INITIALIZED: 'SET_INITIALIZED',
	UPDATE_SUBREDDITS: 'UPDATE_SUBREDDITS',
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
	subreddits: subredditsTree,
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
		case constants.UPDATE_SUBREDDITS:
			return Object.assign({}, state, {
				subreddits: action.subreddits,
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
	}),
	updateSubs: (subreddits) => ({
		type: constants.UPDATE_SUBREDDITS,
		subreddits,
	})
}

export { actions };
export { reducer };