import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import chanceInit from 'chance'
import { v4 } from 'uuid'
const chance = chanceInit()

TextProvider.propTypes = {
  children: PropTypes.any
}

const animalList = createAnimalList()

const TextContext = createContext()
function TextProvider(props) {
  const { children } = props

  const defaultValue = {
    sec: 60,
    targetWords: 60,
    gameStatus: 'ready'
  }

  const [inputText, setInputText] = useState('')
  const [textList, setTextList] = useState(animalList)

  const [sec, setSec] = useState(defaultValue.sec) // 秒數，可能是正數也可能是倒數
  const [direction, setDirection] = useState(-1) // 倒數
  const [targetWords, setTargetWords] = useState(defaultValue.targetWords) // 目標字數

  // 模式
  const [mode, setMode] = useState('countdown')
  // 遊戲狀態
  const [gameStatus, setGameStatus] = useState('ready')

  // setting 的樣式
  const settingClass = useMemo(() => `setting-${gameStatus}`, [gameStatus])

  // setting hash
  const settingHash = useMemo(() => {
    return `${mode}-${sec}-${targetWords}`
  }, [mode, sec, targetWords])

  const [afterMounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!afterMounted) return

    reset({ focus: false })
    setGameStatus('ready')
  }, [settingHash])

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
    setGameStatus('end')
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

  function reset(config = {}) {
    const { focus = true } = config
    // 重置遊戲狀態
    setGameStatus(defaultValue.gameStatus)

    // 回到起始座標
    setCurrentIndex(0)

    // 重新產一個陣列
    setTextList(createAnimalList() /* TODO 這裡要根據使用者的設定產出正確的陣列 */)

    // 清空輸入字串
    setInputText('')

    // 讓關注點回到 input 框
    if (focus) inputDom.focus()
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

        // 模式
        mode,
        setMode,

        // 秒數，可能是正數也可能是倒數
        sec,
        setSec,

        // 正數 or 倒數的方向
        direction,
        setDirection,

        // 如果是 countup mode 的目標字數
        targetWords,
        setTargetWords,

        // 預設值
        defaultValue,

        // 遊戲狀態相關
        gameStatus,
        setGameStatus,

        // 遮罩
        settingClass
      }}
    >
      {children}
    </TextContext.Provider>
  )
}

function createAnimalList(length = 5) {
  const list = []
  _createList(length, list)

  function _createList(length, list) {
    ;[...Array(length - list.length)]
      .map(() => {
        return {
          id: v4(),
          text: chance.animal().replace(/^./, t => t.toLowerCase()),
          className: 'normal',
          status: 'wait'
        }
      })
      .filter(animalInfo => /^\w+$/.test(animalInfo.text)) // 暫時解掉中間有怪怪字元的問題
      .forEach(item => list.push(item))

    if (list.length < length) _createList(length, list)
  }

  return list
}

export const useText = () => useContext(TextContext)
export default TextProvider
