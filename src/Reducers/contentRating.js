const defaultState = {
    ratingModalOpen: false,
    awaitingResponse: false,
    contentRating: null,
    postFailed: false
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_RATING_MODAL_OPEN': {
            return {
                ...state,
                ratingModalOpen: action.value
            }
        }

        case 'SET_CONTENT_RATING': {
            return {
                ...state,
                contentRating: action.contentRating
            }
        }

        case 'SET_AWAITING_RESPONSE': {
            return {
                ...state,
                awaitingResponse: action.value
            }
        }

        case 'SET_POST_FAILED': {
            return {
                ...state,
                postFailed: action.value
            }
        }

        default: {
            return state
        }

    }
}

export default state


