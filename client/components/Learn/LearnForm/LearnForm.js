import React, { useState, useEffect, useCallback } from 'react'
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

  const submit = useCallback(async () => {
    // console.log('subject', selectedSubject)
    // console.log('question set(s)', selectedQuestionSets) // map and flatten into list of questions and setLearn() it
    let questionsList = []
    document.body.style.cursor = 'wait'
    for (const questionSet of selectedQuestionSets) {
      // questionSet in selectedQuestionSets originates from firebase getSubject(), which doesn't fetch questions subcollection in questionSets
      // we must fetch the questions using getQuestionSets
      let questions = await firebase.getQuestions(
        selectedSubject.id,
        questionSet.id
      )
      questionsList = [...questionsList, ...questions]
    }
    document.body.style.cursor = 'initial'
    console.log(questionsList)
    setLearn(questionsList)
  })

  switch (subjects) {
    case undefined:
      return <Loading />
    default:
      return (
        <Container col className="mb-16 text-center">
          <SelectSubject
            setSelectedSubject={setSelectedSubject}
            subjects={subjects}
            setSubjects={setSubjects}
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
            setSelectedQuestionSets={setSelectedQuestionSets}
          />
          {selectedQuestionSets && (
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
