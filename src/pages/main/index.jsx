import Header from './components/header/header'

const Main = () => {
  return (
    <div>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Листай вниз
      </div>
      <Header />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Листай вверх
      </div>
    </div>
  )
}

export default Main
