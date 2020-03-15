import { Alert } from './common'
import { Lang } from 'constants/language'
import Api from 'services/api'
import EndPoint from 'configs/EndPoint'
import {
  GET_DATA_HEADLINES_SUCCESS,
  GET_DATA_NEWS_SUCCESS,
  LOGIN_SUCCESS,
  CHANGE_KEYWORD,
  APIKey,
} from 'constants/temp'

const getDataNewsWithKeyWord = keyword => {
  return dispatch => {
    Api.get(EndPoint.everything, 'GET', {
      q: keyword,
      apiKey: APIKey,
    })
      .then(data => {
        if (data) {
          dispatch({
            type: GET_DATA_NEWS_SUCCESS,
            payload: data,
          })
        }
      })
      .catch(() => {
        Alert(Lang.somethingWentWrong, '', [{ text: Lang.ok }])
      })
  }
}

const getDataHeadLinesWithKeyWord = keyword => {
  return dispatch => {
    Api.get(EndPoint.topHeadlines, 'GET', {
      sources: keyword,
      apiKey: APIKey,
    })
      .then(data => {
        if (data) {
          dispatch({
            type: GET_DATA_HEADLINES_SUCCESS,
            payload: data,
          })
        }
      })
      .catch(() => {
        Alert(Lang.somethingWentWrong, '', [{ text: Lang.ok }])
      })
  }
}

const login = data => {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
  }
}

const changeKeyword = keyword => {
  return dispatch => {
    dispatch({
      type: CHANGE_KEYWORD,
      payload: keyword,
    })
    dispatch(getDataNewsWithKeyWord(keyword))
  }
}

export { getDataNewsWithKeyWord, getDataHeadLinesWithKeyWord, changeKeyword, login }
