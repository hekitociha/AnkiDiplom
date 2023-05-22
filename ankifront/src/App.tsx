import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { HomePage } from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import TestPage from './Pages/TestPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/test' element={<TestPage/>} /> 
        </Routes>
    </div>
  );
}


export default App;