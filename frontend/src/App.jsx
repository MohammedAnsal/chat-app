import React from 'react'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App