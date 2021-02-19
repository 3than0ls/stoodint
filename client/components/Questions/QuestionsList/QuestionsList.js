import React from 'react'
import Container from '../../common/Container'
import QuestionCard from './QuestionCard'

export default function QuestionsList({ subjectID, questionSetID, questions }) {
  const generateQuestionList = () => {
    const questionCards = []
    for (const [key, question] of Object.entries(questions)) {
      questionCards.push({
        order: question.order,
        component: (orderIndex) => (
          <QuestionCard
            key={key}
            subjectID={subjectID}
            questionSetID={questionSetID}
            questionID={key}
            questionMap={question}
            index={orderIndex}
          />
        ),
      })
    }

    return questionCards
      .sort((a, b) => b.order - a.order)
      .map((obj, i) => obj.component(i + 1))
  }
  return (
    <Container col className="my-8">
      {generateQuestionList()}
    </Container>
  )
}
