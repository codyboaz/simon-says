import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import PatternPreview from './components/PatternPreview'
import AnswerBlocks from './components/AnswerBlocks'

const colors = [{ color: 'red', id: 0 }, { color: 'blue', id: 1 }, { color: 'green', id: 2 }, { color: 'yellow', id: 3 }]

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pattern: [],
      answers: [],
      difficulty: 4,
      gameResults: null
    }

    this.setPattern = this.setPattern.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.gameResult = this.gameResult.bind(this)

  }
  componentDidMount() {
    this.setPattern()
  }
  setPattern() {
    const pattern = new Set;
    while (pattern.size < this.state.difficulty) {
      const randomNumber = Math.floor(Math.random() * this.state.difficulty)
      pattern.add(randomNumber)
    }
    this.setState({
      pattern: Array.from(pattern),
      loading: false
    })
  }
  handleAnswer(answer) {
    if (this.state.pattern.length === this.state.answers.length + 1) {
      this.gameResult([...this.state.answers, answer])
    }
    this.setState(({ answers }) => {
      return {
        answers: [...answers, answer]
      }
    })
  }
  gameResult(answer) {
    if (JSON.stringify(this.state.pattern) === JSON.stringify(answer)) {
      this.setState({
        gameResults: 'Congrats!'
      })
    } else {
      this.setState({
        gameResults: 'Sorry, try again!'
      })
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='game-board'>
          <div className='pattern-section'>
            <PatternPreview pattern={this.state.pattern} colors={colors} />
          </div>
          <div className='answer-section'>
            <AnswerBlocks colors={colors} handleAnswer={this.handleAnswer} />
          </div>
        </div>
        {this.state.gameResults && (
          <div className='results'>
            {this.state.gameResults}
          </div>
        )}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)