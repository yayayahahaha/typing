import React from 'react'
import PropTypes from 'prop-types'

import Question from './Question'

QuestionList.propTypes = {
  list: PropTypes.array
}

function QuestionList(props) {
  const { list } = props

  return (
    <>
      {list.map(item => (
        <Question key={item.id} item={item} />
      ))}
    </>
  )
}

export default QuestionList
