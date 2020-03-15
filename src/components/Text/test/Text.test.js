import React from 'react'
import { create } from 'react-test-renderer'
import Text from '../Text'

describe('Text component', () => {
  test('Matches the snapshot', () => {
    const text = create(<Text />)
    expect(text.toJSON()).toMatchSnapshot()
  })
})
