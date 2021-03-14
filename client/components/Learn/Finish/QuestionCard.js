import React, { useState } from 'react'
import { Icon } from '../../common/Icon'
import AnswerList from '../../Questions/QuestionsList/Answer/AnswerList'

export default function QuestionCard({ userInput, correct }) {
  const { answerState } = userInput
  const { image, question, answers, shuffleAnswers } = userInput.question

  const [open, setOpen] = useState(false)
  return (
    <div
      className={`w-full shadow-xl rounded-2xl p-4 xl:p-6 ${
        !correct ? 'bg-red-400' : 'bg-app-green '
      }  text-white`}
    >
      <div
        className="cursor-pointer h-full w-full flex flex-row justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <p className="text-2xl lg:text-3xl w-full mr-4 truncate">{question}</p>
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
          </div>
          <AnswerList
            answersList={answers}
            shuffleAnswers={shuffleAnswers}
            highlighted={answerState.selectedAnswer}
          />
        </>
      )}
    </div>
  )
}
