import React, { useState } from 'react'
import firebase from '../firebase/Firebase'

export function Upload() {
  const [files, setFiles] = useState('')

  const handleChange = (e) => {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = (e) => {
      console.log('e.target.result', e.target.result)
      setFiles(e.target.result)
    }
  }

  const onSubmit = async () => {
    try {
      document.body.style.cursor = 'wait'
      await firebase.createQuestionsFromJSON(files)
    } catch (err) {
      console.log(err)
    }
    document.body.style.cursor = 'initial'
  }

  return (
    <>
      <h1>Upload Json file - Example</h1>

      <input type="file" onChange={handleChange} />
      <br />
      {'uploaded file content -- ' + files}
      <button className="bg-white" onClick={onSubmit}>
        submit
      </button>
    </>
  )
}
