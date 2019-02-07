import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddlware from 'redux-promise-middleware';
import hackerNewsReducer from './ducks/hackerNewsReducer';
import mediumReducer from './ducks/mediumReducer';
import redditReducer from './ducks/redditReducer';

const rootReducer = combineReducers({ hackerNewsReducer, mediumReducer, redditReducer })
const middleware = applyMiddleware(promiseMiddlware)

export default createStore(rootReducer, middleware)