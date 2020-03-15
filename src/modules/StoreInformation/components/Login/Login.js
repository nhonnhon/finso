import React from 'react'
import { connect } from 'react-redux'
import { login } from 'actions'
import { Button, Input } from 'components'
import { Lang } from 'constants/language'
import { Alert } from 'actions/common'
import Storage, { storageKey } from 'services/storage'
import _ from 'lodash'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChangeInput = (id, value) => {
    this.setState({
      [id]: value,
    })
  }

  login = () => {
    const { username, password } = this.state

    if (username === '' || password === '') {
      Alert(Lang.typeUserNameAndPassword)
    } else {
      let usersList = Storage.getItem(storageKey.USERS) || []

      const checkUserNameInLocal = usersList.find(
        user => user.username === username && user.password === password,
      )

      if (_.isEmpty(checkUserNameInLocal)) {
        Alert(Lang.incorrectUnserNameAndPassword)
      } else {
        this.props.login(checkUserNameInLocal)
        this.props.loginSuccess()
      }
    }
  }

  render() {
    const { username, password } = this.state
    const { toggleForm } = this.props

    return (
      <div className="pt-3 pb-3">
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
          password
          type="password"
          className="flex1 mb-2"
          onChangeId={this.onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.password}
        />
        <Button
          color="green"
          size="small"
          className="mt-2 mr-1"
          onClick={this.login}
          textColor="white"
          label={Lang.login}
        />
        <Button
          color="green"
          size="small"
          className="mt-2"
          onClick={toggleForm}
          textColor="white"
          label={Lang.dontHaveAccount}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { login },
)(Login)
