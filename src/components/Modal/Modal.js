import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Modal.scss'

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    hideCloseBtn: PropTypes.bool,
  }

  state = {
    isActive: this.props.isActive,
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        isActive: nextProps.isActive,
      },
      () => {
        this.state.isActive
          ? document.querySelector('body').classList.add('modal-open')
          : document.querySelector('body').classList.remove('modal-open')
      }
    )
  }

  close = () => {
    const { onClose } = this.props

    this.setState(
      {
        isActive: false,
      },
      () => {
        document.querySelector('body').classList.remove('modal-open')
        onClose && onClose()
      }
    )
  }

  render() {
    const { className, hideCloseBtn, children } = this.props
    const { isActive } = this.state

    return (
      <div className={`modal ${isActive ? 'modal-open' : ''} ${className ? className : ''}`}>
        <div className="modal-dialog">
          <div className={`modal-content`}>
            {!hideCloseBtn && (
              <div className="cancel-btn-modal" onClick={this.close}>
                <div className="close-button">X</div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
