const defaultState = {
    contentRating: null
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'PULL_CONTENT_RATING': {
            return {
                ...state,
                contentRating: action.contentRating
            }
        }

        default: {
            return state
        }

    }
}

export default state