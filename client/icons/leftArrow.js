import React from 'react'

export default function leftArrow({ color }) {
  // i am a lazy man. left arrow is just rightArrow copypaste but with className rotate
  return (
    <svg
      className="transform rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 18 18"
    >
      <path
        style={{ fill: color || '#ffffff' }}
        d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z"
      />
    </svg>
  )
}
