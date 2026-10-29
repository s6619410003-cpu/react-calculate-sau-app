//mport React from 'react'
//import bmit from '../assets/bmit.png'

export default function CardMenu({imgShow, titleShow, stitleShow}) {
  return (
    <>
    <div className='w-100 border-2 border-gray-200 p-10 rounded-2xl shadow-2xl
                    flex flex-col items-center'>
        <img src={imgShow} alt ="Picture" className='w-35'/>

        <p className='mt-4 font-kanit text-xl font-bold'>
            {titleShow}
        </p>
        <p className='mt-4 font-charm text-lg text-gray-500 text-center'>
            {stitleShow}
        </p>
    </div>
    </>

  )
}
