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

  const defaultValue = {
    sec: 3,
    targetWords: 3,
    gameStatus: 'ready'
  }

  const [sec, setSec] = useState(defaultValue.sec) // 秒數，可能是正數也可能是倒數
  const [direction, setDirection] = useState(-1) // 倒數
  const [targetWords, setTargetWords] = useState(defaultValue.targetWords) // 目標字數
  const [gamingSec, setGamingSec] = useState(sec)

  const [textListVisible, setHideTextListVisible] = useState(true)
  const textListClassName = useMemo(() => textListVisible ? '' : 'hide', [textListVisible])

  // 模式
  const [mode, setMode] = useState('countdown')
  // 遊戲狀態
  const [gameStatus, setGameStatus] = useState('ready')

  // 輸入框
  const [inputText, setInputText] = useState('')

  // 題目
  const [textList, setTextList] = useState([])

  // 正確答案
  // useMemo 因為都是整個刷掉所以好像沒有什麼 deep 不 deep 的問題
  const passList = useMemo(() => textList.filter(item => item.className === 'pass'), [textList])
  // 錯誤答案
  const wrongList = useMemo(() => textList.filter(item => item.className === 'wrong'), [textList])

  // setting 的樣式, 目前只用來當遮罩
  const settingClass = useMemo(() => `setting-${gameStatus}`, [gameStatus])

  // setting hash
  const settingHash = useMemo(() => `${mode}-${targetWords}`, [mode, targetWords])

  function createAnimalListByMode() {
    switch (mode) {
      case 'countdown':
        return createAnimalList(Number(gamingSec) * 8)
      case 'countup':
        return createAnimalList(Number(targetWords))
      default:
        console.warn('怎麼會到這裡')
        return []
    }
  }
  function setDirectionByMode() {
    switch (mode) {
      case 'countdown':
        return setDirection(-1)
      case 'countup':
        return setDirection(1)
      default:
        console.warn('怎麼會到這裡')
        return null
    }
  }

  const [afterMounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setTextList(createAnimalListByMode())
    setDirectionByMode()
  }, [mode])

  const [clock, setClock] = useState(null)
  useEffect(() => {
    if (gameStatus !== 'gaming') return
    if (clock) return

    // 設定此場遊戲的秒數, 可能會需要更好的方式來判斷'遊戲開始'?
    setGamingSec(sec)
    // 啟動時鐘
    setClock(setInterval(() => setSec(sec => sec + direction), 1000))
  }, [gameStatus])
  useEffect(() => {
    if (mode === 'countdown') {
      if (gameStatus !== 'gaming') return

      if (Number(sec) <= 0) {
        setGameStatus('end')
        resetClock()
        setHideTextListVisible(false)
      }
    }
  }, [sec])

  function resetClock() {
    setClock(clock => clearInterval(clock))
  }

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
    if (gameStatus !== 'gaming') return
    setGameStatus('end') // 這是打完的
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
    // TODO 如果在調整完秒數之後沒有 "開始後點選 reset" 的話
    // 畫面中的題目數量會維持在上一個秒數算出來的長度
    // 如果長度太短的話就會遇到使用者提早把項目完成的問題
    // 還是要改成打完一行就重刷一次新的 animalList ?

    const { focus = true } = config
    // 重置遊戲狀態
    setGameStatus(defaultValue.gameStatus)

    // 回到起始座標
    setCurrentIndex(0)

    // 重新綁定秒數
    setSec(() => gamingSec)

    // 重新產一個陣列
    const list = createAnimalListByMode()
    setTextList(list)

    // 重新啟動計時器
    resetClock()

    // 清空輸入字串
    setInputText('')

    // 重新讓字串出現在畫面上
    setHideTextListVisible(true)

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
        settingClass,

        // 正確陣列
        passList,
        // 錯誤陣列
        wrongList,

        textListClassName
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
