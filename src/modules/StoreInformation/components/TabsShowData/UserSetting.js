import React from 'react'
import { connect } from 'react-redux'
import { changeKeyword } from 'actions'
import { Button, Input, Dropdown } from 'components'
import { Lang } from 'constants/language'
import { Alert } from 'actions/common'
import Validation from 'services/validation'
import Storage, { storageKey } from 'services/storage'
import { listKeywords } from 'constants/temp'

class UserSettings extends React.Component {
  saveData = () => {
    const { name, username, password, keywordNews, changeKeyword } = this.props

    const validateSources = [
      {
        checker: Validation.checkers.name,
        value: name,
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

      const getIndexOfUser = usersList.findIndex(user => user.username === username)
      usersList[getIndexOfUser].name = name
      usersList[getIndexOfUser].password = password
      Storage.setItem(storageKey.USERS, usersList)
      changeKeyword(keywordNews)
      Alert(Lang.saveSuccess)
    }
  }

  render() {
    const { keywordNews, name, password, onChangeInput } = this.props

    return (
      <div>
        <Dropdown
          id="keywordNews"
          label={Lang.keywordNews}
          placeholder={Lang.enterHere}
          onChange={({ value }) => onChangeInput('keywordNews', value)}
          options={listKeywords}
          value={keywordNews}
        />
        <Input
          id="name"
          value={name}
          type="text"
          className="flex1 mt-2 mb-2"
          onChangeId={onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.name}
        />
        <Input
          id="password"
          value={password}
          type="password"
          password={true}
          className="flex1 mb-2"
          onChangeId={onChangeInput}
          placeholder={Lang.enterHere}
          label={Lang.password}
        />
        <Button
          color="green"
          size="small"
          className="mt-2"
          onClick={this.saveData}
          textColor="white"
          label={Lang.update}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { changeKeyword },
)(UserSettings)
