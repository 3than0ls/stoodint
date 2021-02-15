import React from 'react'
import Seperator from '../common/Seperator'
import SetForm from './SetForm'

export default function CreateSet() {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="mx-auto text-4xl lg:text-5xl xl:text-6xl mt-6 mb-3 text-app-green">
        Create a New Set
      </p>
      <Seperator />
      <SetForm />
    </div>
  )
}
