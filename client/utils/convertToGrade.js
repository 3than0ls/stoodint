const map = {
  'A+': { min: 97, max: Infinity, message: 'Perfection!' },
  A: { min: 93, max: 97, message: 'Excellent!' },
  'A-': { min: 90, max: 93, message: 'Pretty Good!' },

  'B+': { min: 87, max: 90, message: 'Almost there!' },
  B: { min: 83, max: 87, message: 'Not bad!' },
  'B-': { min: 80, max: 83, message: 'A good start.' },

  'C+': { min: 77, max: 80, message: 'Could be better.' },
  C: { min: 73, max: 77, message: 'Needs some work.' },
  'C-': { min: 70, max: 73, message: 'Admittedly, not great.' },

  'D+': { min: 67, max: 70, message: 'Work harder.' },
  D: { min: 63, max: 67, message: 'Perhaps redo?' },
  'D-': { min: 60, max: 63, message: 'Pretty bad.' },

  F: { min: -Infinity, max: 60, message: 'Hot garbage.' },
}

const convertToGrade = (percent) => {
  for (const [grade, condition] of Object.entries(map)) {
    if (percent >= condition.min && percent < condition.max) {
      return { grade, message: condition.message }
    }
  }
  return { grade: 'X', message: 'Error' }
}

export default convertToGrade
