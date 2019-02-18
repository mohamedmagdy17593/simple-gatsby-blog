import React from 'react'
import styled from '@emotion/styled'

import darkImg from '../assets/dark.jpg'
import lightImg from '../assets/light.png'
import {useTheme} from './layout'

const ResizeHandler = styled.div(({theme: {color: background}}) => ({
  background,
  cursor: 'col-resize',
  width: 20,
}))

const ImageContainer = styled.div(
  ({flexGrow, imgPosition, img, transitionTime}) => ({
    height: '100%',
    flexGrow,
    overflow: 'hidden',
    backgroundImage: `url(${img})`,
    backgroundPosition: imgPosition,
    backgroundRepeat: 'repeat',
    transition: `flex ${transitionTime}s ease`,
  }),
)

function onDrag({down = () => {}, up = () => {}, move = () => {}}) {
  return {
    onMouseDown(e) {
      down(e)
      const mousemove = e => move(e)
      const mouseup = e => {
        up(e)
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
      }
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('mouseup', mouseup)
    },
  }
}

function useKeepTrackOf(value) {
  const valueRef = React.useRef(value)
  React.useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef
}

function Hero() {
  const {isDark, setIsDark} = useTheme()
  const [flexGrow, setFlexGrow] = React.useState(+isDark)
  const flexGrowRef = useKeepTrackOf(flexGrow)
  const [transitionTime, setTransitionTime] = React.useState(1)

  const moveAction = e => setFlexGrow(e.pageX / window.innerWidth)
  const upAction = () => {
    const isDark = flexGrowRef.current < 0.5
    setIsDark(isDark)
    setFlexGrow(+!isDark)
  }

  React.useEffect(() => {
    setFlexGrow(+!isDark)
  }, [isDark])

  React.useEffect(() => {
    setTimeout(() => {
      setTransitionTime(0.1)
    }, 1000)
  }, [])

  return (
    <div
      css={{
        userSelect: 'none',
        width: '100%',
        height: 400,
        position: 'absolute',
        top: 100,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <ImageContainer
        flexGrow={flexGrow}
        imgPosition="left"
        img={lightImg}
        transitionTime={transitionTime}
      />
      <ResizeHandler {...onDrag({move: moveAction, up: upAction})} />
      <ImageContainer
        flexGrow={1 - flexGrow}
        imgPosition="right"
        img={darkImg}
        transitionTime={transitionTime}
      />
    </div>
  )
}

export default Hero
