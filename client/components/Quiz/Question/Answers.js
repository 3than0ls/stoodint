import React, { useState } from 'react'
import Answer from './Answer'

export default function Answers({
  questionIndex,
  answers,
  selectedAnswers,
  setSelectedAnswers,
  nextQuestion,
  setCompletedTime,
  setImage,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(undefined) // used to update component, doesnt actually keep track of anything globally
  const [startTime, setStartTime] = useState(Date.now())

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

  // clears selectedAnswer for next question
  // not sure why this is in here and not in this components parent, question
  const demountCurrentQuestion = () => {
    setCompletedTime(Date.now() - startTime)
    setImage(undefined)
    setStartTime(Date.now())
    setSelectedAnswer(undefined)
    nextQuestion()
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
        onClick={demountCurrentQuestion}
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
