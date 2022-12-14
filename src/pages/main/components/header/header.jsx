import anime from 'animejs'
import { useRef } from 'react'

import {
  Position,
  Translate,
  useGetOutsideTranslate
} from '../../../../shared/hooks/use-get-outside-translate'
import { useIntersectionVertical } from '../../../../shared/hooks/use-intersection-vertical'
import logo from './logo.svg'
import './style.css'

const Header = () => {
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const codeRef = useRef(null)
  const linkRef = useRef(null)

  // Оптимальные расстояния чтобы скрыть элемент
  const heightCenterEdge = useGetOutsideTranslate(
    Position.CENTER,
    Position.EDGE,
    Translate.Y
  )
  const widthCenterEdge = useGetOutsideTranslate(
    Position.CENTER,
    Position.EDGE,
    Translate.X
  )

  // Скрываем и смещаем элементы как только Header стал виден
  useIntersectionVertical(
    () => {
      anime({
        targets: '#logoRef',
        opacity: 0,
        translateX: widthCenterEdge,
        direction: 'normal',
        duration: 0
      })
    },
    headerRef,
    0
  )
  useIntersectionVertical(
    () => {
      anime({
        targets: '#codeRef',
        opacity: 0,
        translateX: -widthCenterEdge,
        direction: 'normal',
        duration: 0
      })
    },
    headerRef,
    0
  )
  useIntersectionVertical(
    () => {
      anime({
        targets: '#linkRef',
        opacity: 0,
        translateY: heightCenterEdge,
        direction: 'normal',
        duration: 0
      })
    },
    headerRef,
    0
  )

  // Скроллим до середины логотипа и показываем анимацию
  useIntersectionVertical(() => {
    anime({
      targets: '#logoRef',
      opacity: 1,
      translateX: 0,
      direction: 'normal',
      easing: 'easeInOutSine'
    })
  }, logoRef)
  // Скроллим до середины текста и запускаем анимацию
  useIntersectionVertical(() => {
    anime({
      targets: '#codeRef',
      opacity: 1,
      translateX: 0,
      direction: 'normal',
      easing: 'easeInOutSine'
    })
  }, codeRef)
  // Скроллим до середины текста и запускаем анимацию
  useIntersectionVertical(() => {
    anime({
      targets: '#linkRef',
      opacity: 1,
      translateY: 0,
      direction: 'normal',
      easing: 'easeInOutSine'
    })
  }, codeRef)

  return (
    <header className="Header" ref={headerRef}>
      <div id="logoRef" ref={logoRef}>
        <img className="Header-logo" src={logo} alt="logo" />
      </div>
      <p id="codeRef" ref={codeRef}>
        Edit <code>src/pages/main/index.jsx</code> and save to reload.
      </p>
      <a
        className="Header-link"
        id="linkRef"
        ref={linkRef}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  )
}

export default Header
