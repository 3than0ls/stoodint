import React from 'react'

export default function Container(props) {
  // variant containers dont have padding/margin
  const className = !props.variant
    ? `w-full flex ${
        props.col ? 'flex-col' : 'flex-row'
      }  items-center px-8 sm:px-12 md:px-20 lg:px-28 xl:px-32 ${
        props.className
      }`
    : `min-h-screen-navbar flex ${
        props.col ? 'flex-col' : 'flex-row'
      } items-center ${props.className}`

  return <div className={className}>{props.children}</div>
}
