import React from 'react'
import { Icon } from '../../../common/Icon'

export default function AnswerBox({ index, answerMap }) {
  const { correct, answer } = answerMap
  return (
    <div className="mx-4 mb-4 w-full text-lg flex flex-row rounded-xl shadow-lg bg-white">
      <div
        className={`w-full lg:w-11/12 p-4 ${
          correct ? 'bg-app-green' : 'bg-red-500'
        } rounded-l-xl rounded-r-xl lg:rounded-r-none bg-opacity-90 break-words max-w-full`}
      >
        {`${index + 1} - ${answer}`}
      </div>
      <div className="hidden w-1/12 p-2 lg:flex flex-col items-center justify-center">
        <Icon
          name={correct ? 'check' : 'x'}
          color={correct ? '#5d5' : '#f55'}
        />
      </div>
    </div>
  )
}
