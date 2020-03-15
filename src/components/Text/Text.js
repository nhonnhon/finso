import React from 'react'
import PropTypes from 'prop-types'

import './Text.scss'

const Text = props => {
  const { value, className, children } = props
  const classNames = `text ${className || ''}`
  return (
    <p {...props} className={classNames}>
      {children || value}
    </p>
  )
}

Text.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Text
