import React from 'react'
import Container from '../common/Container'
import Seperator from '../common/Seperator'
import SubjectForm from './SubjectForm'

export default function CreateSubject() {
  return (
    <Container col={true}>
      <p className="mx-auto text-4xl lg:text-5xl xl:text-6xl mt-6 mb-3 text-app-green">
        Create a new Subject of questions
      </p>
      <Seperator />
      <SubjectForm />
    </Container>
  )
}
