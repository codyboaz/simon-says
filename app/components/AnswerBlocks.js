import React from 'react'
import Block from './Block'

export default function AnswerBlocks({ colors, handleAnswer }) {
  return (
    <React.Fragment>
      {colors.map((color) => (
        <Block
          key={color.id}
          answerId={color.id}
          handleAnswer={handleAnswer} />
      ))}
    </React.Fragment>
  )
}