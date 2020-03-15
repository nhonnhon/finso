import { isUndefined } from 'lodash'
const SInfo = window.localStorage

function getItem(key) {
  const strValue = SInfo.getItem(key)
  return strValue && strValue !== undefined && strValue !== 'undefined' ? JSON.parse(strValue) : undefined
}

function setItem(key, value) {
  const checkedValue = value === '' || isUndefined(value) ? value : JSON.stringify(value)

  return SInfo.setItem(key, checkedValue)
}

function deleteItem(key) {
  return SInfo.removeItem(key)
}

export default { getItem, setItem, deleteItem }
export const storageKey = {
  USERS: 'USER_FINSO',
}
