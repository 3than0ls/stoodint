import React, { useEffect, useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import shuffleArray from '~/client/utils/shuffle'
import Loading from '../../common/Loading'
import Quiz from '../../Quiz/Quiz'
import Finish from '../Finish'
import StartInfo from './StartInfo'

export default function Learn({ subject, questionSets }) {
  const [subView, setSubView] = useState('loading')

  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])

  useEffect(() => {
    // questionSets shouldnt be able to changed after this view is rendered, but i'll add it as a dependency anyways
    let questionCounter = 0
    async function getQuestions() {
      const flattenedAnswerList = []
      let flattenedQuestionList = []
      for (const questionSet of questionSets) {
        // eslint-disable-next-line no-await-in-loop
        const questionSetQuestions = await firebase.getQuestions(
          subject.id,
          questionSet.id
        )
        questionSetQuestions.forEach((question) => {
          // add empty answer, could honestly just be simplified into one value rather than this dumb object
          flattenedAnswerList.push({
            selectedAnswer: undefined /* an answerIndex */,
          })

          if (question.image) {
            // preload image
            new Image().src = question.image.downloadURL
          }

          if (question.shuffleAnswers) {
            shuffleArray(question.answers)
          }

          flattenedQuestionList.push({
            completionTime: undefined,
            // questionIndex shouldnt be used in text because it is then shuffled and indexes are not in order and only in linking arrays, questionIdentifiers or questionKeys are a better name for this
            questionIndex: questionCounter,
            answerState: flattenedAnswerList[questionCounter],
            question,
          })
          questionCounter += 1
        })
      }

      shuffleArray(flattenedQuestionList)

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
