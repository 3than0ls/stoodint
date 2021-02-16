import React from 'react'
import { Icon } from './Icon'

export default function NewSetButton({ onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer m-8 xl:m-12 opacity-90 hover:opacity-75 hover:scale-105 transform transition duration-300 ease-in-out ${props.className} focus:outline-none`}
    >
      <Icon name="newSet" />
    </button>
  )
}
