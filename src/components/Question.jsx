import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

Question.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  currentQuestion: PropTypes.object,
  currentClass: PropTypes.string,
  inputText: PropTypes.string
}

function Question(props) {
  const {
    id,
    text,
    className: itemClass,
    currentQuestion: { id: cid = 'default-id' } = {},
    currentClass,
    inputText
  } = props

  const useClass = useMemo(() => {
    return id === cid ? currentClass : itemClass
  }, [id, cid, inputText])

  // console.log('id:', id) // 用於檢測否被重複渲染

  return (
    <span id={`question-${id}`} className={useClass} key={`${id}-word`}>
      {text}
    </span>
  )
}

export default Question
