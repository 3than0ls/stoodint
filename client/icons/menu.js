import React from 'react'

export default function menu({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 20 20"
    >
      <path
        style={{ fill: color || '#ffffff' }}
        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
      />
    </svg>
  )
}
