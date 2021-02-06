import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Input from '~/components/common/Input'
import Seperator from '~/components/common/Seperator'
import axiosUtils from '~/utils/axios'

export default function SetForm() {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = useCallback(async (data) => {
    axiosUtils.createQuestionSet(data)
  })
  return (
    <div className="w-full p-4 text-center">
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
        <p className="mt-8 text-white text-3xl ">
          We're gonna add drag and drop images soon for a Set banner
        </p>
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
