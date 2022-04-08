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
  const { id, text, className: itemClass, currentQuestion, currentClass, inputText } = props

  const useClass = useMemo(() => {
    return id === currentQuestion.id ? currentClass : itemClass
  }, [id, currentQuestion, inputText])

  // console.log('id:', id)

  return (
    <span id={`question-${id}`} className={useClass} key={`${id}-word`}>
      {text}
    </span>
  )
}

export default Question
