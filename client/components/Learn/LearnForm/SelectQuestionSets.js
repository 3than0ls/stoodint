import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Label from '../../common/Form/Label'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import firebase from '~/client/firebase/Firebase'
import SmallLoading from '../../common/SmallLoading'

const animatedComponents = makeAnimated()

export default function SelectQuestionSets({
  setSelectedQuestionSets,
  selectedQuestionSets,
  selectedSubject,
}) {
  const router = useRouter()

  const [questionSets, setQuestionSets] = useState(undefined)
  useEffect(() => {
    // this would be put in the onSubmit part
    // equivalent to the getSubject() function in index.js of /[subjectID]
    async function getQuestionSets() {
      try {
        setQuestionSets('loading')
        let fetchedQuestionSets = await firebase.getQuestionSets(
          selectedSubject.id
        )
        setQuestionSets(fetchedQuestionSets)
      } catch (err) {
        console.log(err)
        setQuestionSets(undefined)
      }
    }
    if (selectedSubject) {
      getQuestionSets()
    }
  }, [selectedSubject])

  const initValues = useMemo(() => {
    return selectedQuestionSets.map((questionSet) => ({
      value: questionSet,
      label: questionSet.name,
    }))
  }, [selectedQuestionSets])

  const coreComponent = () => {
    switch (questionSets) {
      case undefined:
        return (
          <div className="w-full flex justify-center">
            <p className="text-xl text-white">Please select a subject first.</p>
          </div>
        )
      case 'loading':
        return <SmallLoading />
      default:
        return (
          <Select
            onChange={(values) => {
              setSelectedQuestionSets(values.map((value) => value.value))

              const qIDs =
                values.map((value) => value.value.id).join('~') || undefined

              const query = {
                sID: selectedSubject.id,
              }
              if (qIDs) {
                query.qIDs = qIDs
              }

              router.replace({
                pathname: '/learn',
                query,
              })
            }}
            isMulti
            components={animatedComponents}
            value={initValues}
            options={questionSets.map((questionSet) => ({
              label: questionSet.name,
              value: questionSet,
            }))}
          />
        )
    }
  }
  return (
    <div className="my-6 w-full lg:w-3/4">
      <Label label="2) Select question set(s)" />
      <hr className="border-white my-4" />
      {coreComponent()}
    </div>
  )
}
