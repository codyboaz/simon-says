import React from 'react'

export default function GameInfo({ firstLoad, startGame, score }) {
  return (
    <div className='game-options'>
      <h1>Simon Says</h1>
      {firstLoad ? (
        <button className='btn btn-start' onClick={() => startGame()}>Start Game</button>
      ) : (
          <div className='score'>Score: {score}</div>
        )}
    </div>
  )
}