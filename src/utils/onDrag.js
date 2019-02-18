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

export default onDrag
