import React, { useState } from 'react'
import MakeNewSet from './MakeNewSet'
import NewSetButton from './NewSetButton'

export default function NoSets() {
  const [makeNewSet, setMakeNewSet] = useState(false)
  const onClick = () => setMakeNewSet(true)
  return (
    <div className="text-center relative">
      <div
        className={`${
          !makeNewSet
            ? 'opacity-100 translation-y-0'
            : 'opacity-0 translate-y-64 pointer-events-none'
        } transition transform duration-500 m-auto w-full absolute bg-app-gray`}
      >
        <p className="text-4xl lg:text-5xl xl:text-6xl mt-24 mb-6 text-app-green ">
          Hmm... there are no available question sets.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-white ">
          Be the first to create a set of questions
        </p>
        <div className="mt-4 lg:mt-10 xl:mt-24 w-full flex justify-center">
          <NewSetButton onClick={onClick} />
          <NewSetButton onClick={onClick} className="hidden sm:block" />
          <NewSetButton onClick={onClick} className="hidden lg:block" />
        </div>
      </div>
      <div
        className={`${
          makeNewSet
            ? 'opacity-100 translation-y-0'
            : 'opacity-0 -translate-y-64 pointer-events-none'
        } transition transform duration-500 w-full absolute bg-app-gray`}
      >
        <MakeNewSet />
      </div>
    </div>
  )
}
