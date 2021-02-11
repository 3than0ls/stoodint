import React, { useState } from 'react'
import Label from '../../common/Label'
import Seperator from '../../common/Seperator'
import AnswerInputs from './AnswerInputs'
import CorrectAnswerInput from './CorrectAnswerInput'

export default function AnswerInput({ register, clearErrors, errors }) {
  const [answerNum, setAnswerNum] = useState(2)

  const answers = () => {
    return [...Array(answerNum).keys()].map((num) => (
      <AnswerInputs key={num} register={register} errors={errors} index={num} />
    ))
  }

  const increaseAnswers = () => {
    clearErrors() // this line doesnt do what i want it to do :(
    setAnswerNum(Math.min(answerNum + 1, 6))
  }
  const decreaseAnswers = () => {
    clearErrors() // this line doesnt do what i want it to do :(
    setAnswerNum(Math.max(answerNum - 1, 2))
  }

  return (
    <div className="flex flex-col mt-4">
      <Label label="Answers" />
      {answers()}
      <div className="w-full flex justify-center text-sm">
        <button
          className={`my-4 mr-4 p-4 rounded-2xl transition duration-300 focus:outline-none ${
            answerNum >= 6
              ? 'bg-app-light-gray cursor-default'
              : 'bg-app-light-blue-1 hover:bg-opacity-75'
          }`}
          onClick={increaseAnswers}
        >
          Add another answer (maximum of 6)
        </button>
        <button
          className={`my-4 p-4 rounded-2xl transition duration-300 focus:outline-none ${
            answerNum <= 2
              ? 'bg-app-light-gray cursor-default'
              : 'bg-app-light-blue-1 hover:bg-opacity-75'
          }`}
          onClick={decreaseAnswers}
        >
          Remove an answer (minimum of 2)
        </button>
      </div>
      <Seperator />
      <CorrectAnswerInput answerNum={answerNum} register={register} />
    </div>
  )
}
