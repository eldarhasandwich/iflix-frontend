
import * as request from 'superagent'
import config from '../config'

export function setRatingModalOpen (isOpen) {
    return {
        type: "SET_RATING_MODAL_OPEN", 
        value: isOpen
    }
}

export function setContentRating (contentRating) {
    return {
        type: "SET_CONTENT_RATING", 
        contentRating: contentRating
    }
}

export function setPostFailed (value) {
    return {
        type:"SET_POST_FAILED",
        value
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
                console.log(res)
                if (!res || res.body.response !== "success") {
                    dispatch(setPostFailed(true))
                } else {
                    dispatch(retrieveRating(_contentId))
                }
                setTimeout(function() { 
                    dispatch(setRatingModalOpen(false))
                    dispatch(setPostFailed(false))
                }, 3000)
            }, err => {
                dispatch(setAwaitingResponse(false))
                dispatch(setPostFailed(true))                
            })

    }
}