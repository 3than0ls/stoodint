import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import LoginButton from './LoginButton'
import AuthContext from '../../context/auth-context'
import LoggedIn from './LoggedIn'

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <div className="pt-4 py-2 px-8 sm:px-12 md:px-24 lg:px-32 xl:px-36 relative w-full h-28 flex items-center justify-between">
      <Link href="/">
        <a className="h-3/5 sm:h-5/6 cursor-pointer">
          <img
            className="select-none h-full"
            src="/stoodint.png"
            alt="stoodint"
          />
        </a>
      </Link>
      {loggedIn !== undefined && (loggedIn ? <LoggedIn /> : <LoginButton />)}
    </div>
  )
}
