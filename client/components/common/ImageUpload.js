import React from 'react'
import Label from './Label'
import Seperator from './Seperator'

export default function ImageUpload({
  getRootProps,
  getInputProps,
  label,
  inputText,
  errors,
  imagePreview,
  ...props
}) {
  return (
    <div className={`w-5/6 mx-auto flex flex-col mt-8 ${props.className}`}>
      <Label label={label} />
      {errors.dataUrl && (
        <div className="text-app-blue-2 text-left">
          There was an error uploading this image
        </div>
      )}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg mx-auto w-5/6 py-12 transition duration-300 bg-white hover:bg-app-light-blue-1 outline-none`}
      >
        <input {...getInputProps({ name: 'image', accept: 'image/*' })} />
        <p className="text-lg md:text-xl">
          {inputText || 'Drag or upload files'}
        </p>
        <img
          className={`w-full max-h-72 md:max-h-96 object-contain ${
            imagePreview ? 'mt-8' : ''
          }`}
          src={imagePreview}
        />
      </div>
    </div>
  )
}
