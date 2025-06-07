import React from 'react';
import Signup from './signup';
import Login from './login';
import Dashboard from './Dashboard';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>  
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App