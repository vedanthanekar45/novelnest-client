import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
// import GenrePage from './pages/genres'
import Homepage from './pages/homepage'
import {Routes, Route} from "react-router-dom"
import { Navigate } from 'react-router-dom';
import Otpverify from './components/authentication/OtpVerify'
import JournalPage from './components/journal/journalPage'
import CreateJournal from './components/journal/createJournal'
import { useAuth } from './auth/useAuth'
import Search from './pages/Search'

function App() {

  const { loggedIn } = useAuth();
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/genre' element={<GenrePage />} /> */}
        <Route path='/signin' element={<Login/>} />
        <Route path='/signup' element={<Register />} />
        <Route path='/otp'  element={<Otpverify />} />
        <Route path='/journal' element={<JournalPage />} />
        <Route path='/createjournal' element={loggedIn ? <Navigate to='/signin' /> : <CreateJournal />} />
        <Route path='/searchbooks' element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
