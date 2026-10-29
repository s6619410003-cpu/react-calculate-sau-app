//import React from 'react'
import calculate from '../assets/calculate.png'
import CardMenu from '../components/CardMenu'
import bmit from '../assets/bmit.png'
import bmr from '../assets/bmr.png'
import car from '../assets/car.png'
import Footer from '../components/Footer'
import { Link } from "react-router"

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      {/* picture */}
      <img src={calculate} alt="Calculate" className='w-30 mt-20' />
      {/* Name WEB*/}
      <p className='font-kanit text-3xl font-bold mt-5'>
        เครื่องคำนวณออนไลน์
      </p>
      <p className='font-itim text-xl text-gray-700'>
        เลือกการคำนวณที่คุณต้องการจากเมนูด้านล่าง
      </p>
      {/* 3 Menu */}
      <div className='mt-20 flex gap-10'>
        <Link to="/bmi">
          <CardMenu imgShow={bmit} titleShow="BMI (ดัชนีมวลกาย)" stitleShow="คำนวณน้ำหนักและส่วนสูงเหมาะสมหรือไม่" />
        </Link>
        <Link to="/bmr">
          <CardMenu imgShow={bmr} titleShow="BMR (อัตราการเผาผลาญร่างกาย)" stitleShow="คำนวณการเผาผลาญที่ร่างกายต้องการ" />
        </Link>
        <Link to="/car">
          <CardMenu imgShow={car} titleShow="Car (เงินผ่อนรถต่อเดือน)" stitleShow="คำนวณเงินผ่อนรถยนต์หรือรถเครื่องต่อเดือน" />
        </Link>
      </div>
      {/*Show Footer */}
      <Footer />
    </div>
  )
}