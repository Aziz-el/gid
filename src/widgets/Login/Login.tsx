"use client"
import { useModals } from '@/Hooks/MainStore'
import Button from '@/shared/UI/Button'
import Close_button from '@/shared/UI/Close_button'
import React, { useState } from 'react'
import { useAuthStore } from '@/Hooks/AuthStore'

export default function Login() {
  let { modals, close, open } = useModals()
  let activeModal = modals.find(el => el.key === "login")?.isActive || false
  const login = useAuthStore((s) => s.login)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

const handleLogin = async () => {
  if (!email || !password) return alert("Заполни все поля")
  setLoading(true)
  try {
    try {
      await login(email, password, "user")
      close("login")
      return
    } catch (err) {
    }
    await login(email, password, "company")
    close("login")
  } catch (err) {
  } finally {
    setLoading(false)
  }
}



  return (
    <>
      <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${activeModal ? '' : 'hidden'}`}>
        <div className={`login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex z-7 items-center justify-between px-[50px]`}>
          <Close_button setState={close} modalKey={"login"} />
          <div className="left">
            <img src="/UserRegisterImg.jpg" alt="" className='rounded-[40px] w-[550px] h-[500px]' />
          </div>
          <div className="right flex flex-col gap-[0px] w-[500px] h-[500px] justify-center items-center pt-5">
            <img src="/Logo.svg" alt="" className='w-[100px] h-[100px]' />
            <h1 className='font-bold text-[28px]'>Welcome</h1>
            <p className='text-center text-gray-500 max-w-[220px] text-[13px]'>Enter your login details</p>
            <div className="inputs w-[400px] h-[400px] mt-4">
              <input
                type="email"
                className='border-1 border-blue-600 rounded-[50px] p-[12px] w-full mb-[10px]'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className='border-1 border-blue-600 rounded-[50px] p-[12px] w-full mb-[10px]'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                Effectclass='w-full mt-3'
                title={loading ? "Loading..." : "Log In"}
                type='fifth'
                onClick={handleLogin}
              />
              <div className="end flex justify-between mt-3 px-2">
                <p className='text-[12px] text-gray-400'>Not registered yet?</p>
                <p
                  className='text-[12px] text-blue-600 cursor-pointer underline'
                  onClick={() => {
                    close("login")
                    open("sign_in")
                  }}
                >
                  Create an account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
