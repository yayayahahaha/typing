import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

CountdownStatus.propTypes = {
  passList: PropTypes.array,
  sec: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

// Countdown: 幾秒鐘內可以完成幾個字
function CountdownStatus(props) {
  const { passList, sec } = props

  const completeWords = useMemo(() => passList.length, [passList])

  return (
    <div>
      <p>
        剩餘秒數: <span>{sec}</span>
      </p>
      <p>
        完成字數: <span>{completeWords}</span>
      </p>
    </div>
  )
}

export default CountdownStatus
