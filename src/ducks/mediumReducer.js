import axios from 'axios';

const initialState = {
  loading: false,
  articles: []
}

const GET_MEDIUM_ARTICLES = 'GET_MEDIUM_ARTICLES';

export const getMediumArticles = () => {
  let articles = axios.get('/api/medium').then(res => res.data);
  return {
    type: GET_MEDIUM_ARTICLES,
    payload: articles
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDIUM_ARTICLES + '_PENDING':
      return { ...state, loading: true }
    case GET_MEDIUM_ARTICLES + '_FULFILLED':
      return { loading: false, articles: action.payload }
    default:
      return state;
  }
}