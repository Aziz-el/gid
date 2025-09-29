"use client"

import React, { useState, useEffect } from 'react'
import { useModals } from '@/Hooks/MainStore'
import Button from '@/shared/UI/Button'
import Close_button from '@/shared/UI/Close_button'
import { Step2 } from '@/widgets/Profile_Company/Pages/Add_Tour/Adding_steps'

export default function Edit_Middle_Point() {
  const { close, modals } = useModals()
  const modal = modals.find(m => m.key === "profile_company_editing_middle_point")
  const activeModal = modal?.isActive
  const point = modal?.point

  const [hours, setHours] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    if (modal && modal.point && (modal as any).initialData) {
      const data = (modal as any).initialData
      setHours(data.start_time?.split(":")[0] || '')
      setMinutes(data.start_time?.split(":")[1] || '')
      setPlace(data.location || '')
      setAddress(data.address || '')
    }
  }, [modal])

  const handleSave = () => {
    if (!place || !address) return

    const initialData = (modal as any)?.initialData || {};
    const updatedPoint = {
      start_time: `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`,
      location: place,
      address: address,
      name: place,
      start_date: initialData.start_date || '',
      people_count: initialData.people_count || 0
    }

    if (point) point(updatedPoint)
    close("profile_company_editing_middle_point")
  }

  return (
    <div className={`modal_adding_point bg-white rounded-[50px] absolute z-10 w-[700px] h-[300px] border-1 border-blue-500 ${activeModal ? '' : 'hidden'} p-8 flex`}> 
      <Close_button setState={close} modalKey="profile_company_editing_middle_point" />
      <div className="head max-w-[240px] flex flex-col gap-3">
        <div className="flex gap-5">
          <div className="start">
            <h1>Время</h1>
            <div className="time flex gap-2">
              <input type="number" className='rounded-4xl border-1 border-blue-500 max-w-[70px] p-3' placeholder='0' min={0} max={23} value={hours} onChange={e => setHours(e.target.value)} />
              <input type="number" className='rounded-4xl border-1 border-blue-500 max-w-[70px] p-3' placeholder='0' min={0} max={59} value={minutes} onChange={e => setMinutes(e.target.value)} />
            </div>
          </div>
          <div className="middle">
            <h1>Место</h1>
            <input type="text" className='rounded-4xl border-1 border-blue-500 max-w-[300px] h-[50px] p-3 outline-0' placeholder='место' value={place} onChange={e => setPlace(e.target.value)} />
          </div>
        </div>
        <div className="addres">
          <h1>Адрес</h1>
          <input type="text" className='rounded-4xl border-1 border-blue-500 min-w-[300px] h-[50px] p-3 outline-0' placeholder='адрес' value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="end mt-4">
          <Button Effectclass='w-full' type='primary' onClick={handleSave} title='Сохранить' />
        </div>
      </div>
    </div>
  )
}