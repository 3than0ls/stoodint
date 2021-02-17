import React from 'react'
import Container from '../common/Container'
import Seperator from '../common/Seperator'
import QuestionSetForm from './QuestionSetForm'
// import QuestionSetForm from './QuestionSetForm'

export default function CreateQuestionSet({ subject }) {
  return (
    <Container col={true}>
      <p className="mx-auto text-4xl lg:text-5xl xl:text-6xl mt-6 mb-3 text-app-green">
        Create a new question set for {subject.name}
      </p>
      <Seperator />
      <QuestionSetForm subject={subject} />
    </Container>
  )
}
{
  /* <QuestionSetForm /> */
}
