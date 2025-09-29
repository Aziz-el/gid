import Button from '@/shared/UI/Button'
import React from 'react'

export default function EmailSender() {
  return (
     <div className="email flex">
        <div className="emailInput relative w-[228px]">
            <input type="text"  className='bg-white  rounded-3xl p-2 absolute outline-0' />
            <img src="/mail.svg" alt="" className='absolute left-4 top-1/2 transform -translate-y-1/2' />
            <p className='absolute left-12 top-1/2 transform -translate-y-1/2 underline text-gray-600'>Email</p>
        </div>
        <Button title="Send" type="primary" Effectclass="ml-2" />
    </div>
  )
}
