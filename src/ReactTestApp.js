import React, { Component } from 'react'
import classNames from 'classnames'
import Login from './components/Login'
import Test from './components/Test'
import Finish from './components/Finish'
import './ReactTestApp.css'

export default class ReactTestApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testState: 'initial',
      tests: [],
      questions: [],
      currentQuestion: 0,
      participantName: '',
      participantNameMissing: false,
      selectedTest: '',
      testNotSelected: false,
      submitLink: 'https://printful.com/test-quiz.php?action=submit&quizId='
    }
      this.requestOptions = { method: 'GET', redirect: 'follow' }
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSelectChange = this.handleSelectChange.bind(this)
      this.startTest = this.startTest.bind(this)
      this.handleNextQuestion = this.handleNextQuestion.bind(this)
      this.handleRetake = this.handleRetake.bind(this)
  }

  componentDidMount () {
    this.getTests()
  }

  getTests () {
    fetch('https://printful.com/test-quiz.php?action=quizzes', this.requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ tests: result })
      })
      .catch((error) => console.log('error', error))
  }

  getQuestions (testID) {
    fetch(`https://printful.com/test-quiz.php?action=questions&quizId=${testID}`, this.requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ questions: result }, () => {
          this.getAnswers()
        })
      })
      .catch((error) => console.log('error', error))
  }

  getAnswers () {
    this.state.questions && this.state.questions.forEach((question) => {
      fetch(`https://printful.com/test-quiz.php?action=answers&quizId=${this.state.selectedTest}&questionId=${question.id}`, this.requestOptions)
        .then((response) => response.json())
        .then((result) => {
          question.answers = result
          this.setState({ dataLoaded: true })
        })
        .catch((error) => console.log('error', error))
    })
  }

  getResult () {
    fetch(this.state.submitLink, this.requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ result: result })
      })
    .catch((error) => console.log('error', error))
  }

  handleInputChange (participantName) {
    this.setState({
      participantName: participantName,
      participantNameMissing: false
    })
  }

  handleSelectChange (selectedTest) {
    this.setState({
      selectedTest: selectedTest,
      testNotSelected: false,
      submitLink: this.state.submitLink + selectedTest
    })
    this.getQuestions(selectedTest)
  }

  startTest () {
    if (!this.state.participantName && !this.state.selectedTest) {
      alert('Please enter your name and select a test!')
      this.setState({
        participantNameMissing: true,
        testNotSelected: true
      })
      return
    } else if (!this.state.participantName && this.state.selectedTest) {
      alert('Please enter your name!')
      this.setState({ participantNameMissing: true })
      return
    } else if (this.state.participantName && !this.state.selectedTest) {
      alert('Please select a test!')
      this.setState({ testNotSelected: true })
      return
    }
    this.setState({ testState: 'testStarted' })
  }

  handleNextQuestion (answer) {
    if (!answer) {
      alert('Please select an answer!')
      return
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      submitLink: this.state.submitLink + '&answers[]=' + answer,
      testState: this.state.currentQuestion + 1 === this.state.questions.length ? 'testFinished' : 'testStarted'
    })
    if (this.state.currentQuestion + 1 === this.state.questions.length) {
      this.getResult()
    }
  }

  handleRetake () {
    this.setState({
      testState: 'initial',
      questions: [],
      currentQuestion: 0,
      participantName: '',
      selectedTest: '',
      submitLink: 'https://printful.com/test-quiz.php?action=submit&quizId='
    })
  }

  getContent () {
    let loginInputClasses = classNames({
      'react-test-app--login-input': true,
      'empty': this.state.participantNameMissing
    })

    let loginSelectClasses = classNames({
      'react-test-app--login-select': true,
      'empty': this.state.testNotSelected
    })

    switch (this.state.testState) {
      case 'initial':
      return (
        <Login
        handleInputChange={this.handleInputChange}
        handleSelectChange={this.handleSelectChange}
        inputClasses={loginInputClasses}
        selectClasses={loginSelectClasses}
        onClick={this.startTest}
        tests={this.state.tests}
        />
      )
      case 'testStarted':
      return (
        this.state.questions.length && this.state.questions[0].answers ?
        <Test
        questions={this.state.questions}
        currentQuestion={this.state.currentQuestion}
        handleNextQuestion={this.handleNextQuestion}
        /> : <div className="react-test-app--data-loading" />
      )
      case 'testFinished':
      return (
        this.state.result ?
        <Finish
        participantName={this.state.participantName}
        result={this.state.result}
        handleRetake={this.handleRetake}
        /> : <div className="react-test-app--data-loading" />
      )
      default:
      return (
        <Login
        handleInputChange={this.handleInputChange}
        handleSelectChange={this.handleSelectChange}
        inputClasses={loginInputClasses}
        selectClasses={loginSelectClasses}
        onClick={this.startTest}
        tests={this.state.tests}
        />
      )
    }
  }

  render () {
    return <div className='react-test-app'>{this.getContent()}</div>
  }
}