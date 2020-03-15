import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    password: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    customStyle: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    type: 'text',
    readonly: false,
    onChange: () => {},
    onBlur: () => {},
    value: '',
  }

  state = {
    stateValue: this.props.value,
    focus: false,
    type: this.props.password ? 'password' : 'text',
  }

  clear = () => {
    this.setState({ stateValue: '' })
  }

  focus = () => {
    this.setState({ focus: true })
  }

  handleChange = e => {
    const { id, onChange, onChangeId } = this.props
    if (!this.readonly) {
      const value = e.target.value

      onChange && onChange(value)
      onChangeId && onChangeId(id, value)
      this.setState({ stateValue: value })
    }
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  handleBlur = () => {
    this.setState({ focus: false })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onEnter && this.props.onEnter()
    }
  }

  render() {
    const { stateValue, type, focus } = this.state
    const { id, label, icon, disabled, className, placeholder, value } = this.props

    return (
      <div className={`sc-input-container ${className || ''} ${label ? '' : 'no-label'}`}>
        {label && <div className={`label text small ${disabled ? 'disabled' : ''}`}>{label}</div>}
        <div className="d-flex align-left flex1">
          {icon && <img className="mar-right-sm extra-icon" src={icon} alt="" />}
          <div className={`input-container ${focus ? 'focus' : ''}`}>
            <input
              key={id}
              autoFocus={this.props.autoFocus}
              value={value || stateValue}
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              ref={node => (this.input = node)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Input
