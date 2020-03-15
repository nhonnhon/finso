import axios from 'axios'
import { Alert } from 'actions/common'
import { Lang } from 'constants/language'
import { baseURL } from 'constants/temp'

function customFetch(serviceName, method, body = {}) {
  const options = {
    method,
    baseURL: baseURL,
    url: serviceName,
    timeout: 6000000,
  }

  if (method === 'GET') {
    options.params = body
  } else if (method === 'POST') {
    options.data = {
      ...body,
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(response => {
        const data = response.data
        const status = response.status
        if (status === 200) {
          resolve(data)
        } else {
          Alert(Lang.somethingWentWrong, '', [{ text: Lang.ok }])
        }
      })
      .catch(error => {
        Alert(Lang.somethingWentWrong, '', [{ text: Lang.ok }])
        reject(error)
      })
  })
}

function get(serviceName, method = 'GET', body) {
  return customFetch(serviceName, method, body)
}

export default { get }
