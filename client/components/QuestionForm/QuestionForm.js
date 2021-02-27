import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import Input from '../common/Form/Input'
import AnswerInput from './AnswerInput/AnswerForm'
import Seperator from '../common/Seperator'
import ImageUpload from '~/client/components/common/Form/ImageUpload'
import firebase from '~/client/firebase/Firebase'
import Container from '../common/Container'

export default function QuestionForm({ subjectID, questionSetID }) {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()

  const router = useRouter()

  const [error, setError] = useState(undefined)
  const [imagePreview, setImagePreview] = useState(undefined)

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

  const onSubmit = useCallback(async (data) => {
    const oneCorrect =
      data.answers.filter((answer) => answer.correct).length === 1
    if (!oneCorrect) {
      setError('There must be one and only one correct answer.')
      return
    }

    document.body.style.cursor = 'wait'
    try {
      await firebase.createQuestion(subjectID, questionSetID, data)
      router.push(`/subjects/${subjectID}/${questionSetID}`)
    } catch (err) {
      setError('An error has occured. Try to reload the page.')
      console.log(err)
    }
    document.body.style.cursor = 'default'
  })

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
          setValue={setValue}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <Seperator />
        {error && (
          <div className="text-app-purple mt-4 lg:mt-8 text-xl text-center">
            {error}
          </div>
        )}
        <input
          type="submit"
          value="Submit"
          className="mt-8 py-4 px-24 rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-auto text-white cursor-pointer hover:bg-opacity-75"
        />
      </form>
    </Container>
  )
}
