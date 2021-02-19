import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CreateButton from './CreateButton'
import authContext from '~/client/context/auth-context'

export default function NoValues({ valueType, createHref }) {
  const valueTypes = {
    questionSets: {
      name: 'question sets',
      parent: 'subject',
    },
    questions: {
      name: 'questions',
      parent: 'question set',
    },
  }
  const router = useRouter()
  const { loggedIn } = useContext(authContext)
  return (
    <div className="text-center relative ">
      <div className="transition transform duration-500 m-auto w-full bg-app-gray">
        <p className="text-2xl md:text-3xl lg:text-4xl mt-12 mb-6 text-app-green ">
          Hmm... there are no available {valueTypes[valueType].name} in this{' '}
          {valueTypes[valueType].parent}.
        </p>
        {loggedIn ? (
          <>
            <Link href={createHref}>
              <a className="text-lg md:text-xl lg:text-2xl text-white">
                Be the first to create a{' '}
                {valueTypes[valueType].name.slice(0, -1)}.
              </a>
            </Link>
            <Link href={createHref}>
              <div className="mt-4 w-full flex justify-center max-w-screen overflow-x-hidden">
                <a>
                  <CreateButton />
                </a>
                <a className="hidden md:block">
                  <CreateButton />
                </a>
              </div>
            </Link>
          </>
        ) : (
          <p
            onClick={() => router.reload()}
            className="text-lg md:text-xl lg:text-2xl text-white cursor-pointer hover:opacity-90 transition"
          >
            Think this is a mistake? Try to refresh, or contact a site admin.
          </p>
        )}
      </div>
    </div>
  )
}
