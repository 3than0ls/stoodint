import React, { useContext } from 'react'
import Link from 'next/link'
import LoginButton from './LoginButton'
import AuthContext from '../../../context/auth-context'
import LoggedIn from './LoggedIn'
import Container from '../../common/Container'

export default function DesktopNavbar({ navLinks, loggedInOptions }) {
  const { loggedIn } = useContext(AuthContext)
  return (
    <Container className="pt-4 pb-4 h-28 items-center justify-between hidden lg:flex">
      <Link href="/">
        <a className="h-3/5 sm:h-5/6 cursor-pointer">
          <img
            className="select-none h-full object-contain"
            src="/stoodint.png"
            alt="stoodint"
          />
        </a>
      </Link>
      <div className="flex flex-row items-center">
        {navLinks.map((link) => (
          <div className="flex items-center mx-6 h-full" key={link.name}>
            <Link href={link.href}>
              <a className="font-semibold tracking-wide text-white text-xl sm:text-lg hover:text-app-blue-3 transition duration-500 border-b-2 border-transparent hover:border-app-blue-3">
                {link.name}
              </a>
            </Link>
          </div>
        ))}
        {loggedIn !== undefined &&
          (loggedIn ? (
            <LoggedIn loggedInOptions={loggedInOptions} />
          ) : (
            <LoginButton />
          ))}
      </div>
    </Container>
  )
}

// border-b-2 border-transparent hover:border-app-blue-3
