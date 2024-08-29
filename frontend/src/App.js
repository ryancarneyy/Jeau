import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login'
import './App.css';
import CreateUser from './pages/CreateUser/CreateUser';
import Home from './pages/Home/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/account' element={<CreateUser />}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
