import React, { useState } from 'react'
import Label from '../../common/Form/Label'
import Seperator from '../../common/Seperator'
import AnswerInputs from './AnswerInputs'
import CorrectAnswerInput from './CorrectAnswerInput'

export default function AnswerInput({ setValue, register, errors }) {
  const [answerNum, setAnswerNum] = useState(2)

  const answers = () =>
    [...Array(answerNum).keys()].map((num) => (
      <AnswerInputs
        setValue={setValue}
        key={num}
        initCorrect={num === 0 ? true : false}
        register={register}
        errors={errors}
        index={num}
      />
    ))

  const increaseAnswers = (e) => {
    e.stopPropagation()
    setAnswerNum(Math.min(answerNum + 1, 6))
  }
  const decreaseAnswers = (e) => {
    e.stopPropagation()
    setAnswerNum(Math.max(answerNum - 1, 2))
  }

  return (
    <div className="flex flex-col mt-4">
      <Label label="Answers" />
      {answers()}
      <div className="w-full flex justify-center text-sm">
        <div
          className={`cursor-pointer my-4 mr-4 p-4 rounded-2xl transition duration-300 focus:outline-none ${
            answerNum >= 6
              ? 'bg-app-light-gray cursor-not-allowed'
              : 'bg-app-light-blue-1 hover:bg-opacity-75'
          }`}
          onClick={increaseAnswers}
        >
          Add another answer (maximum of 6)
        </div>
        <div
          className={`cursor-pointer my-4 p-4 rounded-2xl transition duration-300 focus:outline-none ${
            answerNum <= 2
              ? 'bg-app-light-gray cursor-not-allowed'
              : 'bg-app-light-blue-1 hover:bg-opacity-75'
          }`}
          onClick={decreaseAnswers}
        >
          Remove an answer (minimum of 2)
        </div>
      </div>
    </div>
  )
}
