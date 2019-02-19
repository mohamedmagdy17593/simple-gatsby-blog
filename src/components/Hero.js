import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'

import {useTheme} from './layout'
import onDrag from '../utils/onDrag'
import useKeepTrackOf from '../utils/hooks/useKeepTrackOf'

import darkImg from '../assets/dark.png'
import lightImg from '../assets/light.jpg'

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

function Hero() {
  const {isDark, setIsDark} = useTheme()
  const [flexGrow, setFlexGrow] = useState(+isDark)
  const flexGrowRef = useKeepTrackOf(flexGrow)

  const transationTime = 0.6
  const [transitionTime, setTransitionTime] = useState(transationTime)

  const down = () => setTransitionTime(0)
  const move = e => setFlexGrow(e.pageX / window.innerWidth)
  const up = () => {
    const isDark = flexGrowRef.current < 0.5
    setTransitionTime(transationTime)
    setIsDark(isDark)
    setFlexGrow(+!isDark)
  }

  useEffect(() => {
    setFlexGrow(+!isDark)
  }, [isDark])

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
      <ResizeHandler {...onDrag({move, up, down})} />
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
