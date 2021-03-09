import React from 'react'
import AnswerBox from './AnswerBox'

export default function AnswerList({ answersList, highlighted = undefined }) {
  const generateAnswers = () => {
    const answers = []
    for (const [index, answerMap] of answersList.entries()) {
      answers.push({
        correct: answerMap.correct,
        component:
          highlighted === undefined ? (
            <AnswerBox key={index} index={index} answerMap={answerMap} />
          ) : (
            <AnswerBox
              key={index}
              highlighted={highlighted === index}
              index={index}
              answerMap={answerMap}
            />
          ),
      })
    }

    if (highlighted) {
      answers.sort((answer) => (answer.correct ? -1 : 1))
    } else {
      answers.sort((_, index) => (index === highlighted ? -1 : 1))
    }
    return answers.map((answer) => answer.component)
  }
  return (
    <div className="w-full flex flex-col items-center mt-4">
      {generateAnswers()}
    </div>
  )
}
