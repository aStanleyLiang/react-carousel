import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

function root() {
  return <App />
}

ReactDOM.render(root(), document.getElementById('content'), () => {})
