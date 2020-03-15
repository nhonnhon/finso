import React from 'react'
import { Button, Input } from 'components'
import { Lang } from 'constants/language'
import { Alert } from 'actions/common'
import Validation from 'services/validation'
import Storage, { storageKey } from 'services/storage'
import _ from 'lodash'

class Register extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
  }

  onChangeInput = (id, value) => {
    this.setState({
      [id]: value,
    })
  }

  register = () => {
    const { name, username, password } = this.state
    const { toggleForm } = this.props

    const validateSources = [
      {
        checker: Validation.checkers.name,
        value: name,
      },
      {
        checker: Validation.checkers.username,
        value: username,
      },
      {
        checker: Validation.checkers.requiredPassword,
        value: password,
      },
    ]

    const invalidateInfo = Validation.getInvalidValidationFrom(validateSources)

    if (invalidateInfo) {
      Alert(invalidateInfo.title, invalidateInfo.message, [{ text: Lang.ok }])
    } else {
      let usersList = Storage.getItem(storageKey.USERS) || []

      const checkUserNameIsExisted = usersList.find(user => user.username === username)
      if (_.isEmpty(checkUserNameIsExisted)) {
        usersList.push({ name: name, username: username, password: password })
        Storage.setItem(storageKey.USERS, usersList)
        Alert(Lang.registerSuccess, '', toggleForm)
      } else {
        Alert(Lang.userNameisExisted)
      }
    }
  }

  render() {
    const { name, username, password } = this.state
    const { toggleForm } = this.props

    return (
      <div className="pt-3 pb-3">
        <Input
          id="name"
          value={name}
          type="text"
          className="flex1 mb-2"
          onChangeId={this.onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.name}
        />
        <Input
          id="username"
          value={username}
          type="text"
          className="flex1 mb-2"
          onChangeId={this.onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.username}
        />
        <Input
          id="password"
          value={password}
          type="password"
          password={true}
          className="flex1 mb-2"
          onChangeId={this.onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.password}
        />
        <Button
          color="green"
          size="small"
          className="mt-2 mr-1"
          onClick={this.register}
          textColor="white"
          label={Lang.register}
        />
        <Button
          color="green"
          size="small"
          className="mt-2"
          onClick={toggleForm}
          textColor="white"
          label={Lang.iWantToLogin}
        />
      </div>
    )
  }
}

export default Register
