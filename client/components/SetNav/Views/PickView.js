import React from 'react'
import Seperator from '~/client/components/common/Seperator'
import NewSetButton from '../NewSetButton'

export default function PickView({ view, setView }) {
  const newSetButtonClick = () => setView('createNewSet')
  const setsButtonClick = () => setView('sets')
  return (
    <div
      className={`${
        view === 'pickView'
          ? 'opacity-100 translation-y-0'
          : 'opacity-0 -translate-y-64 pointer-events-none'
      } transition transform duration-500 mt-6 lg:mt-8 xl:mt-12 flex flex-col`}
    >
      <div className="mx-auto w-full">
        <button
          onClick={setsButtonClick}
          className="text-2xl md:text-3xl lg:text-4xl my-3 text-app-green py-6 px-12 rounded-2xl shadow-xl mx-auto bg-app-dark-blue focus:outline-none hover:opacity-75 transition duration-300"
        >
          View all of our question sets
        </button>
        <div className="w-full flex justify-center"></div>
      </div>
      <div className="mx-auto w-full">
        <Seperator />
        <button
          onClick={newSetButtonClick}
          className="text-2xl md:text-3xl lg:text-4xl my-3 text-app-green py-6 px-12 rounded-2xl shadow-xl mx-auto bg-app-dark-blue focus:outline-none hover:opacity-75 transition duration-300"
        >
          Create your own question set
        </button>
        <div className="w-full flex justify-center">
          <NewSetButton onClick={newSetButtonClick} />
          <NewSetButton
            onClick={newSetButtonClick}
            className="hidden sm:block"
          />
          <NewSetButton
            onClick={newSetButtonClick}
            className="hidden lg:block"
          />
        </div>
      </div>
    </div>
  )
}
