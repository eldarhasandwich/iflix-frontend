
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

                } else {
                    dispatch(setContentRating(res.body))
                }
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
            .then(function(res) {
                dispatch(setAwaitingResponse(false))
                if (!res) {
                    dispatch(setPostFailed())
                } else {
                    dispatch(retrieveRating(_contentId))
                }
            })
            .catch(function(err) {
                dispatch(setAwaitingResponse(false))
                dispatch(setPostFailed())
            })

    }
}