import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../shared/AppBrowser'
import { BrowserRouter } from 'react-router-dom'

console.log("CSR: Loading SPA");
ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);