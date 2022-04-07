import React from 'react'
import PropTypes from 'prop-types'

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
        <span className={item.id === currentQuestion.id ? currentClass : item.className} key={`${item.id}-word`}>
          {item.text}
        </span>
      ))}
    </>
  )
}

export default QuestionList
