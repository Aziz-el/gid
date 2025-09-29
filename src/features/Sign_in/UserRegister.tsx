"use client"


import { Modal, useModals } from '@/Hooks/MainStore';
import Close_button from '@/shared/UI/Close_button'
import React, { useEffect, useState } from 'react'

export default function UserRegister() {
    let {modals, close} = useModals();
    let [activeModal, setActiveModal] = useState<boolean>(false);
    useEffect(() => {
      setActiveModal(modals.find(el => el.key === "sign_in_tourist")?.isActive || false);
   }, [modals]);
    useEffect(() => {
         if (activeModal) {
           document.body.style.overflow = 'hidden';
         } else {
           document.body.style.overflow = 'auto';
         }
       }, [activeModal]);  

  return (
    <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${activeModal ? '' : 'hidden'}`}>
          <div className={`login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex  z-7 items-center justify-between px-[50px] `}>
            <Close_button setState={close} modalKey={"sign_in_tourist"}/>
            <div className="left">
              <img src="/UserRegisterImg.jpg" alt="" className='rounded-[40px] w-[550px] h-[500px] '/>
            </div>
            <div className="right flex flex-col gap-[10px] w-[500px] h-[500px] justify-center items-center">
               <h1 className='font-bold  text-[28px]'>Welcome</h1>
               <p className='text-center text-gray-500 max-w-[220px] text-[13px]'>Let's fill out some forms and start looking for tours for you</p>
            </div>
        </div>
       </div>
  )
}
