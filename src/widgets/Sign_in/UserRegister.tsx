"use client"

import { useAuthStore } from '@/Hooks/AuthStore'
import { useModals } from '@/Hooks/MainStore'
import Close_button from '@/shared/UI/Close_button'
import React, { useEffect, useState } from 'react'
import { UserData } from '@/Hooks/AuthStore'

export default function UserRegister() {
  let { modals, close } = useModals()
  let { registerUser } = useAuthStore()
  let [activeModal, setActiveModal] = useState<boolean>(false)
  let [error, setError] = useState<string>("")
  let [userData, setUserData] = useState<{
    fullName?: string
    email?: string
    city?: string
    password?: string
    repeatPassword?: string
  }>({})

  useEffect(() => {
    setActiveModal(modals.find(el => el.key === 'sign_in_tourist')?.isActive || false)
  }, [modals])

  const handleRegister = () => {
    if (!userData.fullName || !userData.email || !userData.password || !userData.repeatPassword) {
      setError("Please fill all required fields")
      return
    }
    if (userData.password !== userData.repeatPassword) {
      setError("Passwords do not match")
      return
    }
    setError("")
    registerUser(userData as UserData)
    close("sign_in_tourist")
  }

  return (
    <div
      className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${
        activeModal ? '' : 'hidden'
      }`}
    >
      <div className="login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex  z-7 items-center justify-between px-[50px]">
        <Close_button setState={close} modalKey={'sign_in_tourist'} />
        <div className="left">
          <img
            src="/UserRegisterImg.jpg"
            alt=""
            className="rounded-[40px] w-[550px] h-[500px]"
          />
        </div>
        <div className="right flex flex-col gap-[10px] w-[500px] h-[500px] justify-center items-center">
          <h1 className="font-bold text-[28px]">Welcome</h1>
          <p className="text-center text-gray-500 max-w-[220px] text-[13px]">
            Let's fill out some forms and start looking for tours for you
          </p>
          <div className="inputs flex flex-col gap-2">
            <input
              type="text"
              placeholder="Full Name*"
              className="border border-blue-300 rounded-[20px] p-[10px] pl-8 w-[420px]"
              onChange={e =>
                setUserData(p => ({ ...p, fullName: e.target.value }))
              }
            />
            <input
              type="email"
              placeholder="Email*"
              className="border border-blue-300 rounded-[20px] p-[10px] pl-8 w-[420px]"
              onChange={e => setUserData(p => ({ ...p, email: e.target.value }))}
            />
            <input
              type="text"
              placeholder="City"
              className="border border-blue-300 rounded-[20px] p-[10px] pl-8 w-[420px]"
              onChange={e => setUserData(p => ({ ...p, city: e.target.value }))}
            />
            <input
              type="password"
              placeholder="Password*"
              className="border border-blue-300 rounded-[20px] pl-8 p-[10px] w-[420px]"
              onChange={e =>
                setUserData(p => ({ ...p, password: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="Repeat Password*"
              className="border border-blue-300 rounded-[20px] pl-8 p-[10px] w-[420px]"
              onChange={e =>
                setUserData(p => ({ ...p, repeatPassword: e.target.value }))
              }
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="bg-[#1083E61A] text-blue-400 px-4 py-3 rounded-3xl"
              onClick={handleRegister}
            >
              register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
