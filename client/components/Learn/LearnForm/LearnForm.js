import React, { useState, useEffect } from 'react'
import firebase from '~/client/firebase/Firebase'
import Card from '../../common/Card'
import Container from '../../common/Container'
import Loading from '../../common/Loading'
import SelectQuestionSets from './SelectQuestionSets'
import SelectSubject from './SelectSubject'

export default function LearnForm({
  selectedSubject,
  setSelectedSubject,
  selectedQuestionSets,
  setSelectedQuestionSets,
  setView,
}) {
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

  const submit = async () => {
    setView('quiz')
  }

  switch (subjects) {
    case undefined:
      return <Loading />
    default:
      return (
        <Container col className="mb-16 text-center">
          <SelectSubject
            subjects={subjects}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
          {selectedSubject && (
            <Card
              cardObject={selectedSubject}
              href={`/subjects/${selectedSubject.id}`}
              margin="m-0"
              openInNewTab
            />
          )}
          <SelectQuestionSets
            selectedSubject={selectedSubject}
            selectedQuestionSets={selectedQuestionSets}
            setSelectedQuestionSets={setSelectedQuestionSets}
          />
          {selectedQuestionSets.length > 0 && (
            <div
              onClick={submit}
              className="mt-4 p-6 text-xl rounded-2xl cursor-pointer shadow-xl hover:opacity-75 transition duration-300 items-center justify-center text-white bg-app-purple"
            >
              Quiz yourself on these question set(s)
            </div>
          )}
        </Container>
      )
  }
}
