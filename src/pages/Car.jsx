import { useState } from 'react'
import { Link } from 'react-router'
import car from '../assets/car.png'

export default function Car() {

  // ===== State =====
  const [price, setPrice] = useState('')       // ราคารถ
  const [down, setDown] = useState('')         // เงินดาวน์
  const [rate, setRate] = useState('')         // อัตราดอกเบี้ยต่อปี (%)

  // จำนวนเดือนที่ผ่อน เลือกจาก dropdown ค่าเริ่มต้น 24 เดือน
  const [months, setMonths] = useState(24)

  // ยอดผ่อนต่อเดือน
  const [monthly, setMonthly] = useState(0)

  // ===== รายการใน Dropdown =====
  // เก็บเป็น array แล้วใช้ .map() สร้าง <option> ให้
  // ข้อดีคือถ้าจะเพิ่ม/ลดตัวเลือก แก้ที่ array ที่เดียว
  const monthOptions = [24, 36, 48, 60, 72, 84]

  // ===== ฟังก์ชันคำนวณ =====
  const handleCalculate = (e) => {
    e.preventDefault()

    // ต้องกรอกครบ
    if (!price || !down || !rate) return

    const p = Number(price)
    const d = Number(down)
    const r = Number(rate)
    const m = Number(months) // select ให้ค่ากลับมาเป็นสตริง ต้องแปลงเป็นตัวเลข

    // เงินดาวน์ต้องน้อยกว่าราคารถ ไม่งั้นยอดจัดไฟแนนซ์จะติดลบ
    if (d >= p) {
      alert('เงินดาวน์ต้องน้อยกว่าราคารถ')
      return
    }

    // 1) ยอดจัดไฟแนนซ์ = ราคารถ - เงินดาวน์
    const finance = p - d

    // 2) ดอกเบี้ยทั้งหมด = ยอดจัด x อัตราดอกเบี้ยต่อปี x จำนวนปีที่ผ่อน
    //    r / 100  เปลี่ยน % เป็นทศนิยม (เช่น 3 -> 0.03)
    //    m / 12   เปลี่ยนจำนวนเดือนเป็นจำนวนปี (เช่น 24 -> 2 ปี)
    const interest = finance * (r / 100) * (m / 12)

    // 3) ยอดรวมที่ต้องผ่อน = ยอดจัด + ดอกเบี้ยทั้งหมด
    const total = finance + interest

    // 4) ค่างวดต่อเดือน = ยอดรวม / จำนวนเดือน
    setMonthly(total / m)
  }

  // ===== ฟังก์ชันรีเซ็ต =====
  const handleReset = () => {
    setPrice('')
    setDown('')
    setRate('')
    setMonths(24)
    setMonthly(0)
  }

  return (
    <div className='w-200 mt-40 mx-auto border-2 border-gray-100 shadow-2xl rounded-2xl flex flex-col items-center p-15'>
      <p className='text-3xl font-kanit font-bold text-center'>
        Car (เงินผ่อนรถต่อเดือน)
      </p>

      <img src={car} alt='car' className='mt-5 w-30' />

      <form onSubmit={handleCalculate} className='w-full flex flex-col'>

        <label className='font-kanit font-bold'>ราคารถ (บาท)</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        <label className='font-kanit font-bold mt-3'>เงินดาวน์ (บาท)</label>
        <input
          type='number'
          value={down}
          onChange={(e) => setDown(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        <label className='font-kanit font-bold mt-3'>อัตราดอกเบี้ยต่อปี (%)</label>
        <input
          type='number'
          step='0.01'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'
        />

        {/* ===== Dropdown เลือกจำนวนเดือน =====
            - value={months} : ให้ dropdown แสดงค่าจาก state
            - onChange : เมื่อเลือกใหม่ เก็บค่าลง state
            - .map() : วนลูป array monthOptions สร้าง <option> ทีละตัว
            - key : React ต้องการให้ element ที่สร้างจาก loop มี key ไม่ซ้ำกัน */}
        <label className='font-kanit font-bold mt-3'>จำนวนเดือนที่ผ่อน</label>
        <select
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className='border border-gray-500 rounded-sm p-2'>
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {m} เดือน
            </option>
          ))}
        </select>

        <button
          type='submit'
          className='bg-blue-600 text-white p-2 mt-5 rounded-sm font-kanit font-bold
                     hover:bg-gray-800 cursor-pointer'>
          คำนวณ
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='bg-gray-600 text-white p-2 mt-2 rounded-sm font-kanit font-bold
                     hover:bg-gray-800 cursor-pointer'>
          ยกเลิก
        </button>
      </form>

      {/* ผลลัพธ์
          toLocaleString ใส่ลูกน้ำคั่นหลักพัน เช่น 12345.6 -> "12,345.60"
          minimumFractionDigits / maximumFractionDigits บังคับทศนิยม 2 ตำแหน่ง */}
      <div className='flex items-center justify-center mt-5 gap-5'>
        <p className='font-kanit font-bold mt-5'>ยอดผ่อนต่อเดือน</p>
        <p className='font-kanit font-bold mt-5 text-blue-600'>
          {monthly.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className='font-kanit font-bold mt-5'>บาท</p>
      </div>

      <Link
        to='/'
        className='w-full text-center bg-gray-400 text-white font-bold py-2 px-4 mt-5 border-b-4'>
        Back to Home
      </Link>
    </div>
  )
}