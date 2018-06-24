const defaultState = {
    content: null,
    awaitingResponse: false,
    isLoggedIn: false,
    loginFailed: false,
    userId: null
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: action.wasSuccessful,
                loginFailed: !action.wasSuccessful,
                userId: action.userId
            }
        }

        case 'SET_CONTENT': {
            return {
                ...state,
                content: action.content
            }
        }

        case 'SET_AWAITING_RESPONSE': {
            return {
                ...state,
                awaitingResponse: action.value
            }
        }

        default: {
            return state
        }

    }
}

export default state


