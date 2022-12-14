import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Main from './main'

const Routing = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
