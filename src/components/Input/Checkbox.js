import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Checkbox.scss'

class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    blocked: PropTypes.bool,
    children: PropTypes.node,
    text: PropTypes.string,
    center: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    color: PropTypes.string,
    onCheck: PropTypes.func,
  }

  static defaultProps = {
    color: '',
    blocked: false,
  }

  toggle = e => {
    e.stopPropagation()
    this.props.onCheck()
  }

  render() {
    const { children, text, center, className, id, color, blocked, checked } = this.props
    const statusHold = checked ? 'checked' : ''
    const status = blocked ? 'blocked' : statusHold
    return (
      <div
        className={`checkbox ${status} ${className || ''}`}
        style={{ alignItems: center ? 'center' : '' }}
        onClick={this.toggle}
      >
        <div className="icon" />
        <input className="hide" id={id} type="checkbox" />
        {text ? (
          <label className={`pad-left ${color}`} htmlFor={id}>
            {text}
          </label>
        ) : (
          <label className={`pad-left ${color}`} htmlFor={id}>
            <div className={`content`}>{children}</div>
          </label>
        )}
      </div>
    )
  }
}

export default Checkbox
