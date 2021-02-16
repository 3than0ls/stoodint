import React from 'react'
import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link href="/login">
      <a className="font-bold text-white text-xl sm:text-2xl cursor-pointer">
        Log in
      </a>
    </Link>
  )
}
