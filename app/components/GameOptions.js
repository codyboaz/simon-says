import React from 'react'

export default function GameOptions({ firstLoad, startGame, setDifficulty, difficulty, score }) {
  return (
    <div className='game-options'>
      <h1>Simon Says</h1>
      {firstLoad ? (
        <div>
          <p>Difficulty: {difficulty}</p>
          <button className='btn btn-difficulty' onClick={() => setDifficulty(4)}>Easy (4)</button>
          <button className='btn btn-difficulty' onClick={() => setDifficulty(5)}>Medium (5)</button>
          <button className='btn btn-difficulty' onClick={() => setDifficulty(6)}>Hard (6)</button>
          <button className='btn btn-start' onClick={() => startGame(difficulty)}>Start Game</button>
        </div>
      ) : (
          <div className='score'>Score: {score}</div>
        )}
    </div>
  )
}