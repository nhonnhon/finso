import {
  GET_DATA_HEADLINES_SUCCESS,
  GET_DATA_NEWS_SUCCESS,
  LOGIN_SUCCESS,
  CHANGE_KEYWORD,
} from 'constants/temp'

const initialState = {
  headlines: {},
  news: {},
  keywordHeadLines: 'techcrunch',
  keywordNews: 'bitcoin',
  user: {},
}

export default function temp(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DATA_HEADLINES_SUCCESS:
      return { ...state, headlines: payload }

    case GET_DATA_NEWS_SUCCESS:
      return { ...state, news: payload }

    case LOGIN_SUCCESS:
      return { ...state, user: payload }

    case CHANGE_KEYWORD:
      return { ...state, keywordNews: payload }

    default:
      return state
  }
}
