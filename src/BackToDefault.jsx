import React from 'react'
import PropTypes from 'prop-types'

BackToDefault.propTypes = {
  defaultValue: PropTypes.object,
  setSec: PropTypes.func,
  setTargetWords: PropTypes.func
}

function BackToDefault(props) {
  const { defaultValue, setSec, setTargetWords } = props

  function backToDefault() {
    const { sec, targetWords } = defaultValue
    setSec(sec)
    setTargetWords(targetWords)
  }

  return <button onClick={backToDefault}>back to default</button>
}

export default BackToDefault
