import React, { Component } from 'react'

export default class Finish extends Component {
  render () {
    return (
      <div className='react-test-app--finish'>
        <h2 className='react-test-app--finish-title'>
          Thanks, {this.props.participantName}!
        </h2>
        <span className='react-test-app--finish-paragraph'>
          You responded correctly to {this.props.result && this.props.result.correct} out of {this.props.result && this.props.result.total} questions.
        </span>
        <button
          onClick={this.props.handleRetake}
          className='react-test-app--finish-button'
        >
          Retake
        </button>
      </div>
    )
  }
}