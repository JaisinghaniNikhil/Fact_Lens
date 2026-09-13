import React from 'react'
import Header from '../components/Header'
import DetectorComp from '../components/DetectorComp'
import Footer from '../components/Footer'
import '../styles/home.css'


function Detector() {
  return (
    <div className='myhome'>
        <Header/>
        <DetectorComp/>
        <Footer/>
    </div>
  )
}

export default Detector