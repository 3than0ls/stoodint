import React, { useEffect, useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import Loading from '../../common/Loading'
import Quiz from '../../Quiz/Quiz'
import StartInfo from './StartInfo'

export default function Learn({ setView, subject, questionSets }) {
  const [subView, setSubView] = useState('loading')

  const [questions, setQuestions] = useState([])
  let [selectedAnswers, setSelectedAnswers] = useState([])

  useEffect(() => {
    // questionSets shouldnt be able to changed after this view is rendered, but i'll add it as a dependency anyways
    async function getQuestions() {
      const flattenedAnswerList = []
      const flattenedQuestionList = []
      for (const questionSet of questionSets) {
        let questionSetQuestions = await firebase.getQuestions(
          subject.id,
          questionSet.id
        )
        questionSetQuestions.forEach((question, questionIndex) => {
          // add empty answer
          flattenedAnswerList.push({
            questionIndex,
            selectedAnswer: undefined /* an answerIndex */,
          })

          flattenedQuestionList.push({
            questionIndex,
            dirty: false,
            completionTime: undefined,
            answerState: flattenedAnswerList[questionIndex],
            flagged: false,
            /* whatever other sorta properties that need to be aded */ question,
          })
        })
      }
      setSelectedAnswers(flattenedAnswerList)
      setQuestions(flattenedQuestionList)
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
      return (
        <Quiz
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          questions={questions}
          setQuestions={setQuestions}
        />
      )
  }
}
