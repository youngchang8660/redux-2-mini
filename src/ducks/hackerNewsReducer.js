import axios from "axios";

const initialState = {
  loading: false,
  articles: []
}

const GET_ARTICLES = 'GET_ARTICLES';

export const getHackerArticles = () => {
  let articles = axios.get('/api/hacker-news').then(res => res.data);
  return {
    type: GET_ARTICLES,
    payload: articles
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES + '_PENDING':
      return { ...state, loading: true }
    case GET_ARTICLES + '_FULFILLED':
      return { loading: false, articles: action.payload }
    default:
      return state;
  }
}