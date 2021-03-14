import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import Input from '../common/Form/Input'
import AnswerInput from './AnswerInput/AnswerForm'
import Seperator from '../common/Seperator'
import ImageUpload from '~/client/components/common/Form/ImageUpload'
import firebase from '~/client/firebase/Firebase'
import Container from '../common/Container'
import { v4 as uuidv4 } from 'uuid'

export default function QuestionForm({ subjectID, questionSetID }) {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    reset,
  } = useForm()

  const router = useRouter()

  const [error, setError] = useState(undefined)
  const [imagePreview, setImagePreview] = useState(undefined)
  const [redirect, setRedirect] = useState(false)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0)
  const [shuffleAnswers, setShuffleAnswers] = useState(true)
  const [key, setKey] = useState(uuidv4())

  const onDropAccepted = React.useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0]
    if (!getValues('image')) {
      register('image', {})
    }
    setValue('image', acceptedFile)
    const reader = new FileReader()
    reader.onload = function () {
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(acceptedFile)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
    multiple: false,
  })

  const onSubmit = async (data) => {
    data.answers = data.answers.filter((answer) => answer.answer)

    data.shuffleAnswers = shuffleAnswers
    const oneCorrect =
      data.answers.filter((answer) => answer.correct).length === 1
    if (!oneCorrect) {
      setError('There must be at least one and only one correct answer.')
      return
    }

    document.body.style.cursor = 'wait'
    try {
      await firebase.createQuestion(subjectID, questionSetID, data)
      if (redirect) {
        router.push(`/subjects/${subjectID}/${questionSetID}`)
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
        reset()
        setError(undefined)
        setImagePreview(undefined)
        setRedirect(false)
        setCorrectAnswerIndex(0)
        setShuffleAnswers(true)
        setKey(uuidv4())
      }
    } catch (err) {
      setError('An error has occured. Try to reload the page.')
      console.log(err)
    }
    document.body.style.cursor = 'initial'
  }

  return (
    <Container col className="text-center mb-16">
      <p className="mx-auto text-4xl lg:text-5xl xl:text-6xl mt-6 mb-3 text-app-green">
        Create a New Question
      </p>
      <Seperator />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          name="question"
          label="Question"
          placeholder="Input question"
          register={register}
          errors={errors}
        />
        <ImageUpload
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          errors={errors}
          inputText="Optional. Drag or upload an image."
          imagePreview={imagePreview}
          label="Add an image to your question"
        />
        <Seperator />
        <AnswerInput
          key={key}
          setValue={setValue}
          register={register}
          errors={errors}
          correctAnswerIndex={correctAnswerIndex}
          setCorrectAnswerIndex={setCorrectAnswerIndex}
        />
        <div
          className={`cursor-pointer w-64 mx-auto p-4 rounded-2xl hover:bg-opacity-75 transition duration-300 focus:outline-none ${
            shuffleAnswers ? 'bg-app-blue-3' : 'bg-app-purple'
          }`}
          onClick={() => {
            setShuffleAnswers(!shuffleAnswers)
          }}
        >
          {shuffleAnswers
            ? 'Answers will be shuffled'
            : 'Answers will not be shuffled'}
        </div>
        <Seperator />
        {error && (
          <div className="text-app-purple mt-4 lg:mt-8 text-xl text-center">
            {error}
          </div>
        )}
        <input
          type="submit"
          onClick={() => setRedirect(true)}
          value="Submit and return to question set page"
          className="mt-8 py-4 px-24 rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-4 text-white cursor-pointer hover:bg-opacity-75"
        />
        <input
          type="submit"
          onClick={() => setRedirect(false)}
          value="Submit and create a new question"
          className="mt-8 py-4 px-24 rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-4 text-white cursor-pointer hover:bg-opacity-75"
        />
      </form>
    </Container>
  )
}
