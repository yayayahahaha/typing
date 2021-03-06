// TODO -feature-
// TODO 自動把要輸入的放到眼前
// TODO 倒數計時?
// TODO 打幾個字統計時間?
// BUG 全部都輸入完的話會噴 error
// TODO 套用設定按鈕: 時間多長、或是要打幾個字
// TODO 定義所謂的 '一個字'
// TODO 樣式

// TODO -program-
// 改版: 如果上面的 setting 再這樣寫下去的話連動什麼的會變得非常奇怪
// 還是設定成點擊一個確定按鈕再去處理其他事情比較適合

import React, { memo } from 'react'

import ModeSwitcher from './ModeSwitcher.jsx'
import Description from './Description.jsx'
import Setting from './Setting.jsx'
import BackToDefault from './BackToDefault.jsx'
import StatusBlock from './StatusBlock.jsx'

import QuestionList from './components/QuestionList.jsx'
import { useText } from './provider/TextProvider.jsx'

import './App.scss'

const PureModeSwitcher = memo(ModeSwitcher)
const PureSetting = memo(Setting)
const PureDescription = memo(Description)
const PureBackToDefault = memo(BackToDefault, f => f /* 就只會渲染一次那種 */)

function App() {
  // 包含了基本上是全部資料的 provider
  const {
    inputText,
    currentQuestion,
    setCurrentIndex,
    setInputText,
    textList,
    currentIndex,
    setTextInfo,
    setInputDom,
    reset,

    gameStatus,
    setGameStatus,

    // 給 ModeSwitcher 用的
    sec,
    targetWords,
    mode,
    setMode,
    // 給 Setting 用的
    setSec,
    setTargetWords,
    // 給 back-to-default 用的
    defaultValue,
    // 用於遮罩
    settingClass,

    // 正確陣列
    passList,

    // 字串陣列的樣式, 目前用於隱藏
    textListClassName,

    setGamingSec
  } = useText()

  const keyPressHandler = function (event) {
    if (gameStatus !== 'end') setGameStatus('gaming')

    const code = event.code
    if (code !== 'Space') return

    // 清空輸入框
    setInputText('')
    if (gameStatus === 'end') return

    // 使用者按了空白，也就是送出
    const checkInput = inputText.trim()
    const pass = checkInput === currentQuestion.text

    // 把當前的這個項目的結果設定樣式, 並且同步更新 status
    setTextInfo(currentQuestion, { className: pass ? 'pass' : 'wrong', status: 'done' })

    // 移動題目
    setCurrentIndex(i => i + 1)
  }
  const onChangeHandler = function (event) {
    const value = event.target.value

    setInputText(value.trim())
  }

  return (
    <div className="App">
      <span>{gameStatus}</span>

      <div className={settingClass}>
        <PureModeSwitcher mode={mode} setMode={setMode} />
        <PureSetting
          mode={mode}
          sec={sec}
          targetWords={targetWords}
          setSec={setSec}
          setTargetWords={setTargetWords}
          setGamingSec={setGamingSec}
        />
        <PureDescription mode={mode} sec={sec} targetWords={targetWords} />
        <PureBackToDefault defaultValue={defaultValue} setSec={setSec} setTargetWords={setTargetWords} />
      </div>

      <hr />

      <StatusBlock mode={mode} sec={sec} passList={passList} />

      <div className="inputBlock">
        <QuestionList className={textListClassName} list={textList} />
        <div>
          <input
            ref={input => setInputDom(input)}
            autoFocus
            type="text"
            value={inputText}
            onChange={onChangeHandler}
            onKeyPress={keyPressHandler}
          />
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
