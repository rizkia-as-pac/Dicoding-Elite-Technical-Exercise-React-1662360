import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import { Main } from './layout/Main';
import Leaderboards from './pages/Leaderboards';
import AddThread from './pages/AddThread';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/thread/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/leaderboards' element={<Leaderboards />} />
          <Route path='/thread/new' element={<AddThread />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
