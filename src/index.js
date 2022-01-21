import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { InputProvider } from './context/input_context'

ReactDOM.render(
  <React.StrictMode>
    <InputProvider>
      <App />
    </InputProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
