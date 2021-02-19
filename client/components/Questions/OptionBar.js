import React, { useCallback, useReducer, useContext } from 'react'
import firebase from '~/client/firebase/Firebase'
import { useRouter } from 'next/router'
import authContext from '~/client/context/auth-context'

export default function OptionsBar({ questionSet, subjectID }) {
  const router = useRouter()
  const { loggedIn } = useContext(authContext)
  const options = [
    {
      name: `View other question sets of this subject`,
      theme: 'bg-app-blue-1 text-white',
      onClick: () => {
        router.push(`/subjects/${subjectID}`)
      },
    },
    {
      name: questionSet.private ? 'Make Public' : 'Make Private',
      theme: `${
        questionSet.private ? 'bg-app-purple' : 'bg-app-dark-blue'
      } text-white`,
      admin: true,
      onClick: useCallback(async () => {
        await firebase.setPrivate(
          subjectID,
          questionSet.id,
          !questionSet.private
        )
        router.reload()
      }),
    },
    {
      name: 'Delete Question Set',
      theme: 'bg-red-500 text-white',
      admin: true,
      onClick: useCallback(async () => {
        if (
          window.confirm('Are you sure you want to delete this question set?')
        ) {
          await firebase.deleteSubjectOrQuestionSet(subjectID, questionSet.id)
          router.push(`/subjects/${subjectID}`)
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
            </div>
          )
      )}
    </div>
  )
}
