import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Question from './Question'
import { useText } from '../provider/TextProvider.jsx'

QuestionList.propTypes = {
  list: PropTypes.array
}

const PureQues = memo(Question, (prev, next) => {
  const { currentQuestion: { id } = {} } = next
  return prev.id !== id
})

function QuestionList(props) {
  const { list } = props
  const textContext = useText()

  return (
    <>
      {list.map(item => (
        <PureQues key={item.id} {...item} {...textContext} />
      ))}
    </>
  )
}

export default QuestionList
