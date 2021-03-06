import React from 'react'
import { Icon } from '../../common/Icon'

export default function Answer({
  answerIndex,
  answer,
  selectedAnswer,
  setSelectedAnswer,
}) {
  return (
    <div
      onClick={() => {
        setSelectedAnswer(answerIndex)
      }}
      className={`w-full cursor-pointer rounded-2xl py-3 pl-3 lg:py-4 lg:pl-4 text-md xl:text-lg
       break-words max-h-32 flex relative hover:text-white hover:translate-x-2 md:hover:translate-x-4 transform transition duration-300 ease-in-out ${
         selectedAnswer === answerIndex
           ? 'bg-app-blue-3'
           : 'bg-app-blue-2 bg-opacity-90'
       }`}
    >
      <div className="text-2xl lg:text-3xl xl:text-4xl hidden">
        {answerIndex + 1}
      </div>
      <p className="flex-grow flex overflow-y-auto pr-16">{answer.answer}</p>
      <div className="w-16 text-white absolute right-0 inset-y-0 flex justify-center items-center">
        <Icon
          name="selected"
          selected={selectedAnswer === answerIndex}
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}
