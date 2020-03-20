import React from 'react';
import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Router from './router'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App;
