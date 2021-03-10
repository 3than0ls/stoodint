import React from 'react'
import { Icon } from '../../../common/Icon'

export default function AnswerBox({ index, answerMap, highlighted }) {
  const { correct, answer } = answerMap
  return (
    <div className="mx-4 mb-4 w-full text-lg flex flex-row rounded-xl shadow-lg bg-white">
      <div
        className={`flex-grow p-4 ${
          highlighted === null
            ? correct
              ? 'bg-app-green text-white'
              : 'bg-red-500 text-white'
            : highlighted
            ? 'bg-yellow-300 text-black'
            : 'bg-white text-black'
        } rounded-l-xl lg:rounded-r-none bg-opacity-90 break-words max-w-full`}
      >
        {`${index + 1} - ${answer}`}
      </div>
      <div
        className={`md:mx-3 lg:mx-6 min-w-min p-2 flex items-center justify-center`}
      >
        <Icon
          name={correct ? 'check' : 'x'}
          color={correct ? '#5d5' : '#f55'}
        />
      </div>
    </div>
  )
}
