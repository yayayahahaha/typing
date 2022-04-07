// TODO 倒數計時?
// TODO 打幾個字統計時間?
// TODO 重置按鈕
// TODO 套用設定按鈕: 時間多長、或是要打幾個字
// TODO 定義所謂的 '一個字'
// TODO 拆分 component ?

import React, { useEffect, useState } from 'react'

import chanceInit from 'chance'
import { v4 } from 'uuid'

import './App.css'

const chance = chanceInit()

function App() {
  const animalList = createAnimalList()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputText, setInputText] = useState('')
  const [textList, setTextList] = useState(animalList)

  const keyUpHandler = function (event) {
    const code = event.code
    const checkInput = inputText.trim()
    const currentQuestion = textList[currentIndex]
    const reg = new RegExp(`^${checkInput}`)

    if (code !== 'Space') {
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

      return setTextInfo(currentQuestion, { className: typingClass })
    }

    const pass = checkInput === currentQuestion.text
    setTextInfo(currentQuestion, { className: pass ? 'pass' : 'wrong' })

    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    const nextQuestion = textList[nextIndex]

    // TODO 這邊要不要改寫成類似 className 是 computed 的做法、
    // 然後在 for 迴圈那邊使用 if index === currentIndex 的方式做自動綁定?

    setTextInfo(nextQuestion, { className: 'typing' })

    setInputText('')
  }
  const onChangeHandler = function (event) {
    const value = event.target.value
    setInputText(value)
  }

  useEffect(() => {
    const firstText = textList[currentIndex]
    setTextInfo(firstText, { className: 'typing' })
  }, [])

  function setTextInfo(target, attribute) {
    const list = textList.map(item => {
      if (item.id !== target.id) return item
      return Object.assign(item, attribute)
    })
    setTextList(list)
  }

  return (
    <div className="App">
      {textList.map(item => (
        <span className={item.className} key={`${item.id}-word`}>
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
