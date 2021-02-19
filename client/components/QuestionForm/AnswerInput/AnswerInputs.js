import React, { useState, useEffect } from 'react'
import { Icon } from '../../common/Icon'

export default function AnswerInputs({
  setValue,
  initCorrect,
  register,
  index,
  errors,
}) {
  const [correct, setCorrect] = useState(initCorrect)
  useEffect(() => {
    setValue(`answers[${index}].correct`, correct)
  }, [])
  const toggleCorrect = () => {
    setValue(`answers[${index}].correct`, !correct)
    setCorrect(!correct)
  }
  return (
    <div className="flex flex-col w-11/12 mx-auto mt-2">
      {errors.answers && errors.answers[index] && (
        <div className="text-app-blue-2 text-left">This field is required</div>
      )}
      <div className="flex h-auto items-center">
        <input
          name={`answers[${index}].answer`}
          placeholder={`Enter answer ${index + 1} here`}
          ref={register({ required: true })}
          className="rounded-l-lg flex-grow bg-gray-100 h-32 hover:bg-gray-200 outline-none transition p-3 border-t-2 border-b-2 border-l-2 border-gray-600"
          autoComplete="off"
          autoCorrect="off"
        />
        <div
          onClick={toggleCorrect}
          ref={register({
            name: `answers[${index}].correct`,
          })}
          className={`cursor-pointer relative overflow-hidden ${
            correct ? 'bg-app-green' : 'bg-red-500'
          } w-16 h-32 rounded-r-xl border-t-2 border-b-2 border-r-2 border-gray-600 transition duration-300`}
        >
          <div
            className={`${
              correct ? '' : '-translate-y-32'
            } absolute w-full h-full flex items-center justify-center hover:opacity-75 transform transition duration-300`}
          >
            <Icon name="check" color="#0f0" />
          </div>
          <div
            className={`${
              !correct ? '' : 'translate-y-32'
            } absolute w-full h-full flex items-center justify-center hover:opacity-75 transform transition duration-300`}
          >
            <Icon name="exit" color="#700" />
          </div>
        </div>
      </div>
    </div>
  )
}
