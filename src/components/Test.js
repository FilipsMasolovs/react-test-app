import React, { Component } from 'react'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = { answer: '' }
    this.handleAnswerClick = this.handleAnswerClick.bind(this)
  }

  handleAnswerClick (answer) {
    this.setState({ answer: answer })
  }

  render () {
    return (
      <div className='react-test-app--test'>
        <h2 className='react-test-app--test-question'>
          {this.props.questions[this.props.currentQuestion].title}
        </h2>
        <div className='react-test-app--test-answers'>
          {this.props.questions[this.props.currentQuestion].answers.map(
            (item, i) => {
              return (
                <button
                  onClick={this.handleAnswerClick.bind(this, item.id)}
                  className='react-test-app--test-answer'
                  id={item.id}
                  key={i}
                >
                  {item.title}
                </button>
              )
            }
          )}
        </div>
        <div className='react-test-app--test-progress-bar'>
          <div
            className='react-test-app--test-progress-bar-inner'
            style={{
              width:
                ((this.props.currentQuestion + 1) /
                  this.props.questions.length) *
                  100 +
                '%'
            }}
          />
          <span className='react-test-app--test-progress-bar-data'>
            {this.props.currentQuestion + 1} of {this.props.questions.length}
          </span>
        </div>
        <button
          onClick={this.props.handleNextQuestion.bind(this, this.state.answer)}
          className='react-test-app--test-next-button'
        >
          {this.props.currentQuestion + 1 === this.props.questions.length ? 'Done' : 'Next'}
        </button>
      </div>
    )
  }
}