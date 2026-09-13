import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detector from './pages/Detector'
import About from './pages/About'
import Headlines from './pages/Headlines'
import Login from './UserDashboard/Pages/Login'
import Signup from './UserDashboard/Pages/Signup'
import Dashboard from './UserDashboard/Pages/Dashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import FAQ from './pages/FAQ'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/factlens-detector' element={<Detector/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/headlines' element={<Headlines/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms-and-conditions' element={<TermsConditions/>}/>
        <Route path='/faq' element={<FAQ/>}/>

        {/*User Routes*/}

        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
