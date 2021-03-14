import React, { useContext, useState, useEffect } from 'react'
import authContext from '~/client/context/auth-context'
import { Icon } from '../../common/Icon'
import AnswerList from './Answer/AnswerList'
import QuestionOptions from './QuestionOptions'

export default function QuestionCard({
  refreshQuestionSet,
  subjectID,
  questionSetID,
  questionID,
  questionMap,
  index,
}) {
  const { loggedIn } = useContext(authContext)
  const { question, answers, image, shuffleAnswers } = questionMap
  const elementID = `${questionID}-${index}`
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(window.location.hash === `#${elementID}`)
  }, [])
  return (
    <div
      id={elementID}
      className="w-full mb-6 shadow-xl rounded-2xl p-4 xl:p-6 bg-app-blue-2 text-white"
    >
      <div
        className="cursor-pointer w-full flex flex-row justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <p className="text-2xl lg:text-3xl w-full mr-4 truncate">
          {`${index} - ${question}`}
        </p>
        <div className="hover:opacity-75 transition duration-300">
          <Icon name={open ? 'upChevron' : 'downChevron'} />
        </div>
      </div>
      {open && (
        <>
          <hr className="w-full my-3" />
          <div className="w-full flex flex-col break-words items-center">
            <p className="text-lg w-full">{question}</p>
            {image && (
              <a
                href={image.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={image.downloadURL}
                  alt="image"
                  className="bg-white object-contain max-h-96"
                />
              </a>
            )}
            <AnswerList
              answersList={answers}
              highlighted={null}
              shuffleAnswers={shuffleAnswers}
            />
            <QuestionOptions
              refreshQuestionSet={refreshQuestionSet}
              subjectID={subjectID}
              questionSetID={questionSetID}
              questionID={questionID}
              question={question}
              loggedIn={loggedIn}
              elementID={elementID}
            />
          </div>
        </>
      )}
    </div>
  )
}
