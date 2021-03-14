import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  getTests () {
    return this.props.tests.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.title}
        </option>
      )
    })
  }

  handleInputChange (e) {
    this.props.handleInputChange(e.target.value)
  }

  handleSelectChange (e) {
    this.props.handleSelectChange(e.target.value)
  }

  render () {
    const defaultValue = 'Choose a test'
    const tests = this.getTests()

    return (
      <div className='react-test-app--login'>
        <h1 className='react-test-app--login-title'>React Test App</h1>
        <input
          className={this.props.inputClasses}
          onChange={this.handleInputChange}
          placeholder='Enter your name'
        />
        <select
          className={this.props.selectClasses}
          onChange={this.handleSelectChange}
          defaultValue={defaultValue}
        >
          <option value={defaultValue} disabled>
            {defaultValue}
          </option>
          {tests}
        </select>
        <button
          className='react-test-app--login-button'
          onClick={this.props.onClick}
        >
          Start
        </button>
      </div>
    )
  }
}