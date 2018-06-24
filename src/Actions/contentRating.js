
import * as request from 'superagent'
import config from '../config'

export function setContentRating (contentRating) {
    return {
        type: "SET_CONTENT_RATING", 
        contentRating: contentRating
    }
}

export function setPostFailed () {
    return {
        type:"SET_POST_FAILED"
    }
}

export function setAwaitingResponse (value) {
    return {
        type:"SET_AWAITING_RESPONSE",
        value
    }
}

export function retrieveRating (contentId) {
    return (dispatch, getState) => {

        request
            .get(config.api + "/rating/" + contentId)
            .then(function(res) {
                if (!res) {
                    ///
                } else {
                    dispatch(setContentRating(res.body))
                }
            })
            .catch(function(err) {
                ///
            })

    }
}

export function postUserRating (_userId, _contentId, _rating) {
    return (dispatch, getState) => {
        dispatch(setAwaitingResponse(true))
        request
            .post(config.api + "/rating")
            .query({
                userId: _userId,
                contentId: _contentId,
                rating: _rating
            })
            .timeout({
                response: 5000
            })
            .then(res => {
                dispatch(setAwaitingResponse(false))
                if (!res || res.response !== "success") {
                    dispatch(setPostFailed())
                } else {
                    dispatch(retrieveRating(_contentId))
                }
            }, err => {
                dispatch(setAwaitingResponse(false))
                dispatch(setPostFailed())                
            })

    }
}