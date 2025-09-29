"use client"

import { useAuthStore } from '@/Hooks/AuthStore'
import Button from '@/shared/UI/Button'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Edit_Company({ activePage }: { activePage: number }) {
  let { companyData, setCompanyData } = useAuthStore()

  const [form, setForm] = useState({
    name: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    description: "",
  })

  const [image, setImage] = useState<string>(companyData?.img || "/ProfileImageEdit.svg")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (companyData) {
      setForm({
        name: companyData.name || "",
        fullName: companyData.fullName || "",
        email: companyData.email || "",
        phone: companyData.phone || "",
        city: companyData.city || "",
        address: companyData.address || "",
        description: companyData.description || "",
      })
      setImage(companyData.img || "/ProfileImageEdit.svg")
    }
  }, [companyData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append("image", file)

    try {
     const res = await axios.post('/api/upload-image', formData)
    const imageUrl = res.data.data.link
    setImage(imageUrl)
    
    await setCompanyData({ img: imageUrl })

    } catch (err) {
      console.error(err)
      alert("Ошибка загрузки изображения")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!companyData) return

    const changed: Record<string, string> = {}
    for (const key in form) {
      if ((form as any)[key] !== (companyData as any)[key]) {
        changed[key] = (form as any)[key]
      }
    }
    Object.keys(changed).forEach(k => {
      if (changed[k].length === 0) delete changed[k]
    })

    if (Object.keys(changed).length === 0) {
      alert("Нет изменений")
      return
    }

    try {
      await setCompanyData(changed)
    } catch (err) {
      console.error(err)
    }
  }

  if (activePage !== 0) return null

  return (
    <div className="edit w-full">
      <div className="window rounded-[60px] w-[95%] h-[560px] bg-white border-1 border-blue-500 flex items-center justify-center relative">
        <div className="img h-[400px] pl-3 flex items-center justify-center w-[200px] rounded-[40px] bg-[#1083E61A] ml-4 relative">
          <img src={image} alt="" className="rounded-[40px]" />
          <label className="absolute bottom-4 right-5 cursor-pointer">
            <img src="/Edit.svg" alt="" />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
          {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/70">Загрузка...</div>}
        </div>
        <div className="btns">
          <div className="inputs flex flex-col flex-wrap max-h-[300px] gap-2 w-[600px] pl-3">
            <div className="mainly flex gap-4 flex-col max-h-[200px] w-[570px] flex-wrap">
              <input name="name" value={form.name} onChange={handleChange} type="text"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="Название компании" />
              <input name="fullName" value={form.fullName} onChange={handleChange} type="text"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="ФИО владельца" />
              <input name="email" value={form.email} onChange={handleChange} type="email"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="Почта" />
              <input name="phone" value={form.phone} onChange={handleChange} type="text"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="Номер телефона" />
              <input name="city" value={form.city} onChange={handleChange} type="text"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="Город" />
              <input name="address" value={form.address} onChange={handleChange} type="text"
                     className="border-1 border-blue-500 rounded-3xl text-black w-[48%] h-[40px] pl-2"
                     placeholder="Адрес компании" />
            </div>
            <textarea name="description" value={form.description} onChange={handleChange}
                      className="border-1 border-blue-500 rounded-3xl text-black w-[96%] min-h-[60px] max-h-[100px] pl-2 pt-1 resize-none"
                      placeholder="Описание компании" />
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
