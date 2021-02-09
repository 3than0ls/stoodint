import React from 'react'
import SetCard from '../SetCard'

export default function AllSets({ view, questionSets }) {
  const generateSetCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
      setCards.push(<SetCard key={questionSet.name} setData={questionSet} />)
    }
    return setCards
  }
  return (
    <div
      className={`${
        view === 'sets'
          ? 'opacity-100 translation-y-0'
          : 'opacity-0 -translate-y-64 pointer-events-none'
      } transition transform duration-500 w-full z-0 absolute h-32`}
    >
      {generateSetCards()}
    </div>
  )
}
