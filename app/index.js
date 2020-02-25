import React from 'react'
import ReactDOM from 'react-dom'
import PatternPreview from './components/PatternPreview'
import AnswerBlocks from './components/AnswerBlocks'
import GameInfo from './components/GameInfo'
import Results from './components/Results'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      colors: [{ color: '#ff1100', id: 0 }, { color: '#0004ff', id: 1 }, { color: '#00ba28', id: 2 }, { color: '#fffb00', id: 3 }],
      pattern: [],
      answers: [],
      firstLoad: true,
      gameResults: null,
      winner: null,
      score: 0
    }

    this.startGame = this.startGame.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.gameResult = this.gameResult.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.nextGame = this.nextGame.bind(this)
  }
  startGame() {
    // used a set to get 4 unique values
    const pattern = new Set();
    while (pattern.size < 4) {
      const randomNumber = Math.floor(Math.random() * 4)
      pattern.add(randomNumber)
    }
    this.setState({
      pattern: Array.from(pattern),
      firstLoad: false
    })
  }
  handleAnswer(answer) {
    // check game results if pattern length is equal to answers length
    if (this.state.pattern.length === this.state.answers.length + 1) {
      this.gameResult([...this.state.answers, answer])
    } else {
      this.setState(({ answers }) => {
        return {
          answers: [...answers, answer]
        }
      })
    }
  }
  gameResult(answer) {
    if (JSON.stringify(this.state.pattern) === JSON.stringify(answer)) {
      this.setState((prevState) => {
        return {
          gameResults: 'Congrats!',
          winner: true,
          score: prevState.score + 1
        }
      })
    } else {
      this.setState({
        gameResults: 'Sorry, try again!',
        winner: false,
        score: 0
      })
    }
  }
  resetGame() {
    // used callback setState to make sure new game is initialized correctly
    this.setState({
      pattern: [],
      answers: [],
      gameResults: null,
      winner: null,
    }, () => {
      this.startGame()
    })
  }
  nextGame() {
    // Make sure the last color in the pattern is not equal to the next one
    let findNextColor = true
    let nextColor = []
    while (findNextColor) {
      const randomNumber = Math.floor(Math.random() * 4)
      if (randomNumber !== this.state.pattern[this.state.pattern.length - 1]) {
        nextColor.push(randomNumber)
        findNextColor = false
      }
    }
    this.setState((prevState) => {
      return {
        pattern: [...prevState.pattern, ...nextColor],
        answers: [],
        gameResults: null,
        winner: null
      }
    })
  }
  render() {
    return (
      <div className='container'>
        <GameInfo
          firstLoad={this.state.firstLoad}
          difficulty={this.state.difficulty}
          startGame={this.startGame}
          score={this.state.score}
        />
        <div className='game-board'>
          <div className='pattern-section'>
            <PatternPreview
              pattern={this.state.pattern}
              colors={this.state.colors}
              score={this.state.score}
              winner={this.state.winner}
            />
          </div>
          <div className='answer-section'>
            <AnswerBlocks
              handleAnswer={this.handleAnswer}
              colors={this.state.colors}
            />
          </div>
        </div>
        <Results
          gameResults={this.state.gameResults}
          winner={this.state.winner}
          resetGame={this.resetGame}
          nextGame={this.nextGame}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)