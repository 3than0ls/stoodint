import React from 'react'
import DesktopNavbar from './Desktop/DesktopNavbar'
import MobileNavbar from './Mobile/MobileNavbar'

export default function Navbar({
  setMobileMenuOpen,
  navLinks,
  loggedInOptions,
}) {
  return (
    <>
      <DesktopNavbar navLinks={navLinks} loggedInOptions={loggedInOptions} />
      <MobileNavbar setMobileMenuOpen={setMobileMenuOpen} />
    </>
  )
}
