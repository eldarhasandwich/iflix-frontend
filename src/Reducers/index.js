import { combineReducers } from 'redux'

import contentRating from './contentRating'
import userSession from './userSession'

const rootReducer = combineReducers({
    contentRating,
    userSession
})

export default rootReducer