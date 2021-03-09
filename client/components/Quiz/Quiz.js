import React, { useState, useReducer } from 'react'
import Container from '../common/Container'
import Loading from '../common/Loading'
import CountdownTimer from './CountdownTimer'
import Question from './Question/Question'
import TopBar from './TopBar'

export default function Quiz({
  selectedAnswers,
  questions,
  setSubView,
  setQuestions,
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

  const setCompletedTime = (questionIndex) => {
    const wrapped = (time) => {
      questions[questionIndex].completionTime = time
      setQuestions(questions)
    }
    return wrapped
  }

  const [countdownStart] = useState(3)
  const [countdownNumber, countdown] = useReducer(
    (state) => Math.max(state - 1, -1),
    countdownStart
  )

  switch (questions.length) {
    case 0:
      return <Loading />
    default:
      return countdownNumber === -1 || true ? (
        <Container variant col>
          <Container col className="justify-start">
            <TopBar
              currentQuestionIndex={currentQuestionIndex}
              questionsLength={questions.length}
            />
            <Question
              setSelectedAnswers={setSelectedAnswers}
              selectedAnswers={selectedAnswers}
              setCompletedTime={setCompletedTime}
              question={questions[currentQuestionIndex]}
              nextQuestion={nextQuestion}
              setCompletedTime={setCompletedTime(currentQuestionIndex)}
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
}
