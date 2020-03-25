import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import hackerNewsReducer from './ducks/hackerNewsReducer'
import mediumReducer from './ducks/mediumReducer'
import redditReducer from './ducks/redditReducer'

const rootReducer = combineReducers({
    hackerNews: hackerNewsReducer,
    medium: mediumReducer,
    reddit: redditReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))