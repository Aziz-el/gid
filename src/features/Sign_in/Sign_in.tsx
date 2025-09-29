"use client"

import { useModals } from '@/Hooks/MainStore';
import Button from '@/shared/UI/Button';
import Close_button from '@/shared/UI/Close_button';
import React, { useActionState, useEffect, useState } from 'react'

export default function Sign_in() {
    let {modals, close,open} = useModals();

    let [choose, setChoose] = useState<"tourist" | "company" | null>(null)
    let activeModal = modals.map((m) => (m.key == "sign_in" ? m : null));
    useEffect(() => {
      if (activeModal[0]?.isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [activeModal]);  
  return (
   <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${activeModal[0]?.isActive ? '' : 'hidden'}`}>
      <div className={`login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex  z-7 items-center justify-between px-[50px] `}>
        <Close_button setState={close} modalKey={"sign_in"}/>
        <div className="left">
          <img src="/SignIn.jpg" alt="" className='rounded-[40px] w-[550px] h-[500px] '/>
        </div>
        <div className="right flex flex-col gap-[10px] w-[500px] h-[500px] justify-center items-center">
           <img src="/Logo.svg" alt="" className='w-[100px] h-[40px]'/>
           <h1 className='font-bold  text-[28px]'>Welcome</h1>
           <p className='text-center text-gray-500 max-w-[320px] text-[13px]'>Enter your details to register</p>
           <div className="choose flex gap-1">
             <div className={`tourist rounded-[20px] w-[200px] relative`} onClick={() => setChoose("tourist")}>
                <img src="/Tourist.jpg" alt=""className=' rounded-[20px] w-[200px] h-[200px] object-cover ' />
                {choose == "tourist" && <div className='w-full h-full bg-blue-700/30 absolute top-0 left-0 rounded-[20px] flex items-center justify-center text-white font-bold text-[20px]'>Tourist</div>}
             </div>
              <div className={`guide  rounded-[20px] w-[200px] relative`} onClick={() => setChoose("company")}>
                 <img src="/Agencies.jpg" alt="" className=' rounded-[20px] w-[200px] h-[200px] object-fill' />
                {choose == "company" && <div className='w-full h-full bg-blue-700/30 absolute top-0 left-0 rounded-[20px] flex items-center justify-center text-white font-bold text-[20px]'>Company</div>}
              </div>
           </div>
           <Button Effectclass='w-[80%]' title='login' type='primary' onClick={() => {
            if (choose == "tourist") {
              close("sign_in");
              setTimeout(() => {
                open("sign_in_tourist");
              }, 300);
            } else if (choose == "company") {
              close("sign_in");
              setTimeout(() => {
                open("sign_in_company");
              }, 300);
            }
           }} />
        </div>
    </div>
   </div>
  )
}
