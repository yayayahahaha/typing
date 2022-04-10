import React from 'react'

import PropTypes from 'prop-types'
ModeSwitcher.propTypes = {
  mode: PropTypes.string,
  setMode: Function.prototype
}

function ModeSwitcher(props) {
  const { mode, setMode } = props

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
    </div>
  )
}

export default ModeSwitcher
