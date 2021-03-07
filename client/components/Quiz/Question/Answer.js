import React from 'react'
import { Icon } from '../../common/Icon'

export default function Answer({
  answerIndex,
  answer,
  selectedAnswer,
  setSelectedAnswer,
  questionIndex,
}) {
  return (
    <div
      onClick={() => {
        document
          .getElementById(`nextQuestionButton${questionIndex}`)
          .scrollIntoView({ behavior: 'smooth' })
        setSelectedAnswer(answerIndex)
      }}
      className={`w-full cursor-pointer rounded-2xl py-4 pl-3 lg:pl-4 text-md xl:text-lg break-words max-h-32 flex relative 
       text-white hover:translate-x-2 md:hover:translate-x-4 active:scale-99
       transform transition duration-300 ease-in-out ${
         selectedAnswer === answerIndex
           ? 'bg-app-blue-3'
           : 'bg-app-blue-2 bg-opacity-90 hover:bg-app-light-blue-3 hover:text-black'
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
          color="#FFF"
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}
