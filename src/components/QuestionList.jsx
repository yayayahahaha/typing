import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Question from './Question'
import { useText } from '../provider/TextProvider.jsx'

QuestionList.propTypes = {
  list: PropTypes.array
}

const PureQues = memo(Question, (prev, next) => {
  // true 的話不會改變， false 的話會吃到異動
  const {
    currentQuestion: { id: cid },
    currentClass: pcc,
    status: pst
  } = next
  const { id: pid, status: nst, currentClass: ncc } = prev

  return (
    (pid !== cid /* 判斷是不是當前 question */ || pcc === ncc) /* 是當前 question 的話避免 good -> good 的改變 */ &&
    pst === nst /* 送出之後，status 會改變，進而同步到最後停留的樣式 */
  )
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
