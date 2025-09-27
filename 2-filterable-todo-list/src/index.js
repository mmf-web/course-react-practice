import React from 'react'
import ReactDOM from 'react-dom/client'
import Normie from './components/App'
import Naive from './components/Naive'
import Smart from './components/Smart'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <div
      style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div>Это слишком просто, сложно добавлять фильтры</div>
        <Naive />
      </div>
      <div>
        <div>Это слишком круто, никто не поймет</div>
        <Smart />
      </div>
      <div style={{ backgroundColor: '#eee' }}>
        <div>То, что нужно!</div>
        <Normie />
      </div>
    </div>
  </React.StrictMode>
)
