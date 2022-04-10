import { useMemo, useState } from 'react'

// TODO 這裡'取代'的方式可以想一下要怎麼才能做出跳脫字元感
function useDescription(rowValue, rowParagraph, { replaceTarget = /\$/ } = {}) {
  const [value, setValue] = useState(rowValue)
  const [paragraph] = useState(rowParagraph)

  const result = useMemo(() => paragraph.replace(replaceTarget, value), [value, paragraph])

  return [result, setValue]
}

export default useDescription
