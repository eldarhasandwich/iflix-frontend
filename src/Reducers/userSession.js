const defaultState = {
    content: null,
    selectedContentId: null,

    awaitingResponse: false,
    isLoggedIn: false,
    loginFailed: false,
    userId: null
}

const state = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER_LOGGED_OUT': {
            return defaultState
        }

        case 'SET_USER_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: action.wasSuccessful,
                loginFailed: !action.wasSuccessful,
                userId: action.userId
            }
        }

        case 'SET_SELECTED_CONTENT': {
            return {
                ...state,
                selectedContentId: action.contentId
            }
        }

        case 'SET_CONTENT': {
            return {
                ...state,
                content: action.content
            }
        }

        case 'UPDATE_CONTENT_RATING': {
            return {
                ...state,
                content: state.content.map(item => 
                    (item.contentId === action.contentId) 
                        ? {contentId: item.contentId, title: item.title, average: action.newAverage}
                        : item
                )
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


