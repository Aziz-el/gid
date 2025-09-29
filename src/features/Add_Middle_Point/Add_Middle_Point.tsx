"use client"

import { useModals } from '@/Hooks/MainStore'
import Button from '@/shared/UI/Button'
import Close_button from '@/shared/UI/Close_button'
import React, { useState } from 'react'

type AddMiddlePointProps = {
  add_middle_point?: (fn: (prev: any) => any) => void
}

export default function Add_Middle_Point({ add_middle_point }: AddMiddlePointProps) {
  const { close, modals } = useModals()
  const activeModal = modals.find(m => m.key === "profile_company_adding_middle_point")?.isActive

  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [place, setPlace] = useState('')
  const [address, setAddress] = useState('')

  const handleAdd = () => {
    if (!place || !address) return
    add_middle_point?.((prev: any) => {
      const newPoint = {
        start_time: `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}`,
        location: place,
        addres: address,
        name: place
      }

      const updatedPoints = [
        ...(prev.location.middle_points || []),
        newPoint
      ].sort((a, b) => {
        const timeA = a.start_time.split(':').map(Number)
        const timeB = b.start_time.split(':').map(Number)
        return timeA[0]*60 + timeA[1] - (timeB[0]*60 + timeB[1])
      })
      close("profile_company_adding_middle_point")
      return {
        ...prev,
        location: {
          ...prev.location,
          middle_points: updatedPoints
        }
      }
    })

    setHours('')
    setMinutes('')
    setPlace('')
    setAddress('')
  }

  return (
    <div className={`modal_adding_point bg-white rounded-[50px] absolute z-10 w-[700px] h-[300px] border-1 border-blue-500 ${activeModal ? "" : "hidden"} p-8 flex`}>
      <Close_button setState={close} modalKey={"profile_company_adding_middle_point"} />

      <div className="head max-w-[240px] flex flex-col gap-3">
        <div className="flex gap-5">
           <div className="start">
          <h1>Время</h1>
          <div className="time flex gap-2">
            <input
              type="number"
              className='rounded-4xl border-1 border-blue-500 max-w-[70px] p-3'
              placeholder='0'
              min={0}
              max={23}
              value={hours}
              onChange={e => setHours(e.target.value)}
            />
            <input
              type="number"
              className='rounded-4xl border-1 border-blue-500 max-w-[70px] p-3'
              placeholder='0'
              min={0}
              max={59}
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
            />
          </div>
        </div>

        <div className="middle">
          <h1>Место</h1>
          <input
            type="text"
            className='rounded-4xl border-1 border-blue-500 max-w-[300px] h-[50px] p-3 outline-0'
            placeholder='место'
            value={place}
            onChange={e => setPlace(e.target.value)}
          />
        </div>
        </div>

        <div className="addres">
          <h1>Адрес</h1>
          <input
            type="text"
            className='rounded-4xl border-1 border-blue-500 min-w-[300px] h-[50px] p-3 outline-0'
            placeholder='место'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        <div className="end mt-4">
          <Button
            Effectclass='w-full'
            type='primary'
            onClick={handleAdd}
            title='Добавить'
          />
        </div>
      </div>
    </div>
  )
}
