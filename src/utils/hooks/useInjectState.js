import {useState} from 'react'

function useInjectState(stateValue, stateSetter = () => {}) {
  const [value, setValue] = useState(stateValue)
  const setInjectedValue = newValue => {
    setValue(oldValue => {
      const v = typeof newValue === 'function' ? newValue(oldValue) : newValue
      stateSetter(v)
      return v
    })
  }
  return [value, setInjectedValue]
}

export default useInjectState
