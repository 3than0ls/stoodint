import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full text-center mt-12 mx-auto">
      <p className="text-4xl mb-6 text-app-green ">
        Hmm... this page doesn't appear to exist.
      </p>
      <Link href="/">
        <a className="text-2xl xl:text-3xl text-app-blue-3 hover:opacity-90 underline transition duration-300">
          Return to home page
        </a>
      </Link>
      <img
        className="mx-auto select-none h-96"
        src="/lightbulb.png"
        alt="lightbulb"
      />
    </div>
  )
}
