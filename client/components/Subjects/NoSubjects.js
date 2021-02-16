import React from 'react'
import CreateButton from '../common/CreateButton'
import { useRouter } from 'next/router'

export default function NoSubjects() {
  const router = useRouter()
  const onClick = () => router.push('/create')
  return (
    <div className="text-center relative">
      <div
        className={`transition transform duration-500 m-auto w-full bg-app-gray`}
      >
        <p className="text-4xl lg:text-5xl xl:text-6xl mt-24 mb-6 text-app-green ">
          Hmm... there are no available subjects.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-white ">
          Be the first to create a subject
        </p>
        <div className="mt-4 lg:mt-10 xl:mt-24 w-full flex justify-center">
          <CreateButton onClick={onClick} />
          <CreateButton onClick={onClick} className="hidden sm:block" />
          <CreateButton onClick={onClick} className="hidden lg:block" />
        </div>
      </div>
    </div>
  )
}
