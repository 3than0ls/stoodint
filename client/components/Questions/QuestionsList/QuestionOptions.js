import React, { useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import firebase from '~/client/firebase/Firebase'

export default function QuestionOptions({
  subjectID,
  questionSetID,
  questionID,
  loggedIn,
  elementID,
}) {
  const router = useRouter()
  const copyRef = useRef(null)
  const options = [
    {
      name: 'Copy Question Link',
      textColor: 'text-app-blue-2',
      onClick: () => {
        const link = copyRef.current
        link.select()
        document.execCommand('copy')
        document
          .getElementById(elementID)
          .scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      name: 'Edit Question',
      textColor: 'text-app-purple',
      disabled: true,
      admin: true,
      onClick: () => {
        alert('editing has not yet been implemented and is disabled ')
      },
    },
    {
      name: 'Delete Question',
      textColor: 'text-red-500',
      admin: true,
      onClick: useCallback(async () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
          await firebase.deleteQuestion(subjectID, questionSetID, questionID)
          // router.reload()
        }
      }),
    },
  ]

  const generateOptions = () => {
    const optionElements = []
    for (const [index, option] of options.entries()) {
      if (!option.admin || (option.admin && loggedIn)) {
        optionElements.push(
          <div
            key={index}
            onClick={option.onClick}
            className={`${option.textColor} ${
              option.disabled
                ? 'text-opacity-50 bg-black bg-opacity-10 cursor-not-allowed'
                : 'cursor-pointer hover:underline transition duration-300'
            } flex-grow text-center py-4`}
          >
            {option.name}
          </div>
        )
      }
    }
    return optionElements
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-xl flex mt-2">
      <form className="hidden">
        <textarea
          ref={copyRef}
          readOnly
          value={router.asPath + '#' + elementID}
        />
      </form>

      {generateOptions()}
    </div>
  )
}
