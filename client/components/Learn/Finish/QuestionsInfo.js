import React, { useMemo } from 'react'
import QuestionCard from './QuestionCard'

export default function QuestionsInfo({ questions }) {
  const questionsData = useMemo(() => {
    const data = []
    for (const question of questions) {
      const correct =
        question.answerState.selectedAnswer === undefined
          ? false
          : question.question.answers[question.answerState.selectedAnswer]
              .correct
      data.push(
        <QuestionCard
          key={question.questionIndex}
          userInput={question}
          correct={correct}
        />
      )
    }
    return data
  }, [questions])

  return (
    <div className="mt-6 w-full mb-16">
      <p className="text-center text-white text-4xl my-4">Questions</p>

      <div className="flex flex-col w-full space-y-8">{questionsData}</div>
    </div>
  )
}
