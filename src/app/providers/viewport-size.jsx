import React, { useEffect, useState } from 'react'

const defaultValue = {
  height: 0,
  width: 0
}

export const ViewportSizeContext = React.createContext(defaultValue)

export const ViewportSize = (component) => () => {
  const [viewportSize, setViewportSize] = useState({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })

  useEffect(() => {
    let stateViewportSize = {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    }

    const resizeHandler = () => {
      if (
        Math.abs(
          stateViewportSize.height - document.documentElement.clientHeight
        ) >
          stateViewportSize.height / 100 ||
        Math.abs(
          stateViewportSize.width - document.documentElement.clientWidth
        ) >
          stateViewportSize.width / 100
      ) {
        stateViewportSize = {
          height: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth
        }

        // Значение высоты/ширины окна браузера устанавливается только если эти изменения превышают 1%
        // Сделано так чтобы избежать огромного количества перерендоров
        setViewportSize(stateViewportSize)
      }
    }

    window.addEventListener('resize', () => resizeHandler())

    return () => window.removeEventListener('resize', () => resizeHandler())
  }, [setViewportSize])

  return (
    <ViewportSizeContext.Provider value={viewportSize}>
      {component()}
    </ViewportSizeContext.Provider>
  )
}
