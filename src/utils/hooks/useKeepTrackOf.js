import {useRef, useEffect} from 'react'

function useKeepTrackOf(value) {
  const valueRef = useRef(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef
}

export default useKeepTrackOf
