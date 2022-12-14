import { useContext } from 'react'
import { ViewportSizeContext } from '../../app/providers/viewport-size'

export const Position = {
  CENTER: 'center',
  EDGE: 'edge'
}

export const Translate = {
  X: 'translateX',
  Y: 'translateY'
}

/**
 * Возвращает оптимальное количество пикселей чтобы скрыть элемент за пределы экрана
 *
 * @param {string} from От ('center', 'edge')
 * @param {string} to к ('center', 'edge')
 * @param {string} translate Размер по горизонтали ('translateX') или вертикали ('translateY')
 * @return {number}
 */
export const useGetOutsideTranslate = (from, to, translate) => {
  const { height, width } = useContext(ViewportSizeContext)

  let size = 0
  switch (translate) {
    case Translate.X:
      size = width
      break
    case Translate.Y:
      size = height
      break
  }

  let result = 0
  switch (from) {
    case Position.CENTER:
      if (to === Position.CENTER) {
        result = 0
      }
      if (to === Position.EDGE) {
        result = size / 2
      }
      break
    case Position.EDGE:
      if (to === Position.CENTER) {
        result = size / 2
      }
      if (to === Position.EDGE) {
        result = size
      }
      break
  }

  return result
}
