"use client"

import { useAuthStore } from '@/Hooks/AuthStore'
import Button from '@/shared/UI/Button'
import React, { useEffect, useState } from 'react'

export default function Edit({ activePage }: { activePage: number }) {
  let { userData, setUserData } = useAuthStore()

  const [form, setForm] = useState({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    family: userData?.family || "",
    age: userData?.age || "",
    number: userData?.number || "",
    city: userData?.city || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (userData) {
      setForm({
          fullName: userData?.fullName || "",
          email: userData?.email || "",
          family: userData?.family || "",
          age: userData?.age || "",
          number: userData?.number || "",
          city: userData?.city || "",
      })
    }
  }, [userData])

  const handleSubmit = async () => {
    if (!userData) return

    const changed: Record<string, string> = {}
    for (const key in form) {
      if ((form as any)[key] !== (userData as any)[key]) {
        changed[key] = (form as any)[key]
      }
    }
    for(let i in changed){
      if(changed[i].length == 0){
        delete changed[i]
      }
    }

    if (Object.keys(changed).length === 0) {
      alert("Нет изменений")
      return
    }

    try {
      await setUserData(changed)
    } catch (err) {
      console.error(err)
    }
  }

  if (activePage !== 0) return null

  return (
    <div className="edit w-full">
      <div className="window rounded-[60px] w-[95%] h-[450px] bg-white border-1 border-blue-500 flex items-center justify-center relative">
        <div className="img h-[400px] pl-3">
          <img
            src={userData?.img ? userData.img : '/profileImage.jpg'}
            alt="profile"
            className="h-[100%] w-[200px] object-cover rounded-[40px]"
          />
          <div className="btn">
            
          </div>
        </div>
        <div className="btns">
          <div className="inputs flex flex-col flex-wrap max-h-[180px] gap-2 w-[600px] pl-3">
            <input name="fullName" value={form.fullName} onChange={handleChange} type="text" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="ФИО" />
            <input name="email" value={form.email} onChange={handleChange} type="email" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="Почта" />
            <input name="family" value={form.family} onChange={handleChange} type="text" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="Семейное положение" />
            <input name="age" value={form.age} onChange={handleChange} type="text" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="Возраст" />
            <input name="number" value={form.number} onChange={handleChange} type="text" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="Номер телефона" />
            <input name="city" value={form.city} onChange={handleChange} type="text" className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2" placeholder="Город проживания" />
          </div>
          <Button
            title="Применить"
            type="primary"
            Effectclass="w-[200px] h-[50px] absolute right-[10px] bottom-[30px]"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
