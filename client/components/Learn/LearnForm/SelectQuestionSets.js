import React, { useEffect, useState } from 'react'
import Label from '../../common/Form/Label'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import firebase from '~/client/firebase/Firebase'
import SmallLoading from '../../common/SmallLoading'

const animatedComponents = makeAnimated()

export default function SelectQuestionSets({
  setSelectedQuestionSets,
  selectedSubject,
}) {
  // all the question sets from the selected subject, apply a useForm on these

  const [questionSets, setQuestionSets] = useState(undefined)
  useEffect(() => {
    // this would be put in the onSubmit part
    // equivalent to the getSubject() function in index.js of /[subjectID]
    async function getQuestionSets() {
      try {
        setQuestionSets('loading')
        let fetchedSubject = await firebase.getSubject(selectedSubject.id)
        setQuestionSets(fetchedSubject.questionSets)
      } catch (err) {
        console.log(err)
        setQuestionSets(undefined)
      }
    }
    if (selectedSubject) {
      getQuestionSets()
    }
  }, [selectedSubject])

  const coreComponent = () => {
    switch (questionSets) {
      case undefined:
        return (
          <div className="w-full flex justify-center">
            <p className="text-lg text-white">
              Please select a question set first.
            </p>
          </div>
        )
      case 'loading':
        return <SmallLoading />
      default:
        return (
          <Select
            onChange={(values) =>
              setSelectedQuestionSets(values.map((value) => value.value))
            }
            closeMenuOnSelect={false}
            isMulti={true}
            components={animatedComponents}
            options={questionSets.map((questionSet) => ({
              label: questionSet.name,
              value: questionSet.questionSet,
            }))}
          />
        )
    }
  }
  return (
    <div className="mt-6 w-full lg:w-1/2 lg:ml-4 lg:min-h-32">
      <Label label="2) Select question set(s)" />
      <hr className="border-white my-4" />
      {coreComponent()}
    </div>
  )
}