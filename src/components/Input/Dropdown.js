import { map, isFunction, find } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'components'
import { Scrollbars } from 'react-custom-scrollbars'
import './Dropdown.scss'

class Dropdown extends Component {
  static propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    renderOption: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    width: PropTypes.string, //in row
    value: PropTypes.any,
    customStyle: PropTypes.object,
  }

  static defaultProps = {
    // placeholder: 'Please select',
    renderOption: null,
    width: 'auto', //in row
    onChange: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      showOptions: false,
      selectedOption: { value: '', label: '' },
      selectedItem: this.props.placeholder,
    }

    this.dropdownRef = React.createRef()
  }

  componentDidMount() {
    const nextOption = find(this.props.options, { value: this.props.value })
    if (nextOption) {
      this.setState({ selectedOption: nextOption })
    }

    const el = this.dropdownRef.current

    el.addEventListener('focusout', () => {
      this.setState({
        showOptions: false,
      })
    })
  }

  componentDidUpdate() {
    if (this.props.value && this.props.value !== this.state.selectedOption.value) {
      const nextOption = find(this.props.options, { value: this.props.value })
      if (nextOption) {
        this.setState({ selectedOption: nextOption })
      } else {
        this.setState({ selectedOption: { value: '', label: '' } })
      }
    }
  }

  get value() {
    return this.state.selectedOption.value
  }

  toggle = () => {
    this.setState(prevState => ({ showOptions: !prevState.showOptions }))
  }

  selectItem = selectedOption => {
    this.setState({ selectedOption })
    this.toggle()
    if (this.props.onChange) this.props.onChange(selectedOption)
  }

  renderOption = option => {
    return (
      <div className="dropdown-option">
        <Text>{option.label}</Text>
      </div>
    )
  }

  render() {
    const { showOptions, selectedOption } = this.state
    const { label, placeholder, className, icon, options, renderOption, width, customStyle } = this.props
    const renderOptionFunc = isFunction(renderOption) ? renderOption : this.renderOption
    const classNames = `dropdown ${showOptions ? 'is-open' : ''}`

    return (
      <div style={{ width }} className={classNames} tabIndex="-1" ref={this.dropdownRef}>
        <Text className="small label">{label}</Text>
        <div onClick={this.toggle} style={customStyle} className={`dropdown-header ${className || ''}`}>
          <div className="row align-left">
            {icon && <img className="mar-right-sm extra-icon" src={icon} alt="" />}
            <div>
              <Text className={`medium  ${selectedOption.value ? 'text-dark' : 'text-placeholder'}`}>
                {selectedOption.value ? selectedOption.label : placeholder}
              </Text>
            </div>
          </div>
          <img className="arrow" src={require('assets/images/icons/collapsible-arrow.svg')} alt="" />
        </div>
        <div className="dropdown-content">
          <Scrollbars autoHeight>
            {map(options, option => {
              return (
                <div
                  onClick={() => {
                    this.selectItem(option)
                  }}
                  key={option.value}
                >
                  {renderOptionFunc(option)}
                </div>
              )
            })}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default Dropdown
