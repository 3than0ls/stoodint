import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoSets from './SetForm/NoSets'
import SetCard from './SetCard'
import SetCarousel from './SetCarousel'
import MakeNewSet from './MakeNewSet'
import NewSetButton from './NewSetButton'
import CreateSetCard from './CreateSetCard'

export default function SetsNav({ questionSets }) {
  const generateSetCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
      setCards.push(<SetCard key={questionSet.name} setData={questionSet} />)
      setCards.push(<SetCard key={questionSet.name} setData={questionSet} />)
    }
    setCards.push(<CreateSetCard onClick={() => console.log('clicked')} />)
    return setCards
  }
  return questionSets.length > 0 ? (
    // <div className="w-full flex flex-col items-center justify-evenly mt-8 lg:mt-16 xl:mt-20">
    //   <SetCarousel generateSetCards={generateSetCards} />
    // </div>
    <NoSets />
  ) : (
    <NoSets />
  )
}

/* 
      <div className="mt-4 lg:mt-10 xl:mt-24 w-full flex justify-center">
        <NewSetButton onClick={onClick} />
        <NewSetButton onClick={onClick} />
        <NewSetButton onClick={onClick} className="hidden lg:block" />
      </div>*/
