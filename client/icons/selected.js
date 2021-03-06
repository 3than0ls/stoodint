import React from 'react'

export default function Selected({
  color,
  width,
  height,
  className,
  selected,
}) {
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
          fill={color || '#000000'}
          d="m0 16.0l0 0c0 -8.8365555 7.163444 -16.0 16.0 -16.0l0 0c4.2434635 0 8.313126 1.6857095 11.313709 4.6862917c3.0005817 3.0005817 4.6862907 7.070245 4.6862907 11.313708l0 0c0 8.8365555 -7.1634445 16.0 -16.0 16.0l0 0c-8.8365555 0 -16.0 -7.1634445 -16.0 -16.0zm3.24576 0l0 0c0 7.043972 5.710268 12.75424 12.75424 12.75424c7.043972 0 12.75424 -5.710268 12.75424 -12.75424l0 0c0 -7.043972 -5.710268 -12.75424 -12.75424 -12.75424l0 0c-7.043972 0 -12.75424 5.710268 -12.75424 12.75424z"
          fillRule="evenodd"
        />
        {selected && (
          <path
            fill={color || '#000000'}
            d="m6.422572 15.9973755l0 0c0 -5.288018 4.286785 -9.574803 9.574803 -9.574803l0 0c2.5393963 0 4.974785 1.008771 6.7704086 2.8043947c1.7956238 1.7956238 2.8043938 4.2310123 2.8043938 6.7704086l0 0c0 5.2880173 -4.286785 9.574802 -9.574802 9.574802l0 0c-5.288018 0 -9.574803 -4.286785 -9.574803 -9.574802z"
            fillRule="evenodd"
          />
        )}
      </g>
    </svg>
  )
}
