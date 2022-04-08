// TODO -feature-
// TODO 重置按鈕
// TODO 自動把要輸入的放到眼前
// TODO 倒數計時?
// TODO 打幾個字統計時間?
// BUG 全部都輸入完的話會噴 error
// TODO 套用設定按鈕: 時間多長、或是要打幾個字
// TODO 定義所謂的 '一個字'
// TODO 樣式

// TODO -program-
// TODO 更新陣列裡單一項目的時候應該有比整個陣列刷掉更好的做法 -> 這個是要把 Question.jsx 那邊做 useMemo 那種快取: 資料沒變，就不變

import React, { useEffect } from 'react'

import QuestionList from './components/QuestionList.jsx'
import { useText } from './provider/TextProvider.jsx'

import './App.css'

function App() {
  // 包含了基本上是全部資料的 provider
  const { inputText, currentQuestion, setCurrentIndex, setInputText, textList, currentIndex, setTextInfo } = useText()

  const keyUpHandler = function (event) {
    const code = event.code
    if (code !== 'Space') return

    // 使用者按了空白，也就是送出
    const checkInput = inputText.trim()
    const pass = checkInput === currentQuestion.text

    // 把當前的這個項目的結果設定樣式, 並且同步更新 status
    setTextInfo(currentQuestion, { className: pass ? 'pass' : 'wrong', status: 'done' })

    // 移動題目
    setCurrentIndex(i => i + 1)

    // 清空輸入框
    setInputText('')
  }
  const onChangeHandler = function (event) {
    const value = event.target.value
    setInputText(value)
  }

  useEffect(() => {
    // 模擬 mounted
    // 幫第一筆綁上 typing 的樣式
    const firstText = textList[currentIndex]
    setTextInfo(firstText, { className: 'typing' })
  }, [])

  return (
    <div className="App">
      <QuestionList list={textList} />

      <div>
        <input autoFocus type="text" value={inputText} onChange={onChangeHandler} onKeyUp={keyUpHandler} />
      </div>
    </div>
  )
}

export default App
