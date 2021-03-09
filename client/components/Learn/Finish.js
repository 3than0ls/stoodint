import React, { useEffect, useState } from 'react'
import { Circle } from 'rc-progress'
import Container from '../common/Container'
import convertMillsecondToString from '~/client/utils/convertTime'
import convertToGrade from '~/client/utils/convertToGrade'
import Summary from './Finish/Summary'
import QuestionsInfo from './Finish/QuestionsInfo'

export default function Finish({ subject, questionSets, questions }) {
  const [learnStats, setLearnStats] = useState(undefined)

  // process question data and answers into stats
  useEffect(() => {
    const stats = { questionStats: [] }
    questions.forEach((question, index) => {
      const questionStats = {}
      questionStats.correct =
        question.answerState.selectedAnswer === undefined
          ? false
          : question.question.answers[question.answerState.selectedAnswer]
              .correct
      questionStats.questionIndex = question.questionIndex
      questionStats.selectedAnswer = question.answerState.selectedAnswer
      questionStats.question = question.question
      questionStats.completionTime = question.completionTime
      stats.questionStats[question.questionIndex] = questionStats
    })
    stats.completionTime = questions.reduce(
      (accumNum, currentQuestion) => accumNum + currentQuestion.completionTime,
      0
    )

    stats.totalQuestions = questions.length
    stats.averageQuestionTime = stats.completionTime / stats.totalQuestions
    stats.numCorrect = stats.questionStats.filter(
      (questionStat) => questionStat.correct
    ).length
    stats.percentCorrect =
      Math.round((stats.numCorrect / questions.length) * 10000) / 100

    const grade = convertToGrade(stats.percentCorrect)
    stats.grade = grade.grade
    stats.gradeMessage = grade.message

    stats.timestamp = Date.now()

    setLearnStats(stats)
  }, [])

  // should add a switch statement that may put loading view if we use any async/await functions

  return (
    <Container col className="mt-6">
      <div
        className={`w-full max-w-screen-xl flex flex-col md:flex-row md:space-x-5 ${
          learnStats ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        } transform transition duration-1000 ease-in-out`}
      >
        {learnStats && (
          <>
            <div className="relative w-full md:w-1/2 mb-6 md:mb-0">
              <Circle
                className="max-w-lg mx-auto cursor-pointer"
                percent={learnStats.percentCorrect}
                strokeLinecap="round"
                strokeWidth="3"
                trailWidth="1"
                strokeColor="#0dbc79"
              />
              <div className="absolute w-full mx-auto text-center flex flex-col items-center justify-center inset-0 text-white">
                <p
                  className={`text-9xl flex md:text-8xl lg:text-9xl font-semibold text-glow-lg mb-4 ${
                    learnStats.grade.length === 2
                      ? 'transform translate-x-2'
                      : ''
                  }`}
                >
                  {learnStats.grade}
                </p>
                <p className="text-3xl md:text-xl lg:text-3xl mb-4">
                  {learnStats.percentCorrect}% correct
                </p>
              </div>
            </div>
            <div className="text-white w-full md:w-1/2 flex flex-col items-center justify-center py-4 text-center">
              <p className="text-2xl lg:text-3xl text-app-blue-3 mb-4">
                Congragulations on completion!
              </p>
              <p className="text-3xl lg:text-5xl mb-4">
                You got a {learnStats.grade}. {learnStats.gradeMessage}
              </p>
              <p className="text-md lg:text-xl mb-6 mx-4">
                You spent a total of{' '}
                <span className="font-semibold text-glow-sm text-app-purple">
                  {convertMillsecondToString(learnStats.completionTime).string}
                </span>{' '}
                on this quiz and{' '}
                <span className="font-semibold text-glow-sm text-app-purple">
                  {
                    convertMillsecondToString(learnStats.averageQuestionTime)
                      .string
                  }
                </span>{' '}
                seconds per question.
              </p>
              <p className="text-2xl lg:text-4xl mb-4">
                You answered {learnStats.numCorrect} out of {questions.length}{' '}
                correctly.
              </p>
            </div>
          </>
        )}
      </div>
      {learnStats && (
        <>
          <Summary
            questionSets={questionSets}
            subject={subject}
            learnStats={learnStats}
          />
          <QuestionsInfo questions={questions} />
        </>
      )}
    </Container>
  )
}
