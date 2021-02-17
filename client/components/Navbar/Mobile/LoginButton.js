import React from 'react'
import Link from 'next/link'

export default function LoginButton({ onClick }) {
  return (
    <Link href="/login">
      <a
        onClick={onClick}
        className="font-bold mb-6 mx-6 p-4 w-full bg-app-green text-center rounded-2xl shadow-2xl tracking-wide  text-2xl hover:opacity-75 transition duration-300"
      >
        Log In
      </a>
    </Link>
  )
}
