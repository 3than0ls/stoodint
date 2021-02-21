import React, { useContext } from 'react'
import Link from 'next/link'
import authContext from '~/client/context/auth-context'

export default function TextCreateButton({ createValue, href }) {
  const { loggedIn } = useContext(authContext)
  return (
    loggedIn && (
      <div className="mt-4 md:mt-8 flex flex-col items-center">
        <Link href={href}>
          <a className="text-lg shadow-2xl cursor-pointer rounded-2xl py-5 px-12 bg-app-green md:text-xl lg:text-2xl text-white hover:opacity-75 transition duration-300">
            Create a new {createValue}
          </a>
        </Link>
      </div>
    )
  )
}
