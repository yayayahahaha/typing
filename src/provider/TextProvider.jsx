import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import chanceInit from 'chance'
import { v4 } from 'uuid'
const chance = chanceInit()

TextProvider.propTypes = {
  children: PropTypes.any
}

const TextContext = createContext()
function TextProvider(props) {
  const { children } = props

  const animalList = createAnimalList()

  const [inputText, setInputText] = useState('')
  const [textList, setTextList] = useState(animalList)

  const [sec, setSec] = useState(0) // 秒數，可能是正數也可能是倒數
  const [direction, setDirection] = useState(-1) // 倒數
  const [targetWords, setTargetWords] = useState(10) // 目標字數

  const [currentIndex, setCurrentIndex] = useState(0)
  // 當前的題目
  const currentQuestion = useMemo(() => textList[currentIndex])
  // 當前題目的樣式: typing, good, bad
  const currentClass = useMemo(() => {
    if (currentQuestion === undefined) return // 代表打完了

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

  useEffect(() => {
    if (currentIndex < textList.length) return
    console.log('超過啦')
  }, [currentIndex])

  useEffect(() => {
    if (currentQuestion === undefined) return

    if (currentQuestion.status !== 'wait') return
    setTextInfo(currentQuestion, { status: 'typing' })
  }, [currentQuestion])

  function setTextInfo({ id: tId }, attribute) {
    // 這裡應該有一個不用更新整個陣列的方式? A: 沒有, 大家都說沒有
    const list = textList.map(item => Object.assign(item, tId === item.id ? attribute : {}))
    setTextList(list)
  }

  function reset() {
    // 回到起始座標
    setCurrentIndex(0)

    // 重新產一個陣列
    setTextList(createAnimalList())

    // 清空輸入字串
    setInputText('')

    // 讓關注點回到 input 框
    inputDom.focus()
  }
  const [inputDom, setInputDom] = useState(null)

  return (
    <TextContext.Provider
      value={{
        // 當前題目的座標
        currentIndex,
        setCurrentIndex,

        // 當前坐標指到的題目實體
        currentQuestion,
        currentClass,

        // 當前輸入的文字
        inputText,
        setInputText,

        // 當前的題目列表
        textList,
        setTextList, // update whole question-list
        setTextInfo, // update single question

        // 重置所有
        reset,

        // 取得當前 input 框的 DOM
        setInputDom,

        // 秒數，可能是正數也可能是倒數
        sec,
        setSec,

        // 正數 or 倒數的方向
        direction,
        setDirection,

        // 如果是 countup mode 的目標字數
        targetWords,
        setTargetWords
      }}
    >
      {children}
    </TextContext.Provider>
  )
}

function createAnimalList(length = 5) {
  const list = [...Array(length)]
    .map(() => {
      return {
        id: v4(),
        text: chance.animal().replace(/^./, t => t.toLowerCase()),
        className: 'normal',
        status: 'wait'
      }
    })
    .filter(animalInfo => /^\w+$/.test(animalInfo.text)) // 暫時解掉中間有怪怪字元的問題
  return list
}

export const useText = () => useContext(TextContext)
export default TextProvider
