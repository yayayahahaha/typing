import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

CountdownStatus.propTypes = {
  mode: PropTypes.string,
  passList: PropTypes.array
}

function CountdownStatus(props) {
  // NEXT 處理遊戲開始後的呈現細節

  const { mode, passList, sec, targetWords } = props

  useEffect(() => {
    console.log('whyyyyyyy', passList)
  }, [passList])

  return <div>CountdownStatus</div>
}

export default CountdownStatus
