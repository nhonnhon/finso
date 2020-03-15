import { Lang } from 'constants/language'
import _ from 'lodash'

const checkers = {
  name: {
    check: value => /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(value),
    invalidInfo: () => ({
      title: Lang.incorrect,
      message: Lang.validateName,
    }),
  },
  username: {
    check: value => /^[0-9a-zA-Z]+$/.test(value),
    invalidInfo: () => ({
      title: Lang.incorrect,
      message: Lang.validateUserName,
    }),
  },
  requiredPassword: {
    check: value => value != '',
    invalidInfo: () => ({
      title: Lang.incorrect,
      message: Lang.validatePassword,
    }),
  },
}

/**
 *
 * @param {*} source
 * soures is an array of validation source object
 * soure contain 3 properties 'type' 'value' 'comparevalue'
 */
function getInvalidValidationFrom(sources = []) {
  const result = _.compact(sources).find(
    ({ checker, value, compareValue }) => !checker.check(value, compareValue),
  )

  if (result) {
    const invalidInfo = result.checker.invalidInfo()
    return invalidInfo
  }

  return null
}

export default { checkers, getInvalidValidationFrom }
