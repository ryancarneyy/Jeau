import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile';
import CreateUser from './pages/CreateUser/CreateUser';
import Home from './pages/Home/Home';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signUp' element={<CreateUser />}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/profile/:username' element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
