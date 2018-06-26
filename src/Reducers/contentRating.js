const defaultState = {
    ratingModalOpen: false,
    awaitingResponse: false,
    // contentRating: null,
    postOutcome: null
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_RATING_MODAL_OPEN': {
            return {
                ...state,
                ratingModalOpen: action.value
            }
        }

        case 'SET_AWAITING_RESPONSE': {
            return {
                ...state,
                awaitingResponse: action.value
            }
        }

        case 'SET_POST_OUTCOME': {
            return {
                ...state,
                postOutcome: action.value
            }
        }

        default: {
            return state
        }

    }
}

export default state


