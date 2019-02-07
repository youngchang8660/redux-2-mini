import axios from 'axios';

const initialState = {
  loading: false,
  articles: []
}

const GET_REDDIT_ARTICLES = 'GET_REDDIT_ARTICLES';

export const getRedditArticles = () => {
  let articles = axios.get('/api/reddit').then(res => res.data);
  return {
    type: GET_REDDIT_ARTICLES,
    payload: articles
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REDDIT_ARTICLES + '_PENDING':
      return { ...state, loading: true }
    case GET_REDDIT_ARTICLES + '_FULFILLED':
      return { loading: false, articles: action.payload }
    default:
      return state;
  }
}