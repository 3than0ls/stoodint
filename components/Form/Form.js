import React, { useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import AnswerInput from './AnswerInput/AnswerForm'
import Seperator from './Seperator'

export default function Form() {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = useCallback(async (data) => {
    console.log(data)
  })

  //   useEffect(
  //     (err) => {
  //       console.log(errors.answers)
  //     },
  //     [errors]
  //   )

  return (
    <div className="w-full p-4 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="question"
          label="Question"
          placeholder="Input question"
          register={register}
          errors={errors}
        />
        <Seperator />
        <AnswerInput register={register} errors={errors} />
        <Seperator />
        <input
          type="submit"
          value="Submit"
          className="my-4 py-4 px-24 rounded-2xl transition duration-300 focus:outline-none 
                    bg-app-blue-1 mx-auto text-white cursor-pointer hover:bg-opacity-75 transition"
        />
      </form>
    </div>
  )
}
