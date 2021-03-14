import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import firebase from '~/client/firebase/Firebase'

export default function QuestionOptions({
  subjectID,
  questionSetID,
  questionID,
  loggedIn,
  refreshQuestionSet,
}) {
  const router = useRouter()
  const options = [
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
      onClick: async () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
          await firebase.deleteQuestion(subjectID, questionSetID, questionID)
          await refreshQuestionSet()
          router.replace(router.asPath)
        }
      },
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
      {generateOptions()}
    </div>
  )
}
