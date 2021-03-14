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

  const [filters, setFilters] = useState([])

  useEffect(() => {
    let filtered = questionsData
    // eslint-disable-next-line no-restricted-syntax
    for (const filter of filters) {
      if (filter === 'incorrect') {
        filtered = filtered.filter((questionData) => !questionData.correct)
      }
    }
    setFilteredQuestionsData(filtered)
  }, [filters, questionsData])

  return (
    <div className="mt-6 w-full mb-16">
      <p
        className="text-center text-white text-4xl my-4"
        onClick={() => setFilters(['incorrect'])}
      >
        Questions
      </p>

      <div className="flex flex-col w-full space-y-8">
        {filteredQuestionsData.map((questionData) => questionData.component)}
      </div>
    </div>
  )
}
