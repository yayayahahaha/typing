import React, { useState } from 'react'

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
    console.log('keyUpHandler')
    const code = event.code
    if (code !== 'Space') return

    const checkInput = inputText.trim()
    const currentQuestion = textList[currentIndex].text
    const pass = checkInput === currentQuestion
    textList[currentIndex].className = pass ? 'pass' : 'wrong'

    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex) // 這個好像會有什麼問題我忘了
    textList[nextIndex].className = 'typing'

    setInputText('')
  }
  const onChangeHandler = function (event) {
    console.log('onChangeHandler')
    const value = event.target.value
    setInputText(value)
  }

  return (
    <div className="App">
      {textList.map(item => (
        <>
          <span className={item.className} key={`${item.id}-word`}>
            {item.text}
          </span>
          <span key={`${item.id}-space`}> </span>
        </>
      ))}

      <div>
        <input type="text" value={inputText} onChange={onChangeHandler} onKeyUp={keyUpHandler} />
      </div>
    </div>
  )
}

function createAnimalList(length = 400) {
  const list = [...Array(length)]
    .map(() => {
      return {
        id: v4(),
        text: chance.animal(),
        className: 'normal'
      }
    })
    .filter(animalInfo => !/\s/.test(animalInfo.text)) // 暫時解掉中間有空白的問題
  list[0].className = 'typing'
  return list
}

export default App
