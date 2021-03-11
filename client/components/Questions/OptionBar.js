import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from '~/client/firebase/Firebase'
import authContext from '~/client/context/auth-context'
import { Icon } from '../common/Icon'

export default function OptionsBar({ questionSet, subjectID }) {
  const router = useRouter()
  const { loggedIn } = useContext(authContext)
  const options = [
    {
      name: `View other question sets of this subject`,
      href: `/subjects/${subjectID}`,
    },
    {
      name: 'Take Quiz',
      href: `/learn?sID=${subjectID}&qIDs=${questionSet.id}`,
    },
    {
      name: 'Edit',
      theme: `bg-app-light-blue-1 text-black opacity-50 cursor-not-allowed`,
      admin: true,
      onClick: async () => {
        alert('editing has not yet been implemented and is disabled ')
      },
    },
    {
      name: questionSet.private ? 'Make Public' : 'Make Private',
      theme: `${
        questionSet.private ? 'bg-app-purple' : 'bg-app-dark-blue'
      } text-white`,
      admin: true,
      onClick: async () => {
        await firebase.setPrivate(
          subjectID,
          questionSet.id,
          !questionSet.private
        )
        router.reload()
      },
      icon: (
        <Icon
          className="ml-4"
          size={24}
          name={questionSet.private ? 'unlocked' : 'locked'}
        />
      ),
    },
    {
      name: 'Delete Question Set',
      theme: 'bg-red-500 text-white',
      admin: true,
      onClick: async () => {
        if (
          window.confirm('Are you sure you want to delete this question set?')
        ) {
          await firebase.deleteSubjectOrQuestionSet(subjectID, questionSet.id)
          router.push(`/subjects/${subjectID}`)
        }
      },
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
