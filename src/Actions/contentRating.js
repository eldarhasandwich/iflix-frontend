
import * as request from 'superagent'
import config from '../config'

import * as UserSessionActions from './userSession'

export function setRatingModalOpen (isOpen) {
    return {
        type: "SET_RATING_MODAL_OPEN", 
        value: isOpen
    }
}

export function setPostOutcome (value) {
    return {
        type:"SET_POST_OUTCOME",
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
            .then(res => {
                if (!res) {
                    console.log("Couldn't update average rating for contentId:" + contentId)
                    return
                }
                dispatch(UserSessionActions.updateContentAverageRating(contentId, res.body.rating))
            })
            .catch(err => {
                console.log("Couldn't update average rating for contentId:" + contentId)
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
            .timeout({ // If server takes more than 5s to respond, timeout
                response: 5000
            })
            .then(res => {
                if (!res || res.body.response !== "success") { // if post failed, display false outcome
                    dispatch(setAwaitingResponse(false))
                    dispatch(setPostOutcome("fail"))
                } else { // if successful, display true outcome
                    dispatch(retrieveRating(_contentId))
                    setTimeout(() => { // cheeky fake delay to let user know action has occured ;)
                        dispatch(setAwaitingResponse(false))
                        dispatch(setPostOutcome("pass"))
                    }, 1000)
                }
                setTimeout(function() { // after 5s, close the modal
                    dispatch(setRatingModalOpen(false))
                }, 5000)
            }, err => { 
                dispatch(setAwaitingResponse(false))
                dispatch(setPostOutcome("fail"))                
            })

    }
}