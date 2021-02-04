import React from 'react'
import Label from './Label'

export default function Input({ register, label, placeholder, name, errors }) {
  return (
    <div className="w-5/6 mx-auto flex flex-col">
      <Label label={label} />
      {errors[name] && (
        <div className="text-app-blue-2 text-left">This field is required</div>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        ref={register({ required: true })}
        className="rounded-lg bg-gray-100 hover:bg-gray-200 outline-none transition p-2 border-2 border-gray-600"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  )
}
