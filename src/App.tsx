import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Homepage from './pages/homepage'
import { Routes, Route } from "react-router-dom"
// import { Navigate } from 'react-router-dom';
import Otpverify from './components/authentication/OtpVerify'
import JournalPage from './components/journal/journalPage'
// import { useAuth } from './auth/useAuth'
import Search from './pages/Search'
import BookInfo from './pages/BookInfo'
import { AuthProvider } from './auth/authContext'
// import axios from 'axios'

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/otp' element={<Otpverify />} />
          <Route path='/journal' element={<JournalPage />} />
          <Route path='/searchbooks' element={<Search />} />
          <Route path='/book/:id' element={<BookInfo />} />
        </Routes>
      </AuthProvider>
    </div>
  )

}

export default App
