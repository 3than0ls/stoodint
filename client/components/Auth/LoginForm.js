import React, { useState, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import InputField from './InputField'
import axiosUtils from '~/client/utils/axios'
import AuthContext from '../../context/auth-context'

export default function LoginForm() {
  const { register, handleSubmit, errors, setError } = useForm()
  const { login, logout } = useContext(AuthContext)
  const [authError, setAuthError] = useState(undefined)
  const router = useRouter()

  const onSubmit = useCallback(async (data) => {
    const { email, password } = data
    try {
      await axiosUtils.signInWithEmailAndPassword({
        email,
        password,
      })
      setAuthError(false)
      login()
      router.push('/')
      // need to redirect
    } catch (err) {
      console.log(err)
      logout()
      setAuthError('Username or password does not exist or is incorrect')
    }
  })

  return (
    <div className="fixed w-full bg-gradient-to-b from-app-blue-2 via-app-blue-1 to-app-dark-blue flex flex-row justify-between items-center text-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto pt-8 lg:pt-0 lg:m-0 px-12 lg:px-32 lg:pr-64 h-screen w-auto flex flex-col lg:justify-center items-center bg-app-dark-blue rounded-none lg:rounded-r-full shadow-2xl"
      >
        <div className="flex flex-col mb-4 lg:mb-8">
          <h1 className="font-bold tracking-wide text-4xl lg:text-5xl text-app-green text-center">
            Site Admin Login
          </h1>
          <p className="text-2xl lg:text-3xl mt-2 text-app-blue-3 text-center">
            Enter your details below
          </p>
        </div>
        <InputField
          label="Enter Email"
          type="text"
          name="email"
          register={register({
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Enter a valid email address',
            },
          })}
          errors={errors}
        />
        <InputField
          label="Enter Password"
          name="password"
          type="password"
          register={register({
            required: {
              value: true,
              message: 'Password is required',
            },
          })}
          errors={errors}
        />
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
      <img
        draggable="false"
        src="/lightbulb.png"
        alt="lightbulb"
        className="no-select hidden xl:block w-1/4 object-contain max-h-screen mr-16"
      />
    </div>
  )
}
