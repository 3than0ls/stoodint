import React, { useEffect, useMemo } from 'react'
import convertMillsecondToString from '~/client/utils/convertTime'

export default function Summary({ learnStats, subject, questionSets }) {
  const gridData = useMemo(() => {
    const data = []
    data.push({ title: 'Subject', data: subject.name })
    data.push({
      title: 'Question Sets',
      data: `${questionSets.map((questionSet) => questionSet.name).join(', ')}`,
    })
    data.push({
      title: 'Total Questions',
      data: learnStats.totalQuestions,
    })
    data.push({
      title: 'Questions Answered Correctly',
      data: learnStats.numCorrect,
    })
    data.push({
      title: 'Completion Time',
      data: convertMillsecondToString(learnStats.completionTime).string,
    })
    data.push({
      title: 'Completion Date',
      data: new Date(learnStats.timestamp * 1000).toUTCString(),
    })
    return data
  }, [learnStats, questionSets, subject])

  return (
    <div className="mt-6 w-full mb-16">
      <p className="text-center text-white text-4xl my-4">Summary</p>
      <div className="bg-white grid grid-cols-1 lg:grid-cols-2 p-8 gap-8 rounded-2xl shadow-2xl">
        {gridData.map((data) => (
          <div
            key={data.title}
            className="flex justify-between border-app-light-gray border-b-2 text-lg"
          >
            <p>{data.title}</p>{' '}
            <p className="text-app-dark-blue">{data.data}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
