import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '~/client/components/common/Form/Input'
import Seperator from '~/client/components/common/Seperator'
import { useDropzone } from 'react-dropzone'
import ImageUpload from '~/client/components/common/Form/ImageUpload'
import firebase from '~/client/firebase/Firebase'
import { useRouter } from 'next/router'

export default function QuestionSetForm({ subject }) {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()
  const [imagePreview, setImagePreview] = useState(undefined)
  const router = useRouter()

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

  const onSubmit = useCallback(async (questionSetData) => {
    try {
      const data = await firebase.createQuestionSet(subject, questionSetData)
      router.push(`/subjects/${subject.id}`)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <div className="w-full p-4 text-center h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Question Set Name"
          placeholder="Question Set Name"
          register={register}
          errors={errors}
        />
        <Input
          className="mt-6"
          name="description"
          label="Question Set Description"
          placeholder="Question Set Description"
          register={register}
          errors={errors}
        />
        <ImageUpload
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          errors={errors}
          inputText="Optional. Drag or upload an image. Recommended resolution: 1200x500"
          imagePreview={imagePreview}
          label="Add a banner image"
        />
        <Seperator />
        <input
          type="submit"
          value="Create New Question Set"
          className="my-4 py-4 px-24 text-2xl rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-auto text-white cursor-pointer hover:bg-opacity-75"
        />
      </form>
    </div>
  )
}
