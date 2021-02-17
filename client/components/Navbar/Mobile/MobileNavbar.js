import React, { useContext } from 'react'
import Link from 'next/link'
import AuthContext from '../../../context/auth-context'
import Container from '../../common/Container'
import { Icon } from '../../common/Icon'

export default function MobileNavbar({ setMobileMenuOpen }) {
  const { loggedIn } = useContext(AuthContext)
  return (
    <Container className="pt-4 py-2 relative h-28 flex items-center justify-between lg:hidden">
      <Link href="/">
        <a className="h-3/5 sm:h-5/6 cursor-pointer">
          <img
            className="select-none h-full object-contain"
            src="/stoodint.png"
            alt="stoodint"
          />
        </a>
      </Link>
      <div onClick={() => setMobileMenuOpen(true)} className="cursor-pointer">
        <Icon name="menu" />
      </div>
    </Container>
  )
}

// border-b-2 border-transparent hover:border-app-blue-3
