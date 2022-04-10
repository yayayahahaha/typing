import React, { useEffect } from 'react'
import useDescription from './hooks/description.js'
import PropTypes from 'prop-types'

Description.propTypes = {
  mode: PropTypes.string,
  sec: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  targetWords: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

function Description(props) {
  const { mode, sec, targetWords } = props

  const rowCountdownDescription = '$ 秒內可以完成多少個字'
  const rowCountupDescription = '完成 $ 個字需要多少時間'

  const [countdownDescription, setCountdownDescription] = useDescription(sec, rowCountdownDescription)
  const [countupDescription, setCountupDescription] = useDescription(targetWords, rowCountupDescription)

  useEffect(() => {
    setCountdownDescription(sec)
    setCountupDescription(targetWords)
  }, [sec, targetWords])

  if (mode === 'countdown') {
    return <p>{countdownDescription}</p>
  } else {
    return <p>{countupDescription}</p>
  }
}

export default Description
