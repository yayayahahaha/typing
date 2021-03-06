import React from 'react'
import PropTypes from 'prop-types'

import { isNumber } from './utils/index.js'

// TODO 錯誤提示 for input 出錯的時候

Setting.propTypes = {
  mode: PropTypes.string,
  sec: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  targetWords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSec: PropTypes.func,
  setTargetWords: PropTypes.func
}

function Setting(props) {
  const { mode, sec, targetWords, setSec, setTargetWords } = props

  function secChanged() {
    const {
      target: { value }
    } = event
    setSec(sec)
    if (value === '') return setSec('')
    if (!isNumber(value)) return // TODO 錯誤提示
    setSec(Number(value))
  }
  function targetWordsChanged() {
    const {
      target: { value }
    } = event
    setTargetWords(targetWords)
    if (value === '') return setTargetWords('')
    if (!isNumber(value)) return // TODO 錯誤提示
    setTargetWords(Number(value))
  }

  const countdowmSetting = (
    <span>
      秒數: <input type="text" value={sec} onChange={secChanged} />
    </span>
  )
  const countupSetting = (
    <span>
      字數: <input type="text" value={targetWords} onChange={targetWordsChanged} />
    </span>
  )

  return <div>{mode === 'countdown' ? countdowmSetting : countupSetting}</div>
}

export default Setting
