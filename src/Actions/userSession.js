
import * as request from 'superagent'
import config from '../config'

export function logOut () {
    return {
        type: "SET_USER_LOGGED_OUT"
    }
}

export function setLogin (wasSuccessful, userId = null) {
    return {
        type: "SET_USER_LOGGED_IN", 
        wasSuccessful,
        userId
    }
}

export function updateContentAverageRating (contentId, newAverage) {
    return {
        type: "UPDATE_CONTENT_RATING",
        contentId,
        newAverage
    }
}

export function setSelectedContent (contentId) {
    return {
        type: "SET_SELECTED_CONTENT",
        contentId
    }
} 

export function setContent (content) {
    return {
        type: "SET_CONTENT", 
        content
    }
}

export function setAwaitingResponse (value) {
    return {
        type:"SET_AWAITING_RESPONSE",
        value
    }
}

export function attemptLogin (userId) {
    return (dispatch, getState) => {
        request
            .get(config.api + "/login/" + userId)
            .then(res => {
                if (res.body.response !== "success") {
                    console.log("Failed to login")
                    dispatch(setLogin(false))
                } else {
                    dispatch(setLogin(true, res.body.userId))
                    dispatch(retrieveContent())
                }
            })
            .catch(err => {
                console.log("Failed to login")
            })
    }
}

export function retrieveContent () {
    return (dispatch, getState) => {

        request
            .get(config.api + "/content")
            .then(res => {
                if (!res) {
                    console.log("Could not retrieve content")
                } else {
                    dispatch(setContent(res.body.content))
                }
            })
            .catch(err => {
                console.log("Could not retrieve content")
            })

    }
}