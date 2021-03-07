import React from 'react'

export default function Grid({ color, width, height, className }) {
  return (
    <svg
      className={className}
      version="1.1"
      width={width}
      height={height}
      viewBox="0.0 0.0 32.0 32.0"
      fill="none"
      stroke="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="p.0">
        <path d="m0 0l32.0 0l0 32.0l-32.0 0l0 -32.0z" clipRule="nonzero" />
      </clipPath>
      <g clipPath="url(#p.0)">
        <path
          fill="#000000"
          fillOpacity="0.0"
          d="m0 0l32.0 0l0 32.0l-32.0 0z"
          fillRule="evenodd"
        />
        <path
          fill="#cfe2f3"
          d="m38.247185 63.35959l1.921257 0l0 5.228348l-1.921257 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          strokeWidth="1.0"
          strokeLinejoin="round"
          strokeLinecap="butt"
          d="m38.247185 63.35959l1.921257 0l0 5.228348l-1.921257 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m0 0l8.787401 0l0 8.787401l-8.787401 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m11.60571 0l8.787402 0l0 8.787401l-8.787402 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m23.21142 0l8.787403 0l0 8.787401l-8.787403 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m5.8897637E-4 11.606299l8.787401 0l0 8.787402l-8.787401 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m11.606299 11.606299l8.787402 0l0 8.787402l-8.787402 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m23.21201 11.606299l8.787401 0l0 8.787402l-8.787401 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m0 23.212599l8.787401 0l0 8.787401l-8.787401 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m11.60571 23.212599l8.787402 0l0 8.787401l-8.787402 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#000000'}
          d="m23.21142 23.212599l8.787403 0l0 8.787401l-8.787403 0z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}
