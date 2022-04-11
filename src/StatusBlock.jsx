import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import CountdownStatus from './components/CountdownStatus.jsx'
import CountupStatus from './components/CountupStatus.jsx'

StatusBlock.propTypes = {
  mode: PropTypes.string,
  passList: PropTypes.array,
  sec: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

function StatusBlock(props) {
  const { mode, passList, sec } = props

  const statusInfo = useMemo(
    // passList 改變的時候也要重新繪製
    () => (mode === 'countdown' ? <CountdownStatus {...props} /> : <CountupStatus {...props} />),
    [mode, passList, sec]
  )

  return <div>{statusInfo}</div>
}

export default memo(StatusBlock, ({ passList: { length: pl } }, { passList: { length: nl } }) => {
  return pl === nl // 長度改變才動作
}) // TODO 這個好像是比較好的做法?
