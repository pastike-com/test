import Routing from '../pages'
import { withProviders } from './providers'
import './style.css'

const App = () => {
  return <Routing />
}

export default withProviders(App)
