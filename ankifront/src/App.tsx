import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Header from './Components/Header'
import { getAllProducts, getProductsFromSearch, getProductsWithFilters } from './Services/CardServices';
import { useEffect, useState } from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='pukich'>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;