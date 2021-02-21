import React from 'react'

export default function Gear({ color, width, height, className }) {
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
          stroke="#000000"
          strokeWidth="1.0"
          strokeLinejoin="round"
          strokeLinecap="butt"
          d="m38.247185 63.35959l1.921257 0l0 5.228348l-1.921257 0z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m3.5538058 15.994751l0 0c0 -6.870944 5.570001 -12.440945 12.440945 -12.440945l0 0c3.2995434 0 6.4639473 1.3107386 8.797075 3.6438684c2.33313 2.3331294 3.6438694 5.4975324 3.6438694 8.797077l0 0c0 6.870943 -5.5700016 12.440945 -12.440945 12.440945l0 0c-6.870944 0 -12.440945 -5.5700016 -12.440945 -12.440945zm4.8290772 0l0 0c0 4.2039185 3.4079494 7.611868 7.611868 7.611868c4.2039185 0 7.611868 -3.4079494 7.611868 -7.611868l0 0c0 -4.2039185 -3.4079494 -7.611868 -7.611868 -7.611868l0 0c-4.2039185 0 -7.611868 3.4079494 -7.611868 7.611868z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m12.27851 5.5118113l0.83724403 -5.511811l5.758584 0l0.83724403 5.511811z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m26.488186 12.282674l5.511812 0.83724403l0 5.758582l-5.511812 0.83724403z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m19.721485 26.48819l-0.83724403 5.5118103l-5.758582 0l-0.837245 -5.5118103z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m5.511809 19.717327l-5.5118113 -0.83724403l0 -5.758583l5.5118113 -0.83724403z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m20.776525 5.9602723l4.4987583 -3.3122644l4.073349 4.073348l-3.3122654 4.498759z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m26.0367 20.779829l3.3122654 4.49876l-4.073349 4.073347l-4.4987583 -3.3122635z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m11.22347 26.039728l-4.498759 3.3122635l-4.073348 -4.073347l3.3122644 -4.49876z"
          fillRule="evenodd"
        />
        <path
          fill={color || '#ffffff'}
          d="m5.9632964 11.22017l-3.3122647 -4.498759l4.073348 -4.073348l4.498759 3.3122647z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}
