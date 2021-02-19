import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '~/client/context/auth-context'
import NoValues from '../common/NoValues'
import Container from '../common/Container'
import Banner from '../common/Banner'
import TextCreateButton from '../common/TextCreateButton'
import QuestionsList from './QuestionsList/QuestionsList'
import OptionsBar from './OptionBar'
import Seperator from '../common/Seperator'

export default function Questions({ questionSet, subjectID }) {
  const { loggedIn } = useContext(AuthContext)
  const router = useRouter()

  const {
    bannerImage,
    name,
    description,
    authorID,
    questions,
    id,
  } = questionSet
  const createHref = `/subjects/${subjectID}/${questionSet.id}/create`

  return (
    <Container col className="mt-2 pb-16">
      <p className="text-4xl text-white w-full text-center mb-6">Subject</p>
      <Banner
        src={bannerImage}
        name={`${name} ${questionSet.private ? '[Privated]' : ''}`}
        bottomText={`QuestionSetID: ${id} | authorID: ${authorID}`}
        description={description}
      />
      <OptionsBar questionSet={questionSet} subjectID={subjectID} />
      <Seperator />
      {Object.keys(questions).length > 0 ? (
        <>
          <TextCreateButton createValue="question" href={createHref} />
          <QuestionsList
            subjectID={subjectID}
            questionSetID={id}
            questions={questions}
          />
        </>
      ) : (
        <NoValues valueType="questions" createHref={createHref} />
      )}
    </Container>
  )
}
