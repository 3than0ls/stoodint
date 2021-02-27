import React, { useState, useEffect } from 'react'
import firebase from '~/client/firebase/Firebase'
import Card from '../../common/Card'
import Container from '../../common/Container'
import Loading from '../../common/Loading'
import SelectQuestionSets from './SelectQuestionSets'
import SelectSubject from './SelectSubject'

export default function LearnForm({ setLearn }) {
  const [subjects, setSubjects] = useState(undefined)
  // fetch all the subjects you can pick from
  useEffect(() => {
    async function getSubjects() {
      try {
        let fetchedSubjects = await firebase.getSubjects()
        setSubjects(fetchedSubjects)
      } catch (err) {
        console.log(err)
        setSubjects([])
      }
    }
    firebase.auth.onAuthStateChanged(getSubjects)
  }, [])

  // select a subject, and then fetch the question sets from that subject
  const [selectedSubject, setSelectedSubject] = useState(undefined)
  const [selectedQuestionSets, setSelectedQuestionSets] = useState(undefined)

  switch (subjects) {
    case undefined:
      return <Loading />
    default:
      return (
        <Container col className="mb-16">
          <div className="w-full flex flex-col lg:flex-row justify-center">
            <SelectSubject
              setSelectedSubject={setSelectedSubject}
              subjects={subjects}
              setSubjects={setSubjects}
            />
            <SelectQuestionSets
              selectedSubject={selectedSubject}
              setSelectedQuestionSets={setSelectedQuestionSets}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-center mt-12">
            <div className="hidden w-full lg:w-1/2 lg:pr-4 lg:flex justify-center">
              {selectedSubject && (
                <Card
                  cardObject={selectedSubject}
                  href={`/subjects/${selectedSubject.id}`}
                  margin="m-0"
                  openInNewTab
                />
              )}
            </div>
            <div className="w-full lg:w-1/2 lg:ml-4 flex items-center justify-center text-white">
              info about question sets selected and submit button here
            </div>
          </div>
        </Container>
      )
  }
}
