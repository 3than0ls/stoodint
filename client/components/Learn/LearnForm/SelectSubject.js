import React from 'react'
import Label from '../../common/Form/Label'
import Select from 'react-select'

export default function SelectSubject({ setSelectedSubject, subjects }) {
  return (
    <div className="mt-2 mb-6 w-full lg:w-3/4">
      <Label label="1) Select a subject" />
      <hr className="border-white my-4" />
      <Select
        className="bg-black border-none"
        onChange={(value) => setSelectedSubject(value.value)}
        options={Object.values(subjects || []).map((subject) => ({
          value: subject,
          label: subject.name,
        }))}
      />
    </div>
  )
}
