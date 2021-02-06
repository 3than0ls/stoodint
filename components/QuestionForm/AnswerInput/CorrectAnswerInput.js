import React from 'react'
import Label from '../../common/Label'

export default function CorrectAnswerInput({ answerNum, register }) {
  return (
    <div className="w-1/4 mx-auto flex flex-col">
      <Label label="Correct Answer index" />
      <select
        className="rounded-lg bg-gray-100 hover:bg-gray-200 outline-none transition p-2 border-2 border-gray-600"
        name="correctAnswerIndex"
        ref={register}
      >
        {[...Array(answerNum).keys()].map((num) => (
          <option key={num} value={num}>{`Answer #${num + 1}`}</option>
        ))}
      </select>
    </div>
  )
}
