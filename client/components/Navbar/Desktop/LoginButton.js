import React from 'react'
import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link href="/login">
      <a className="pb-2 ml-4 font-semibold flex-shrink-0 text-white text-xl sm:text-2xl hover:text-app-blue-3 transition duration-500">
        Log in
      </a>
    </Link>
  )
}
