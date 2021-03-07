import React, { useState } from 'react'
import Answer from './Answer'

export default function Answers({
  questionIndex,
  answers,
  selectedAnswers,
  setSelectedAnswers,
  nextQuestion,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(undefined) // used to update component, doesnt actually keep track of anything

  const setGlobalSelectedAnswer = (answerIndex) => {
    if (selectedAnswers[questionIndex].selectedAnswer !== answerIndex) {
      setSelectedAnswer(answerIndex) // update child answer components
      selectedAnswers[questionIndex].selectedAnswer = answerIndex
    } else {
      setSelectedAnswer(undefined) // update child answer components
      selectedAnswers[questionIndex].selectedAnswer = undefined
    }
    setSelectedAnswers(selectedAnswers)
  }
  return (
    <>
      <div
        className={`grid ${
          answers % 2 === 0 ? 'lg:grid-cols-2' : ''
        } auto-rows-fr gap-y-2 lg:gap-y-4 w-full mb-8`}
      >
        {answers.map((answer, index) => (
          <Answer
            key={index}
            answerIndex={index}
            answer={answers[index]}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setGlobalSelectedAnswer}
            questionIndex={questionIndex}
          />
        ))}
      </div>
      <div
        onClick={() => {
          setSelectedAnswer(undefined)
          nextQuestion()
        }}
        id={`nextQuestionButton${questionIndex}`}
        className="mb-16 px-24 py-4 cursor-pointer text-white bg-app-purple rounded-2xl shadow-xl hover:bg-opacity-90 hover:scale-105 transform transition ease-in-out duration-500"
      >
        {selectedAnswer !== undefined
          ? 'Next question'
          : 'Continue without answering'}
      </div>
    </>
  )
}
