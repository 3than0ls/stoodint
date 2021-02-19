import React from 'react'
import Label from './Label'

export default function Input({
  register,
  label,
  placeholder,
  name,
  errors,
  ...props
}) {
  return (
    <div className={`w-11/12 mx-auto flex flex-col ${props.className}`}>
      <Label label={label} />
      {errors[name] && (
        <div className="text-app-blue-2 text-left">This field is required</div>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        ref={register({ required: true })}
        className="rounded-lg bg-gray-100 hover:bg-gray-200 outline-none transition p-2 md:p-3 text-lg lg:text-xl border-2 border-gray-600 text-black"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  )
}
