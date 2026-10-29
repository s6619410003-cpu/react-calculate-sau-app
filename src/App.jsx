//import React from 'react'
// ไฟล์สำหรับตั้งค่า router ต่างๆ ของการ re-render Page components
//import { BrowserRouter as Router, Routes, Route } from 'react-router'
import{BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/Home'
import Bmr from './pages/Bmr'
import Bmi from './pages/Bmi'
import Car from './pages/Car'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmr" element={<Bmr />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/car" element={<Car />} />
      </Routes>
    </BrowserRouter>
  )
}
