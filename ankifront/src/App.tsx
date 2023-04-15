import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { getAllProducts, getProductsFromSearch, getProductsWithFilters } from './Services/CardServices';
import { useEffect, useState } from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { HomePage } from './Pages/HomePage';
import ProfilePage, { User } from './Pages/ProfilePage';
// import { TestPage } from './Pages/TestPage';

const MockUser:User = {
  AvatarSrc: "1234",
  Id: 11,
  Login: "pukich",
  Cards: []
}

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<ProfilePage user={MockUser} />} />
          {/* <Route path='/test' element={<TestPage user={undefined}/>} /> */}
        </Routes>
    </div>
  );
}


export default App;