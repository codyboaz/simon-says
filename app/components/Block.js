import React from 'react'

export default function Block({ answerId, handleAnswer }) {
  return (
    <div className='block' onClick={() => handleAnswer(answerId)}></div>
  )
}