import React from 'react'

export default function RightArrow({ color, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '42'}
      height={height || '42'}
      viewBox="0 0 18 18"
    >
      <path
        style={{ fill: color || '#ffffff' }}
        d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z"
      />
    </svg>
  )
}
