import React, { useContext } from 'react'
import Banner from '../common/Banner'
import Container from '../common/Container'
import Seperator from '../common/Seperator'
import QuestionSetGrid from './QuestionSetGrid'
import authContext from '~/client/context/auth-context'
import TextCreateButton from '../common/TextCreateButton'
import NoValues from '../common/NoValues'
import OptionsBar from './OptionBar'

export default function Subject({ subject }) {
  const { image, name, description, authorID, questionSets, id } = subject
  const loggedIn = useContext(authContext)
  return (
    <Container col className="mt-2 pb-16">
      <p className="text-4xl text-white w-full text-center mb-6">Subject</p>
      <Banner
        src={image.downloadURL}
        name={`${name} ${subject.private ? '[Privated]' : ''}`}
        bottomText={`subjectID: ${id} | authorID: ${authorID}`}
        description={description}
      />
      <OptionsBar subject={subject} />
      <Seperator />

      {questionSets.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          <p className="mt-2 md:mt-5 text-white text-xl md:text-3xl xl:text-4xl">
            {`${name}'s Question Sets`}
          </p>
          {loggedIn && (
            <TextCreateButton
              href={`/subjects/${subject.id}/create`}
              createValue="question set"
            />
          )}
          <QuestionSetGrid subject={subject} questionSets={questionSets} />
        </div>
      ) : (
        <NoValues
          valueType="questionSets"
          createHref={`/subjects/${subject.id}/create`}
        />
      )}
    </Container>
  )
}
