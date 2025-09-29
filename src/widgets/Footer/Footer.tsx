import EmailSender from '@/features/EmailSender/EmailSender'
import NavLink from '@/shared/UI/NavLink'
import React from 'react'

export default function Footer() {
  return (
    <div className="foote flex flex-col items-center gap-10">
        <hr  className='text-gray-500 w-full '/>
        <div className="upper flex justify-between w-[90%]">
            <div className="head flex flex-col items-start gap-3">
                <img src="/Logo.svg" alt="" />
                <p className='text-gray-500 text-[14px] max-w-[340px]'>Subscribe for always fresh news</p>
                <EmailSender/>
            </div>
            <div className="body">
                <div className="nav flex gap-[30px]  text-[14px] items-center justify-center text-[#494848]">
                    <NavLink href="/" >Home</NavLink>
                    <NavLink href="/tours">Tours</NavLink>
                    <NavLink href="/organization">Organization</NavLink>
                </div>  
            </div>
            <div className="foot">
                <p className='text-gray-500 text-[13px] max-w-[340px] text-right'>Don't miss the chance to dive into the atmosphere of adventures at the best prices! Book your tour right now!</p>
            </div>
        </div>
        <div className="lower flex flex-col items-center gap-10">
            <div className="img flex gap-1">
                <img src="/inst.png" alt="" />
                <img src="/facebook.png" alt="" />
                <img src="/x.png" alt="" />
                <img src="/TG.png" alt="" />
                <img src="/ws.png" alt="" />
            </div>
            <div className="end">
                <p className='text-gray-500 text-[13px] max-w-[340px] text-right'>© 2024 All rights reserved. 'PROlab' Company.</p>
            </div>
        </div>
    </div>
  )
}
