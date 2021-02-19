import React from 'react'
import AnswerBox from './AnswerBox'

export default function AnswerList({ elementID, answersList }) {
  const generateAnswers = () => {
    const answers = []
    for (const [index, answerMap] of answersList.entries()) {
      answers.push({
        correct: answerMap.correct,
        component: (
          <AnswerBox key={index} index={index} answerMap={answerMap} />
        ),
      })
    }

    answers.sort((answer) => (answer.correct ? -1 : 1))
    return answers.map((answer) => answer.component)
  }
  return (
    <div className="w-full flex flex-col items-center mt-4">
      {generateAnswers()}
    </div>
  )
}
