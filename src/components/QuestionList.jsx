import React from 'react'
import PropTypes from 'prop-types'

import Question from './Question'
import { useText } from '../provider/TextProvider.jsx'

QuestionList.propTypes = {
  list: PropTypes.array
}

function QuestionList(props) {
  const { list } = props
  const textContext = useText()

  return (
    <>
      {list.map(item => (
        <Question key={item.id} {...item} {...textContext} />
      ))}
    </>
  )
}

export default QuestionList
