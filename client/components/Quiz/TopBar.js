import React from 'react'
import { Line } from 'rc-progress'

export default function TopBar({ questionsLength, currentQuestionIndex }) {
  return (
    <div className="w-full h-10 mx-4 mb-2 lg:mb-4 flex items-center">
      <Line
        percent={(currentQuestionIndex / questionsLength) * 100}
        strokeLinecap="round"
        strokeWidth="0.4"
        trailWidth="0.2"
        strokeColor="#49baeb"
      />
      <div className="text-white text-xl px-3 ml-4">
        <span className="text-app-light-blue-3">{currentQuestionIndex}</span>
        <span className="mx-2">/</span>
        {questionsLength}
      </div>
    </div>
  )
}
