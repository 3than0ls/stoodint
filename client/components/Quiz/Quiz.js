import React, { useState, useReducer } from 'react'
import Container from '../common/Container'
import CountdownTimer from './CountdownTimer'
import Question from './Question/Question'

export default function Quiz({
  selectedAnswers,
  questions,
  setSelectedAnswers,
}) {
  window.addEventListener('beforeunload', function (e) {
    ;(e || window.event).returnValue = 'Changes you made may not be saved.' //Gecko + IE
    return
  })

  const [countdownStart] = useState(1)
  const [countdownNumber, countdown] = useReducer(
    (state) => Math.max(state - 1, -1),
    countdownStart
  )

  return countdownNumber === -1 ? (
    <Container variant col>
      <Question
        setSelectedAnswers={setSelectedAnswers}
        selectedAnswers={selectedAnswers}
        question={questions[1]}
      />
    </Container>
  ) : (
    <CountdownTimer
      countdownStart={countdownStart}
      countdownNumber={countdownNumber}
      countdown={countdown}
    />
  )
}
