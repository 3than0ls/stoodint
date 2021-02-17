import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import NoSubjects from './NoSubjects'
import CarouselCard from './Carousel/CarouselCard'
import Carousel from './Carousel/Carousel'
import SpecialCarouselCard from './Carousel/SpecialCarouselCard'
import SubjectGrid from './SubjectGrid'
import AuthContext from '~/client/context/auth-context'

export default function Subjects({ subjects }) {
  const { loggedIn } = useContext(AuthContext)
  const router = useRouter()

  const generateSubjectCarouselCards = () => {
    const cards = []
    for (const subject of subjects.slice(0, 3)) {
      cards.push(<CarouselCard key={subject.id} subject={subject} />)
    }
    cards.push(
      <SpecialCarouselCard
        loggedIn={loggedIn}
        key="subjects"
        type="subjects"
        onClick={() =>
          document
            .getElementById('subjects')
            .scrollIntoView({ behavior: 'smooth' })}
      />
    )
    cards.push(
      <SpecialCarouselCard
        loggedIn={loggedIn}
        key="create"
        type="create"
        onClick={() => loggedIn && router.push('/subjects/create')}
      />
    )
    return cards
  }

  return subjects.length > 0 ? (
    <div className="w-full flex flex-col items-center justify-evenly mt-8">
      <Carousel generateCarouselCards={generateSubjectCarouselCards} />
      <div id="subjects" className="w-full text-center mt-4">
        <SubjectGrid subjects={subjects} />
      </div>
    </div>
  ) : (
    <NoSubjects />
  )
}

/*
        <CreateNewSet view={view} setView={setView} />
        <PickView view={view} setView={setView} loggedIn={loggedIn} /> */
