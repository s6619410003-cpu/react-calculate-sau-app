import { useState } from 'react'
import { Link } from 'react-router'
import bmr from '../assets/bmr.png'

export default function Bmr() {

  // ===== State =====
  // ช่อง input เก็บเป็นสตริงว่างไว้ก่อน (เหมือนหน้า Bmi)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')

  // เก็บเพศที่เลือก ค่าเริ่มต้นคือ 'male'
  // ใช้ค่านี้ตัดสินว่าจะใช้สูตรของชายหรือหญิง
  const [gender, setGender] = useState('male')

  // เก็บผลลัพธ์ BMR
  const [bmrResult, setBmrResult] = useState(0)

  // ===== ฟังก์ชันคำนวณ =====
  const handleCalculate = (e) => {
    e.preventDefault() // กันไม่ให้ฟอร์มรีเฟรชหน้า

    // ต้องกรอกครบทั้ง 3 ช่อง ถึงจะคำนวณ
    if (!weight || !height || !age) return

    // แปลงสตริงจาก input เป็นตัวเลขก่อนนำไปคำนวณ
    const w = Number(weight)
    const h = Number(height)
    const a = Number(age)

    let result = 0

    if (gender === 'male') {
      // ชาย: BMR = 66 + (13.7 x น้ำหนัก) + (5 x ส่วนสูง) - (6.8 x อายุ)
      result = 66 + (13.7 * w) + (5 * h) - (6.8 * a)
    } else {
      // หญิง: BMR = 665 + (9.6 x น้ำหนัก) + (1.8 x ส่วนสูง) - (4.7 x อายุ)
      result = 665 + (9.6 * w) + (1.8 * h) - (4.7 * a)
    }

    setBmrResult(result)
  }

  // ===== ฟังก์ชันรีเซ็ต =====
  const handleReset = () => {
    setWeight('')
    setHeight('')
    setAge('')
    setGender('male')
    setBmrResult(0)
  }

  return (
    <div className='w-200 mt-40 mx-auto border-2 border-gray-100 shadow-2xl rounded-2xl flex flex-col items-center p-15'>
      <p className='text-3xl font-kanit font-bold text-center'>
        BMR (อัตราการเผาผลาญร่างกาย)
      </p>

      <img src={bmr} alt='bmr' className='mt-5 w-30' />

      <form onSubmit={handleCalculate} className='w-full flex flex-col'>

        <label className='font-kanit font-bold'>ป้อนน้ำหนัก (กิโลกรัม)</label>
        <input
          type='number'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        <label className='font-kanit font-bold mt-3'>ป้อนส่วนสูง (เซนติเมตร)</label>
        <input
          type='number'
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        <label className='font-kanit font-bold mt-3'>ป้อนอายุ (ปี)</label>
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        {/* ===== Radio เลือกเพศ =====
            - checked={gender === 'male'} : ปุ่มจะถูกเลือกเมื่อ state ตรงกับค่านี้
            - onChange : เมื่อคลิก ให้เปลี่ยน state เป็นค่าของปุ่มนั้น
            ทำให้เลือกได้ทีละปุ่มเท่านั้น และ state เป็นตัวควบคุมทั้งหมด */}
        <label className='font-kanit font-bold mt-3'>เพศ</label>
        <div className='flex gap-5 font-kanit'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            ชาย
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            หญิง
          </label>
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white p-2 mt-5 rounded-sm font-kanit font-bold
                     hover:bg-gray-800 cursor-pointer'>
          คำนวณ BMR
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='bg-gray-600 text-white p-2 mt-2 rounded-sm font-kanit font-bold
                     hover:bg-gray-800 cursor-pointer'>
          ยกเลิก
        </button>
      </form>

      {/* ผลลัพธ์ (หน่วยคือ กิโลแคลอรี่ต่อวัน) */}
      <div className='flex items-center justify-center mt-5 gap-5'>
        <p className='font-kanit font-bold mt-5'>ค่า BMR ที่คำนวณได้</p>
        <p className='font-kanit font-bold mt-5 text-blue-600'>
          {bmrResult.toFixed(2)}
        </p>
        <p className='font-kanit font-bold mt-5'>กิโลแคลอรี่</p>
      </div>

      <Link
        to='/'
        className='w-full text-center bg-gray-400 text-white font-bold py-2 px-4 mt-5 border-b-4'>
        Back to Home
      </Link>
    </div>
  )
}