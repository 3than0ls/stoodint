import React from 'react'
import SubjectCard from './SubjectCard'

export default function SubjectGrid({ subjects }) {
  const generateCards = () => {
    const cards = []
    for (const subject of subjects) {
      cards.push(<SubjectCard key={subject.id} subject={subject} />)
    }
    return cards
  }
  return (
    <div
      className={` transition transform duration-500 w-full flex flex-col pb-16 bg-app-gray`}
    >
      <div className="w-full flex flex-row justify-evenly flex-wrap mt-2">
        {generateCards()}
      </div>
    </div>
  )
}
