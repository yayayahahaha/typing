import React, { useState, useEffect } from 'react'

function ModeSwitcher() {
  const [mode, setMode] = useState('countdown')

  useEffect(() => {
    console.log('mode:', mode)
  }, [mode])

  function handleModeChande(event) {
    const {
      target: { value }
    } = event
    setMode(value)
  }

  return (
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
  )
}

export default ModeSwitcher
