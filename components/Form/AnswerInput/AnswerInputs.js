import React, { useState } from 'react'

export default function AnswerInputs({ register, index, errors }) {
  return (
    <div className="flex flex-col w-5/6 mx-auto mt-2">
      {errors.answers && errors.answers[index] && (
        <div className="text-app-blue-2 text-left">This field is required</div>
      )}
      <textarea
        name={`answers[${index}]`}
        placeholder={`Enter answer ${index + 1} here`}
        ref={register({ required: true })}
        className="rounded-lg bg-gray-100 hover:bg-gray-200 outline-none transition p-2 border-2 border-gray-600"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  )
}
