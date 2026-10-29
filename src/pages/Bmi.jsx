// [เพิ่ม] import useState จาก React
// useState คือ Hook สำหรับสร้าง "state" (ที่เก็บค่าที่ React คอยจับตาดู)
// ต้อง import ก่อนจึงจะใช้งานได้
import { useState } from 'react'

// [เพิ่ม] import Link จาก react-router
// ของเดิมลืม import ทั้งที่ใช้ <Link> ด้านล่าง ทำให้หน้า error
import { Link } from 'react-router'

import bmit from '../assets/bmit.png'

export default function Bmi() {

  // ===================== [เพิ่ม] ส่วนของ State =====================
  // รูปแบบ: const [ค่าปัจจุบัน, ฟังก์ชันเปลี่ยนค่า] = useState(ค่าเริ่มต้น)
  // เมื่อเรียกฟังก์ชันเปลี่ยนค่า React จะวาดหน้าจอใหม่ให้อัตโนมัติ

  // เก็บน้ำหนักที่ผู้ใช้พิมพ์ (เริ่มต้นเป็นสตริงว่าง = ช่องว่าง)
  const [weight, setWeight] = useState('')

  // เก็บส่วนสูงที่ผู้ใช้พิมพ์
  const [height, setHeight] = useState('')

  // เก็บผลลัพธ์ BMI ที่คำนวณได้ (เริ่มต้นเป็น 0)
  const [bmi, setBmi] = useState(0)

  // ===================== [เพิ่ม] ฟังก์ชันคำนวณ BMI =====================
  // ทำงานเมื่อผู้ใช้กดปุ่ม "คำนวณ" (ผ่าน onSubmit ของฟอร์ม)
  const handleCalculate = (e) => {
    // ปกติ form เมื่อ submit จะรีเฟรชหน้าเว็บ ทำให้ state หายหมด
    // preventDefault() ใช้ห้ามพฤติกรรมนี้
    e.preventDefault()

    // ถ้าช่องใดช่องหนึ่งยังว่าง ให้หยุดทำงาน (กันผลลัพธ์เป็น NaN / Infinity)
    if (!weight || !height) return

    // ค่าจาก input เป็นสตริงเสมอ จึงต้องใช้ Number() แปลงเป็นตัวเลข
    // หาร 100 เพื่อเปลี่ยนส่วนสูงจาก เซนติเมตร เป็น เมตร
    const h = Number(height) / 100

    // สูตร BMI = น้ำหนัก (กก.) ÷ ส่วนสูง (ม.) ยกกำลังสอง
    // แล้วเก็บผลลัพธ์ลง state เพื่อให้หน้าจอแสดงผลใหม่
    setBmi(Number(weight) / (h * h))
  }

  // ===================== [เพิ่ม] ฟังก์ชันรีเซ็ต =====================
  // ทำงานเมื่อผู้ใช้กดปุ่ม "ยกเลิก"
  // ตั้งค่า state ทั้งหมดกลับเป็นค่าเริ่มต้น
  // เพราะ input ผูกกับ state อยู่ ช่องกรอกจะว่างตามไปเองอัตโนมัติ
  const handleReset = () => {
    setWeight('')
    setHeight('')
    setBmi(0)
  }

  return (
    <>
      <div className='w-200 mt-40 mx-auto border-2 border-gray-100 shadow-2xl rounded-2xl flex flex-col items-center p-15'>

        {/* show calculate */}
        <p className='text-3xl font-kanit font-bold text-center'>
          BMI (ดัชนีมวลกาย)
        </p>

        {/* show picture */}
        {/* [แก้] ของเดิมเขียน src='bmit' (เป็นแค่ข้อความ เบราว์เซอร์หาไฟล์ชื่อ "bmit" ไม่เจอ)
            แก้เป็น src={bmit} เพื่อใช้ตัวแปรที่ import มาจากด้านบน (ต้องใส่ปีกกา) */}
        <img src={bmit} alt='bmit' className='mt-5 w-30' />

        {/* ส่วนของ Form ให้ผู้ใช้กรอกข้อมูล */}
        {/* [เพิ่ม] onSubmit={handleCalculate}
            เมื่อกดปุ่มที่เป็น type='submit' ฟอร์มจะเรียกฟังก์ชันคำนวณนี้ */}
        <form onSubmit={handleCalculate} className='w-full flex flex-col'>

          <label className='font-kanit font-bold'>ป้อนน้ำหนัก (กิโลกรัม)</label>
          {/* [เพิ่ม] value และ onChange = "Controlled Input"
              value={weight}  -> ช่องกรอกแสดงค่าจาก state
              onChange        -> ทุกครั้งที่พิมพ์ จะเอาค่าใหม่ (e.target.value) ไปเก็บใน state ผ่าน setWeight
              [แก้] rotate-sm เป็น rounded-sm (ของเดิมพิมพ์ผิด จึงไม่มีมุมโค้ง)
              [ลบ] name="" id="" ออก เพราะเป็นค่าว่างและไม่ได้ใช้งาน */}
          <input
            type='number'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className='border border-gray-500 rounded-sm p-2'
          />

          {/* [เพิ่ม] mt-3 เว้นระยะห่างจากช่องด้านบน */}
          <label className='font-kanit font-bold mt-3'>ป้อนส่วนสูง (เซนติเมตร)</label>
          {/* [เพิ่ม] value และ onChange เหมือนช่องน้ำหนัก แต่ผูกกับ height */}
          <input
            type='number'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className='border border-gray-500 rounded-sm p-2'
          />

          {/* [เพิ่ม] type='submit' ระบุให้ชัดว่าปุ่มนี้ส่งฟอร์ม -> เรียก handleCalculate
              [แก้] curser-pointer เป็น cursor-pointer (พิมพ์ผิด เมาส์เลยไม่เปลี่ยนเป็นรูปมือ) */}
          <button
            type='submit'
            className='bg-blue-600 text-white p-2 mt-5 rounded-sm font-kanit font-bold
                       hover:bg-gray-800 cursor-pointer'>
            คำนวณ
          </button>

          {/* [เพิ่ม] type='button' เพื่อไม่ให้ปุ่มนี้ไป submit ฟอร์ม
              [เพิ่ม] onClick={handleReset} เรียกฟังก์ชันรีเซ็ตเมื่อคลิก
              [แก้] mt-/ เป็น mt-2 (ของเดิมพิมพ์ไม่ครบ)
              [แก้] curser-pointer เป็น cursor-pointer */}
          <button
            type='button'
            onClick={handleReset}
            className='bg-gray-600 text-white p-2 mt-2 rounded-sm font-kanit font-bold
                       hover:bg-gray-800 cursor-pointer'>
            ยกเลิก
          </button>
        </form>

        {/* ส่วนแสดงผล */}
        <div className='flex items-center justify-center mt-5 gap-5'>
          <p className='font-kanit font-bold mt-5'>ค่า BMI ที่คำนวณได้</p>
          {/* [แก้] จากเดิมเป็นข้อความ 0.000 ตายตัว เปลี่ยนเป็น {bmi.toFixed(2)}
              - {bmi} ดึงค่าจาก state มาแสดง พอ setBmi ถูกเรียก ตัวเลขจะอัปเดตเอง
              - toFixed(2) ปัดทศนิยม 2 ตำแหน่ง เช่น 20.761245 -> "20.76" */}
          <p className='font-kanit font-bold mt-5 text-blue-600'>{bmi.toFixed(2)}</p>
        </div>

        {/* ลิงค์กลับไปหน้า Home */}
        {/* [แก้] เอา <button> ที่ครอบอยู่ข้างในออก แล้วใส่สไตล์ที่ Link โดยตรง
            เพราะ HTML ไม่อนุญาตให้ใส่ปุ่มซ้อนใน <a> (Link คือ <a>)
            [เพิ่ม] mt-5 เว้นระยะห่างด้านบน
            [แก้] ข้อความ Bact เป็น Back */}
        <Link
          to='/'
          className='w-full text-center bg-gray-400 text-white font-bold py-2 px-4 mt-5 border-b-4'>
          Back to Home
        </Link>

      </div>
    </>
  )
}