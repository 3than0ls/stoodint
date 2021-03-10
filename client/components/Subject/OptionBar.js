import React, { useCallback, useContext } from 'react'
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
      theme: 'bg-app-blue-1 text-white',
      onClick: () => {
        router.push(`/subjects`)
      },
    },
    {
      name: 'Edit',
      theme: `bg-app-light-blue-1 text-black opacity-50 cursor-not-allowed`,
      admin: true,
      onClick: useCallback(async () => {
        alert('editing has not yet been implemented and is disabled ')
      }),
    },
    {
      name: 'Take Quiz',
      theme: `bg-app-green text-white`,
      onClick: useCallback(async () => {
        alert('redirect to /learn with params from here')
        // router.push('/learn', undefined, {params})
      }),
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
          (!option.admin || loggedIn === option.admin) && (
            <div
              key={index}
              onClick={option.onClick}
              className={`${option.theme} w-full h-24 xl:h-20 md:w-3/4 lg:w-auto flex-1 flex items-center justify-center my-2 mx-4 text-center p-5 rounded-2xl cursor-pointer shadow-xl hover:opacity-75 transition duration-300`}
            >
              {option.name}
              {!!option.icon && option.icon}
            </div>
          )
      )}
    </div>
  )
}
