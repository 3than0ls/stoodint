import React from 'react'
import SetCard from './SetCard'

export default function SetsGrid({ questionSets }) {
  const generateSetCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
      setCards.push(
        <SetCard key={questionSet.questionSetID} setData={questionSet} />
      )
      setCards.push(
        <SetCard key={questionSet.questionSetID} setData={questionSet} />
      )
      setCards.push(
        <SetCard key={questionSet.questionSetID} setData={questionSet} />
      )
      setCards.push(
        <SetCard key={questionSet.questionSetID} setData={questionSet} />
      )
    }
    return setCards
  }
  return (
    <div
      className={` transition transform duration-500 w-full flex flex-col pb-16 bg-app-gray`}
    >
      <div className="w-full flex flex-row justify-evenly flex-wrap mt-2">
        {generateSetCards()}
      </div>
    </div>
  )
}
