
import * as request from 'superagent'
import config from '../config'

export function retrieveRating (contentId) {
    return (dispatch, getState) => {

        request
            .get(config.api + "/rating/" + contentId)
            .then(function(res) {
                if (!res) {

                } else {
                    dispatch({
                        type: "PULL_CONTENT_RATING", 
                        rating: res
                    })
                }
            })

    }
}

export function postUserRating (_userId, _contentId, _rating) {
    return (dispatch, getState) => {
        console.log("sending http request")
        request
            .post(config.api + "/rating")
            .query({
                userId: _userId,
                contentId: _contentId,
                rating: _rating
            })
            .then(function(res) {
                if (!res) {

                } else {

                }
            })

    }
}