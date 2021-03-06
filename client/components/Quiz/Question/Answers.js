import React, { useState } from 'react'
import Answer from './Answer'

export default function Answers({
  questionIndex,
  answers,
  selectedAnswers,
  setSelectedAnswers,
}) {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const [selectedAnswer, setSelectedAnswer] = useState(
    selectedAnswers[questionIndex].selectedAnswer
  ) // used to update component, doesnt actually keep track of anything
  const setGlobalSelectedAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex) // update child answer components

    selectedAnswers[questionIndex].selectedAnswer = answerIndex
    setSelectedAnswers(selectedAnswers)
    // forceUpdate()
  }

  return (
    <div
      className={`grid ${
        answers % 2 === 0 ? 'lg:grid-cols-2' : ''
      } auto-rows-fr gap-y-4 w-full mb-12`}
    >
      {answers.map((answer, index) => (
        <Answer
          key={answer.index}
          answerIndex={index}
          answer={answers[index]}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setGlobalSelectedAnswer}
        />
      ))}
    </div>
  )
}
