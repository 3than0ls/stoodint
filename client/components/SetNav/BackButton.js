import React from 'react'
import { Icon } from '../common/Icon'

export default function BackButton({ setView }) {
  return (
    <div
      onClick={() => setView('pickView')}
      draggable="false"
      className="flex justify-center items-center cursor-pointer bg-app-green text-white h-16 w-1/2 max-w-2xl mt-12 mx-auto rounded-2xl shadow-xl bg-opacity-90 hover:bg-opacity-75 transition duration-300 ease-in-out"
    >
      <Icon name="leftArrow" />
    </div>
  )
}
