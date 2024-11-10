import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VideoSection from './VideoSection'
import LowBattery from './LowBattery'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element = {<VideoSection />}
        />
        <Route 
          path = "/lowbattery"
          element = {<LowBattery />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
