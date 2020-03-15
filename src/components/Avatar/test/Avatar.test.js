import React from 'react'
import { create } from 'react-test-renderer'
import Avatar from '../Avatar'

describe('Avatar component', () => {
  test('Matches the snapshot', () => {
    const avatar = create(<Avatar color="white" size="big" />)
    expect(avatar.toJSON()).toMatchSnapshot()
  })
})
