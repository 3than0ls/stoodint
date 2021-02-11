import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ label, type, name, register, errors }) => {
  const error = () => {
    if (errors[name]) {
      return <p className="text-app-purple mt-2">{errors[name].message}</p>
    }
  }

  return (
    <div className="mb-4 lg:mb-8 w-96 flex flex-col">
      <label className="text-app-green text-center tracking-wide text-lg mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        ref={register}
        autoComplete="off"
        autoCorrect="off"
        className="text-center bg-transparent pb-1 border-b border-white text-app-light-blue-1 focus:outline-none focus:border-app-blue-3 transition duration-300"
      />
      {error()}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

export default InputField
