import React from 'react'
import PropTypes from 'prop-types'

Question.propTypes = {
  item: PropTypes.object,
  currentQuestion: PropTypes.object,
  currentClass: PropTypes.string
}

function Question(props) {
  const { item, currentQuestion, currentClass } = props

  return (
    <span className={item.id === currentQuestion.id ? currentClass : item.className} key={`${item.id}-word`}>
      {item.text}
    </span>
  )
}

export default Question
