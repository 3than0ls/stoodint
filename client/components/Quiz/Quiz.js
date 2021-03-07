import React, { useState, useReducer } from 'react'
import Container from '../common/Container'
import CountdownTimer from './CountdownTimer'
import Question from './Question/Question'
import TopBar from './TopBar'

export default function Quiz({
  selectedAnswers,
  questions,
  setSubView,
  setSelectedAnswers,
}) {
  window.addEventListener('beforeunload', function (e) {
    ;(e || window.event).returnValue = 'Changes you made may not be saved.' //Gecko + IE
    return
  })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setSubView('finish')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const [countdownStart] = useState(1)
  const [countdownNumber, countdown] = useReducer(
    (state) => Math.max(state - 1, -1),
    countdownStart
  )

  return countdownNumber === -1 ? (
    <Container variant col>
      <Container col className="justify-start">
        <TopBar
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          nextQuestion={nextQuestion}
        />
        <Question
          setSelectedAnswers={setSelectedAnswers}
          selectedAnswers={selectedAnswers}
          question={questions[currentQuestionIndex]}
          nextQuestion={nextQuestion}
        />
      </Container>
    </Container>
  ) : (
    <CountdownTimer
      countdownStart={countdownStart}
      countdownNumber={countdownNumber}
      countdown={countdown}
    />
  )
}
