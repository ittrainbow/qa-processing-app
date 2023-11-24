import ReactDOM from 'react-dom/client'

import './App.scss'

import { App } from './App'
import { Router } from './router'

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router>
    <App />
  </Router>
)
