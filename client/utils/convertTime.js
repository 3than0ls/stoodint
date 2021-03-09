const convertMillsecondToString = (milliseconds) => {
  let seconds = milliseconds / 1000
  let string = ''

  if (seconds >= 60) {
    let minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)

    string += `${minutes} minute${minutes === 1 ? '' : 's'}`
    if (seconds) {
      string += ` and ${seconds} second${seconds === 1 ? '' : 's'}`
    }
    return { string, minutes, seconds }
  } else {
    seconds = Math.round(seconds * 10) / 10
    string += `${seconds} second${seconds === 1 ? '' : 's'}`
    return { string, seconds }
  }
}

export default convertMillsecondToString
