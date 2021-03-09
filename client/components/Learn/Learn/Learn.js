import React, { useEffect, useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import shuffleArray from '~/client/utils/shuffle'
import Loading from '../../common/Loading'
import Quiz from '../../Quiz/Quiz'
import Finish from '../Finish'
import StartInfo from './StartInfo'

export default function Learn({ setView, subject, questionSets }) {
  const [subView, setSubView] = useState('loading')

  const [questions, setQuestions] = useState([])
  let [selectedAnswers, setSelectedAnswers] = useState([])

  useEffect(() => {
    // questionSets shouldnt be able to changed after this view is rendered, but i'll add it as a dependency anyways
    async function getQuestions() {
      let flattenedAnswerList = []
      let flattenedQuestionList = []
      for (const questionSet of questionSets) {
        let questionSetQuestions = await firebase.getQuestions(
          subject.id,
          questionSet.id
        )
        questionSetQuestions.forEach((question, questionIndex) => {
          // add empty answer, could honestly just be simplified into one value rather than this dumb object
          flattenedAnswerList.push({
            selectedAnswer: undefined /* an answerIndex */,
          })

          if (question.image) {
            // preload image
            new Image().src = question.image.downloadURL
          }
          shuffleArray(question.answers)
          console.log(question)

          flattenedQuestionList.push({
            completionTime: undefined,
            answerState: flattenedAnswerList[questionIndex],
            question,
          })
        })
      }

      shuffleArray(flattenedQuestionList)

      flattenedQuestionList = flattenedQuestionList.map((question, index) => ({
        questionIndex: index,
        ...question,
      }))

      setSelectedAnswers(flattenedAnswerList)
      setQuestions(flattenedQuestionList)
    }
    getQuestions()
    setSubView('quiz')
    // setSubView('finish')
  }, [questionSets])

  switch (subView) {
    case 'loading':
      return <Loading />
    case 'start':
      return <StartInfo />
    case 'finish':
      return (
        <Finish
          subject={subject}
          questionSets={questionSets}
          questions={questions}
        />
      )
    default:
      /* quiz */
      return (
        <Quiz
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          questions={questions}
          setQuestions={setQuestions}
          setSubView={setSubView}
        />
      )
  }
}
