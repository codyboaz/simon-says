import React from 'react'

export default function Block({ answerId, handleAnswer }) {
  return (
    <div
      className='block'
      tabIndex={answerId + 1}
      onClick={() => handleAnswer(answerId)}
    ></div>
  )
}