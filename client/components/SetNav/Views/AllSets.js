import React from 'react'
import BackButton from '../BackButton'
import SetCard from '../SetCard'

export default function AllSets({ view, questionSets, setView, loggedIn }) {
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
      className={`${
        view === 'sets'
          ? 'opacity-100 translation-y-0'
          : 'opacity-0 -translate-y-64 pointer-events-none'
      } transition transform duration-500 w-full z-0 absolute flex flex-col pb-16 bg-app-gray`}
    >
      <BackButton setView={setView} />
      <div className="w-full flex flex-row justify-evenly flex-wrap mt-2">
        {generateSetCards()}
      </div>
    </div>
  )
}
