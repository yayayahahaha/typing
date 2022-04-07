// TODO -feature-
// TODO 倒數計時?
// TODO 打幾個字統計時間?
// TODO 重置按鈕
// TODO 套用設定按鈕: 時間多長、或是要打幾個字
// TODO 定義所謂的 '一個字'

// TODO -program-
// TODO 拆分 component ?

import React, { useEffect, useMemo, useState } from 'react'

import chanceInit from 'chance'
import { v4 } from 'uuid'

import './App.css'

const chance = chanceInit()

function App() {
  const animalList = createAnimalList()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputText, setInputText] = useState('')
  const [textList, setTextList] = useState(animalList)

  // 當前的題目
  const currentQuestion = useMemo(() => textList[currentIndex])
  // 當前題目的樣式: typing, good, bad
  const currentClass = useMemo(() => {
    const checkInput = inputText.trim()
    const reg = new RegExp(`^${checkInput}`)

    let typingClass = 'typing '
    switch (true) {
      case !checkInput:
        break
      case reg.test(currentQuestion.text):
        typingClass += 'good'
        break
      case !reg.test(currentQuestion.text):
      case checkInput.length > currentQuestion.text.length:
        typingClass += 'bad'
        break
    }

    return typingClass
  })

  const keyUpHandler = function (event) {
    const code = event.code
    if (code !== 'Space') return

    // 使用者按了空白，也就是送出
    const checkInput = inputText.trim()
    const pass = checkInput === currentQuestion.text

    // 把當前的這個項目的結果設定樣式
    setTextInfo(currentQuestion, { className: pass ? 'pass' : 'wrong' })

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
    // 幫第一筆綁上 typing 的樣式
    const firstText = textList[currentIndex]
    setTextInfo(firstText, { className: 'typing' })
  }, [])

  function setTextInfo(tId, attribute) {
    // 這裡應該有一個不用更新整個陣列的方式?
    const list = textList.map(item => Object.assign(item, tId === item.id ? attribute : {}))
    setTextList(list)
  }

  return (
    <div className="App">
      {textList.map(item => (
        <span className={item.id === currentQuestion.id ? currentClass : item.className} key={`${item.id}-word`}>
          {item.text}
        </span>
      ))}

      <div>
        <input autoFocus type="text" value={inputText} onChange={onChangeHandler} onKeyUp={keyUpHandler} />
      </div>
    </div>
  )
}

function createAnimalList(length = 400) {
  const list = [...Array(length)]
    .map(() => {
      return {
        id: v4(),
        text: chance.animal().replace(/^./, t => t.toLowerCase()),
        className: 'normal'
      }
    })
    .filter(animalInfo => /^\w+$/.test(animalInfo.text)) // 暫時解掉中間有怪怪字元的問題
  return list
}

export default App
