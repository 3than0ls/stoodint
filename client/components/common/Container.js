import React from 'react'

export default function Container(props) {
  return (
    <div
      className={`w-full flex ${
        props.col ? 'flex-col' : 'flex-row'
      }  items-center px-8 sm:px-12 md:px-20 lg:px-28 xl:px-32 ${
        props.className
      }`}
    >
      {props.children}
    </div>
  )
}
