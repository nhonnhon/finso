import React from 'react'
import { create } from 'react-test-renderer'
import Modal from '../Modal'

describe('Modal component', () => {
  test('Matches the snapshot', () => {
    const modal = create(<Modal />)
    expect(modal.toJSON()).toMatchSnapshot()
  })
})
