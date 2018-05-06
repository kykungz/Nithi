import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { injectGlobal } from 'styled-components'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

injectGlobal`
  .App {
    padding: 1em;
  }

  .rodal-dialog {
    padding: 0 !important;
  }
  .rodal-close::before {
    background: white;
  }
  .rodal-close::after {
    background: white;
  }
`

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
