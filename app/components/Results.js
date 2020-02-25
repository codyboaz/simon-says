import React from 'react'

export default function Results({ gameResults, winner, resetGame, nextGame }) {
  return (
    <React.Fragment>
      {gameResults && (
        <div className='results'>
          {gameResults}
          {winner ?
            <button className='btn btn-reset' onClick={() => nextGame()}>Next Level</button>
            :
            <button className='btn btn-reset' onClick={() => resetGame()}>Try Again</button>
          }
        </div>
      )}
    </React.Fragment>
  )
}