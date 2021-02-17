import React from 'react'
import Banner from '../common/Banner'
import Container from '../common/Container'
import Seperator from '../common/Seperator'
import NoQuestionSets from './NoQuestionSets'
import CreateButton from '../common/CreateButton'
import QuestionSetGrid from './QuestionSetGrid'
import Link from 'next/link'

export default function Subject({ subject }) {
  const { bannerImage, name, description, authorID, questionSets, id } = subject
  const route = `${subject.id}/create`
  return (
    <Container col={true} className="mt-2 pb-16">
      <Banner
        src={bannerImage}
        name={name}
        bottomText={`subjectID: ${id} | authorID: ${authorID}`}
        description={description}
      />
      <Seperator />
      {questionSets ? (
        <div className="w-full flex flex-col items-center">
          <p className="mt-2 md:mt-5 text-white text-xl md:text-3xl xl:text-4xl">
            {`${name}'s Question Sets`}
          </p>
          {true && (
            <div className="mt-4 md:mt-8 flex flex-col items-center">
              <Link href={route}>
                <a className="text-lg shadow-2xl cursor-pointer rounded-2xl py-5 px-12 bg-app-green md:text-xl lg:text-2xl text-white hover:opacity-75 transition duration-300">
                  Create a new question set
                </a>
              </Link>
            </div>
          )}
          <QuestionSetGrid subject={subject} questionSets={questionSets} />
        </div>
      ) : (
        <NoQuestionSets subject={subject} />
      )}
    </Container>
  )
}
