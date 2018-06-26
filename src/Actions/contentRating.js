
import * as request from 'superagent'
import config from '../config'

import * as UserSessionActions from './userSession'

export function setRatingModalOpen (isOpen) {
    return {
        type: "SET_RATING_MODAL_OPEN", 
        value: isOpen
    }
}

// export function setContentRating (contentRating) {
//     return {
//         type: "SET_CONTENT_RATING", 
//         contentRating: contentRating
//     }
// }

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
            .then(function(res) {
                if (!res) {
                    console.log("cant get average rating??")
                } else {
                    console.log(res)
                    dispatch(UserSessionActions.updateContentAverageRating(contentId, res.body.rating))
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
            .timeout({ // If server takes more than 5s to respond, timeout
                response: 5000
            })
            .then(res => {
                dispatch(setAwaitingResponse(false))
                if (!res || res.body.response !== "success") { // if post failed, display false outcome
                    dispatch(setPostOutcome("fail"))
                } else { // if successful, display true outcome
                    dispatch(retrieveRating(_contentId))
                    dispatch(setPostOutcome("pass"))
                }
                setTimeout(function() { // after 3s, close the modal
                    dispatch(setRatingModalOpen(false))
                    dispatch(setPostOutcome(null))
                }, 3000)
            }, err => { 
                dispatch(setAwaitingResponse(false))
                dispatch(setPostOutcome("fail"))                
            })

    }
}