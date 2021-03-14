import React from 'react'
import Question from '~/client/components/Quiz/Question/Question'
import AnswerBox from './AnswerBox'

export default function AnswerList({
  answersList,
  highlighted,
  shuffleAnswers,
}) {
  const generateAnswers = () => {
    const answers = []
    for (const [index, answerMap] of answersList.entries()) {
      answers.push({
        correct: answerMap.correct,
        component:
          highlighted === null ? (
            <AnswerBox
              key={index}
              highlighted={null}
              index={index}
              answerMap={answerMap}
            />
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
    if (shuffleAnswers) {
      answers.sort((answer) => (answer.correct ? -1 : 1))
    }
    return answers.map((answer) => answer.component)
  }
  return (
    <div className="w-full flex flex-col items-center mt-4">
      {generateAnswers()}
    </div>
  )
}
