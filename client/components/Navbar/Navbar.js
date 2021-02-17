import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import LoginButton from './LoginButton'
import AuthContext from '../../context/auth-context'
import LoggedIn from './LoggedIn'
import Container from '../common/Container'

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <Container className="pt-4 py-2 relative h-28 items-center justify-between">
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
    </Container>
  )
}
