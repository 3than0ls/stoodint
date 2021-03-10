import React from 'react'
import Container from '../../common/Container'
import QuestionCard from './QuestionCard'

export default function QuestionsList({
  subjectID,
  questionSetID,
  questions,
  refreshQuestionSet,
}) {
  return (
    <Container col className="my-8">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          refreshQuestionSet={refreshQuestionSet}
          subjectID={subjectID}
          questionSetID={questionSetID}
          questionID={question.id}
          questionMap={question}
          index={index + 1}
        />
      ))}
    </Container>
  )
}
