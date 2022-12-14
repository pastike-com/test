import { useContext, useEffect, useMemo, useState } from 'react'

import { ViewportSizeContext } from '../../app/providers/viewport-size'

/**
 * Позволяет выполнять колбэк-функцию во время появления элемента в зоне видимости на экране, либо его исчезновении
 *
 * @param {Function} callback Колбэк-функция которая выполнится когда объект появится в зоне видимости
 * @param {null|React.Ref} ref Ссылка на объект
 * @param {number} threshold Процент пересечения. Можно указывать дробные числа от 0 до 1. 1 - callback выполнится когда объект будет ближе к центру экрана, 0 - ближе к краю
 * @param {boolean|number} visible Направление пересечения. 1 - callback выполнится при появлении объекта в зоне видимости, 0 - при исчезновении из зоны видимости
 */
export const useIntersectionVertical = (
  callback,
  ref,
  threshold = 1,
  visible = true
) => {
  const [intersections, setIntersections] = useState(new Set())

  const { height } = useContext(ViewportSizeContext)

  // rootMarginVertical - это виртуальное сужение экрана по высоте. Чем больше это число, тем уже.
  // Зависит от переданного threshold: если 1, то rootMarginVertical имеет максимальное значение, если 0 - то rootMarginVertical 0
  const rootMarginVertical = useMemo(() => {
    let percent = threshold * 100
    if (threshold > 1) {
      percent = 100
    } else if (threshold < 0) {
      percent = 0
    }
    return -Math.floor((((height - 1) / 2) * percent) / 100)
  }, [threshold, height])

  /* eslint-disable-next-line sonarjs/cognitive-complexity */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `${rootMarginVertical}px 0px`,
      threshold: 0
    }

    const observer = new window.IntersectionObserver((entries, observer) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        if (entry.isIntersecting) {
          setIntersections(intersections.add(entry.target))

          if (!visible) {
            // Если отслеживается именно момент исчезновения элемента с экрана,
            // то ожидается момент его появления на экране чтобы была внесена запись в Set.
            // Все остальное пропускается
            continue
          }

          observer.unobserve(entry.target)
          callback()
        } else {
          // Элемент пропал с зоны видимости

          // Если отслеживается именно момент исчезновения элемента с экрана,
          // то проверяется наличие записи в Set (т.е. был ли он ранее показан)
          if (!visible && intersections.has(entry.target)) {
            observer.unobserve(entry.target)
            callback()
          }
        }
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref.current, rootMarginVertical])
}
