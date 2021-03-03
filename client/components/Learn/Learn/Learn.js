import React, { useEffect, useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import Loading from '../../common/Loading'
import StartInfo from './StartInfo'

export default function Learn({ setView, subject, questionSets }) {
  const [subView, setSubView] = useState('loading')

  const [unansweredQuestions, setUnansweredQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  useEffect(() => {
    // questionSets shouldnt be able to changed after this view is rendered, but i'll add it as a dependency anyways
    async function getQuestions() {
      const flattenedQuestionList = []
      for (const questionSet of questionSets) {
        let questionSetQuestions = await firebase.getQuestions(
          subject.id,
          questionSet.id
        )
        flattenedQuestionList.push(
          ...questionSetQuestions.map((question) => ({
            correct: undefined,
            completionTime: undefined,
            /* whatever other sorta properties that need to be aded */ question,
          }))
        )
      }
      setUnansweredQuestions(flattenedQuestionList)
    }
    getQuestions()
    setSubView('quiz')
  }, [questionSets])

  const [learnStats, setLearnStats] = useState({})

  switch (subView) {
    case 'loading':
      return <Loading />
    case 'start':
      return <StartInfo />
    default:
      /* quiz */
      return <div>hello</div>
  }
}
