import React from 'react'
import PropTypes from 'prop-types'

import { useText } from '../provider/TextProvider.jsx'

Question.propTypes = {
  item: PropTypes.object
}

function Question(props) {
  const { item } = props
  const { currentQuestion, currentClass } = useText()

  return (
    <span className={item.id === currentQuestion.id ? currentClass : item.className} key={`${item.id}-word`}>
      {item.text}
    </span>
  )
}

export default Question
