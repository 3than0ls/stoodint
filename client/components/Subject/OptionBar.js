import React, { useCallback, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from '~/client/firebase/Firebase'
import authContext from '~/client/context/auth-context'
import { Icon } from '../common/Icon'

export default function OptionsBar({ subject }) {
  const router = useRouter()
  const { loggedIn } = useContext(authContext)
  const options = [
    {
      name: `View all subjects`,
      href: '/subjects',
    },
    {
      name: 'Take Quiz',
      href: `/learn?sID=${subject.id}`,
    },
    {
      name: subject.private ? 'Make Public' : 'Make Private',
      theme: `${
        subject.private ? 'bg-app-purple' : 'bg-app-dark-blue'
      } text-white`,
      admin: true,
      onClick: useCallback(async () => {
        await firebase.setPrivate(subject.id, null, !subject.private)
        router.reload()
      }),
      icon: (
        <Icon
          className="ml-4"
          size={24}
          name={subject.private ? 'unlocked' : 'locked'}
        />
      ),
    },
    {
      name: 'Delete Subject',
      theme: 'bg-red-500 text-white',
      admin: true,
      onClick: useCallback(async () => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
          await firebase.deleteSubjectOrQuestionSet(subject.id)
          router.push(`/subjects`)
        }
      }),
    },
  ]
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center my-6">
      {options.map(
        (option, index) =>
          (!option.admin || loggedIn === option.admin) &&
          (option.href ? (
            <Link key={index} href={option.href}>
              <a
                key={index}
                className={`${
                  option.theme || 'bg-app-blue-1 text-white'
                } w-full h-24 xl:h-20 md:w-3/4 lg:w-auto flex-1 flex items-center justify-center my-2 mx-4 text-center p-5 rounded-2xl cursor-pointer shadow-xl hover:opacity-75 transition duration-300`}
              >
                {option.name}
                {!!option.icon && option.icon}
              </a>
            </Link>
          ) : (
            <div
              key={index}
              onClick={option.onClick}
              className={`${
                option.theme || 'bg-app-blue-1 text-white'
              } w-full h-24 xl:h-20 md:w-3/4 lg:w-auto flex-1 flex items-center justify-center my-2 mx-4 text-center p-5 rounded-2xl cursor-pointer shadow-xl hover:opacity-75 transition duration-300`}
            >
              {option.name}
              {!!option.icon && option.icon}
            </div>
          ))
      )}
    </div>
  )
}
