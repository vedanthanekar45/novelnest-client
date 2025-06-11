import './App.css'
// import React from 'react'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Homepage from './pages/homepage'
import {Routes, Route} from "react-router-dom"
// import { Navigate } from 'react-router-dom';
import Otpverify from './components/authentication/OtpVerify'
import JournalPage from './components/journal/journalPage'
// import { useAuth } from './auth/useAuth'
import Search from './pages/Search'
import BookInfo from './pages/BookInfo'
import { AuthProvider } from './auth/authContext'
// import axios from 'axios'

function App() {

  // const { loggedIn, setLoggedIn, setUser } = useAuth();
  // React.useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/check-auth");
  //       setLoggedIn(true);
  //       setUser(res.data.user);
  //     } catch (err) {
  //       setLoggedIn(false);
  //     }
  //   };
  
  //   checkAuth();
  // }, []);  
  
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Login/>} />
          <Route path='/signup' element={<Register />} />
          <Route path='/otp'  element={<Otpverify />} />
          <Route path='/journal' element={<JournalPage />} />
          <Route path='/searchbooks' element={<Search />} />
          <Route path='/book/:id' element={<BookInfo />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
