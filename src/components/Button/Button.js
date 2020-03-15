import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const textMapper = {
  white: 'white',
  gray: 'gray',
  black: 'black',
}

const Button = props => {
  const { label, size, color, className, children, onClick, link, textColor, bold } = props

  const classNames = `btn  ${size || ''} ${color || ''} ${className || ''}`

  return (
    <a href={link || 'javascript: void(0)'} className={classNames} onClick={onClick}>
      {children ? (
        children
      ) : (
        <span className={`text ${bold === true ? 'bold' : ''} ${textColor || textMapper[color]} ${size}`}>
          {label}
        </span>
      )}
    </a>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'big']),
  color: PropTypes.oneOf(['white', 'black', 'gray', 'gray1', 'green', 'transparent']),
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
}

Button.defaultProps = {
  className: '',
  color: '',
}

export default Button
