import React, { useEffect, useState } from 'react'
import NoSets from './NoSets'
import SetCard from './SetCarousel/SetCard'
import SetCarousel from './SetCarousel/SetCarousel'
import CreateSetCard from './SetCarousel/CreateSetCard'
import SetForm from './SetForm/SetForm'
import MakeNewSet from './MakeNewSet'

export default function SetsNav({ questionSets }) {
  const [view, setView] = useState('') // default empty '' (pick an option following), sets (list all sets), create new (make new set)
  useEffect(() => console.log(view), [view])

  const generateSetCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
      setCards.push(<SetCard key={questionSet.name} setData={questionSet} />)
    }
    setCards.push(
      <CreateSetCard key={'create'} onClick={() => setView('createNewSet')} />
    )
    return setCards
  }
  return questionSets.length > 0 ? (
    <div className="w-full flex flex-col items-center justify-evenly mt-8 lg:mt-16 xl:mt-20">
      <SetCarousel generateSetCards={generateSetCards} />
      <div
        className={`relative w-full text-center  ${
          view ? 'overflow-y-visible' : 'overflow-y-hidden'
        }`}
      >
        <div
          className={`${
            view === 'createNewSet'
              ? 'opacity-100 translation-y-0'
              : 'opacity-0 translate-y-64 pointer-events-none'
          } transition transform duration-500 w-full absolute bg-app-gray`}
        >
          <MakeNewSet />
        </div>
      </div>
    </div>
  ) : (
    <NoSets />
  )
}
