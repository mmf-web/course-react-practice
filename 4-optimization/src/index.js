import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import AppFunctional from './components/AppFunctional'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flexGrow: 1, flexBasis: '50%' }}>
        <div>Классовые компоненты</div>
        <App />
      </div>
      <div style={{ borderLeft: '1px solid #000' }} />
      <div style={{ flexGrow: 1, flexBasis: '50%' }}>
        <div>Функциональные компоненты</div>
        <AppFunctional />
      </div>
    </div>
  </React.StrictMode>
)
