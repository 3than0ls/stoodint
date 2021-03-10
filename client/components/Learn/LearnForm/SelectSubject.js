import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import Label from '../../common/Form/Label'
import Select from 'react-select'

export default function SelectSubject({
  setSelectedSubject,
  selectedSubject,
  subjects,
}) {
  const router = useRouter()

  const optionsList = useMemo(() =>
    Object.values(subjects || []).map((subject) => ({
      value: subject,
      label: subject.name,
    }))
  )

  const initValue = useMemo(() => {
    if (selectedSubject !== undefined) {
      return {
        value: selectedSubject,
        label: selectedSubject.name,
      }
    }
  }, [selectedSubject])

  return (
    <div className="mt-2 mb-6 w-full lg:w-3/4">
      <Label label="1) Select a subject" />
      <hr className="border-white my-4" />
      <Select
        className="bg-black border-none"
        onChange={(value) => {
          if (value.label !== selectedSubject?.name) {
            setSelectedSubject(value.value)
            router.replace({
              pathname: '/learn',
              query: { sID: value.value.id },
            })
          }
        }}
        value={initValue}
        options={optionsList}
      />
    </div>
  )
}
