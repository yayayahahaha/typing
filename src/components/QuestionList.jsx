import React from 'react'
import PropTypes from 'prop-types'

import Question from './Question'

QuestionList.propTypes = {
  list: PropTypes.array,
  currentQuestion: PropTypes.object,
  currentClass: PropTypes.string
}

function QuestionList(props) {
  const { list, currentQuestion, currentClass } = props

  return (
    <>
      {list.map(item => (
        <Question key={item.id} item={item} currentQuestion={currentQuestion} currentClass={currentClass} />
      ))}
    </>
  )
}

export default QuestionList
