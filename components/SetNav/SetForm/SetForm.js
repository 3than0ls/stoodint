import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '~/components/common/Input'
import { useDropzone } from 'react-dropzone'
import Seperator from '~/components/common/Seperator'
import axiosUtils from '~/utils/axios'
import ImageUpload from '~/components/common/ImageUpload'

export default function SetForm() {
  const { register, handleSubmit, errors, getValues, setValue } = useForm()
  const [imagePreview, setImagePreview] = useState(undefined)

  const onDropAccepted = React.useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0]
    if (!getValues('dataUrl')) {
      register('dataUrl', {})
    }
    if (!getValues('image')) {
      register('image', {})
    }
    const reader = new FileReader()
    reader.onload = function () {
      setValue('image', acceptedFile)
      setValue('dataUrl', reader.result)
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
    if (!data.dataUrl) {
      data.dataUrl = null
    }
    try {
      axiosUtils.createQuestionSet(data)
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <div className="w-full p-4 text-center h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Question Set Name"
          placeholder="Set Name"
          register={register}
          errors={errors}
        />
        <Input
          className="mt-6"
          name="description"
          label="Question Set Description"
          placeholder="Set Description"
          register={register}
          errors={errors}
        />
        <ImageUpload
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          errors={errors}
          inputText="Optional. Drag or upload an image. Reccomended resolution: 1200x500"
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
