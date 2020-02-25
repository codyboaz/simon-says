import React from 'react'
import ReactDOM from 'react-dom'
import PatternPreview from './components/PatternPreview'
import AnswerBlocks from './components/AnswerBlocks'
import GameOptions from './components/GameOptions'
import Results from './components/Results'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      colors: [{ color: '#ff1100', id: 0 }, { color: '#0004ff', id: 1 }, { color: '#00ba28', id: 2 }, { color: '#fffb00', id: 3 }],
      pattern: [],
      answers: [],
      difficulty: 4,
      firstLoad: true,
      gameResults: null,
      winner: null,
      score: 0
    }

    this.startGame = this.startGame.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.gameResult = this.gameResult.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.setDifficulty = this.setDifficulty.bind(this)
  }
  setDifficulty(difficulty) {
    this.setState({
      difficulty
    })
  }
  startGame() {
    const pattern = [];
    while (pattern.length < this.state.difficulty) {
      const randomNumber = Math.floor(Math.random() * 4)
      pattern.push(randomNumber)
    }
    console.log(pattern)
    this.setState({
      pattern: pattern,
      firstLoad: false
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
    this.setState({
      pattern: [],
      answers: [],
      gameResults: null,
      winner: null,
    }, () => {
      this.startGame(this.state.difficulty)
    })
  }
  render() {
    return (
      <div className='container'>
        <GameOptions
          firstLoad={this.state.firstLoad}
          difficulty={this.state.difficulty}
          startGame={this.startGame}
          setDifficulty={this.setDifficulty}
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
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)