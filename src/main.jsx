/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// function change(x, y) {
//     y -= x
//     x = y + x
//     y = x - y

//   console.log(x, y);
// }

// change(5, 4)



  // changeCallback(x)
  // x = y
  // function changeCallback(x) {
  //   y = x
    
  // }