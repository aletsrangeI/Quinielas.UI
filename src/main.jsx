import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {store}  from './store'
import ReactDOM from 'react-dom/client'
import Quinielas from './Quinielas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Quinielas />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
