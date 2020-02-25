import React from 'react'

export default function Results({ gameResults, winner, resetGame }) {
  return (
    <React.Fragment>
      {gameResults && (
        <div className='results'>
          {gameResults}
          {winner ?
            <button className='btn btn-reset' onClick={() => resetGame()}>Play Again</button>
            :
            <button className='btn btn-reset' onClick={() => resetGame()}>Try Again</button>
          }
        </div>
      )}
    </React.Fragment>
  )
}