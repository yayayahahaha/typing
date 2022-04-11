import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Question from './Question'
import { useText } from '../provider/TextProvider.jsx'

QuestionList.propTypes = {
  list: PropTypes.array,
  className: PropTypes.string
}

const PureQues = memo(Question, (prev, next) => {
  // true 的話不會改變， false 的話會吃到異動
  const {
    currentQuestion: { id: cid = 'default-id' } = {
      /* 用到這個預設值的時候代表結束了 */
    },
    currentClass: pcc,
    status: pst
  } = next
  const { id: pid, status: nst, currentClass: ncc } = prev

  // 由於通常都是 true 會改變，有點反過來了所以多寫了一些註解:
  // 1. previous-id !== current-id: 也就是除了當前 current 的以外都不會動
  // 2. 就算 previous-id 和 current-id 相等，如果他的 className 沒有換的話也不動: 綠色就是綠色，紅色就是紅色
  // 3. 如果 status 狀態不同的話一定會改變: wait 到 done 之類的

  return (pid !== cid || pcc === ncc) && pst === nst
})

function QuestionList(props) {
  const { list, className } = props
  const textContext = useText()

  return (
    <div className={className}>
      {list.map(item => (
        <PureQues key={item.id} {...item} {...textContext} />
      ))}
    </div>
  )
}

export default QuestionList
