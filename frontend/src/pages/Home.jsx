import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import '../styles/home.css'
import Detail from '../components/Detail'
import Headlines from '../components/Headlines'
import Intro from '../components/Intro'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='myhome'>
      <Header/>
      <Hero/>
      <Detail/>
      <Headlines/>
      <Intro/>
      <Footer/>
    </div>
  )
}

export default Home