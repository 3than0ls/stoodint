import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from './Icon'

export default function Card({ href, cardObject, openInNewTab, margin }) {
  const [hovering, setHovering] = useState(false)

  const LinkWrapper = (props) => {
    return openInNewTab ? (
      <a href={href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    ) : (
      <Link href={href}>
        <a>{props.children}</a>
      </Link>
    )
  }

  return (
    <div
      draggable="false"
      className={`relative overflow-hidden cursor-pointer text-white h-64 md:h-72 lg:h-96 w-full max-w-2xl ${
        !margin ? 'mt-12 mx-6 xl:mx-8' : margin
      } rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out`}
    >
      <LinkWrapper>
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="absolute z-20 bg-black rounded-t-xl w-full h-4/5 opacity-0 hover:bg-opacity-75 hover:opacity-100 transition duration-500"
        >
          <div
            className={`${
              hovering
                ? 'translate-y-0 bg-opacity-100'
                : '-translate-y-16 bg-opacity-0 pointer-events-none'
            } transform transition duration-500 text-white h-full w-full flex flex-col items-center justify-center`}
          >
            <p className="px-2 mt-4 text-xl w-full text-center break-words overflow-hidden">
              Description: {cardObject.description}
            </p>
          </div>
        </div>
        <img
          src={cardObject.image.downloadURL || './innovation.png'}
          alt="banner"
          className="w-full h-4/5 object-cover bg-app-blue-1 rounded-t-xl shadow-inner"
        />
        <span
          className="text-xl w-full lg:text-2xl px-4 lg:px-6 h-1/5 flex items-center justify-between hover:underline bg-black rounded-b-2xl hover:bg-opacity-75 transition duration-500"
          draggable="false"
        >
          <div
            className={`truncate text-left ${
              cardObject.private ? 'w-11/12' : 'w-full'
            }`}
          >
            {cardObject.name}
          </div>
          {cardObject.private && <Icon size={24} name={'locked'} />}
        </span>
      </LinkWrapper>
    </div>
  )
}
