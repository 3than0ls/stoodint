import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import Input from '../common/Form/Input'
import AnswerInput from './AnswerInput/AnswerForm'
import Seperator from '../common/Seperator'
import ImageUpload from '~/client/components/common/Form/ImageUpload'
import firebase from '~/client/firebase/Firebase'

export default function QuestionForm() {
  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    getValues,
    setValue,
  } = useForm()

  const [authError, setAuthError] = useState(undefined)
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
    try {
      await firebase.createQuestion('client_test', data)
    } catch (err) {
      setAuthError('An error has occured. Try to reload the page.')
      console.log(err)
    }
  })

  return (
    <div className="w-full p-4 text-center flex flex-col items-center">
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
          register={register}
          errors={errors}
          clearErrors={clearErrors}
        />
        <Seperator />
        {authError && (
          <div className="text-app-purple my-4 lg:my-8 text-xl text-center">
            {authError}
          </div>
        )}
        <input
          type="submit"
          value="Submit"
          className="my-4 py-4 px-24 rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-auto text-white cursor-pointer hover:bg-opacity-75"
        />
      </form>
    </div>
  )
}
