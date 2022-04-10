import React, { useState, useEffect } from 'react'

import useDescription from './hooks/description.js'

import PropTypes from 'prop-types'
ModeSwitcher.propTypes = {
  sec: PropTypes.number,
  targetWords: PropTypes.any
}

function ModeSwitcher(props) {
  const { sec, targetWords } = props
  const [mode, setMode] = useState('countdown')

  const rowCountdownDescription = '$ 秒內可以完成多少個字'
  const rowCountupDescription = '完成 $ 個字需要多少時間'

  const [countdownDescription, setCountdownDescription] = useDescription(sec, rowCountdownDescription)
  const [countupDescription, setCountupDescription] = useDescription(targetWords, rowCountupDescription)

  useEffect(() => {
    setCountdownDescription(sec)
    setCountupDescription(targetWords)
  }, [sec, targetWords])

  function handleModeChande(event) {
    const {
      target: { value }
    } = event
    setMode(value)
  }

  return (
    <div>
      <div>
        模式選擇:
        <label>
          <input
            type="radio"
            name="radio-mode"
            value="countdown"
            checked={mode === 'countdown'}
            onChange={handleModeChande}
          />
          <span>比字數</span>
        </label>
        <label>
          <input
            type="radio"
            name="radio-mode"
            value="countup"
            checked={mode === 'countup'}
            onChange={handleModeChande}
          />
          <span>比時間</span>
        </label>
      </div>
      {mode === 'countdown' ? <p>{countdownDescription}</p> : <p>{countupDescription}</p>}
    </div>
  )
}

export default ModeSwitcher
