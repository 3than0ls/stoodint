import React, { useEffect, useMemo, useState } from 'react'
import QuestionCard from './QuestionCard'

export default function QuestionsInfo({ questions }) {
  const [filteredQuestionsData, setFilteredQuestionsData] = useState([])

  const questionsData = useMemo(() => {
    const data = questions.map((question) => {
      const correct =
        question.answerState.selectedAnswer === undefined
          ? false
          : question.question.answers[question.answerState.selectedAnswer]
              .correct
      return {
        correct,
        component: (
          <QuestionCard
            key={question.questionIndex}
            userInput={question}
            correct={correct}
          />
        ),
      }
    })
    setFilteredQuestionsData(data)
    return data
  }, [questions])

  const [filter, setFilter] = useState(false)

  useEffect(() => {
    if (filter) {
      setFilteredQuestionsData(
        questionsData.filter((questionData) => !questionData.correct)
      )
    } else {
      setFilteredQuestionsData(questionsData)
    }
  }, [filter, questionsData])

  return (
    <div className="mt-6 w-full mb-16 flex flex-col items-center">
      <p className="text-center text-white text-4xl my-4">Questions</p>
      <button
        className="text-center mb-4 bg-app-blue-2 rounded-2xl p-4 hover:bg-opacity-75 focus:outline-none transition text-white"
        onClick={() => setFilter(!filter)}
      >
        {!filter
          ? 'Only show questions that were answered incorrectly'
          : 'Show all questions'}
      </button>
      <div className="flex flex-col w-full space-y-8">
        {filteredQuestionsData.map((questionData) => questionData.component)}
      </div>
    </div>
  )
}
