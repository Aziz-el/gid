"use client"

import Application_Card from '@/entities/applications/UI/Application_Card'
import { User } from '@/entities/users/Model/User_Model'
import { Application, useApplicationStore } from '@/Hooks/ApplicationStore'
import { useAuthStore } from '@/Hooks/AuthStore'
import { Tour, useTourStore } from '@/Hooks/ToursStore'
import { useUserStore } from '@/Hooks/UserStore'
import axios from 'axios'
import { ppid } from 'process'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

export default function My_Applications( {activePage}: {activePage: number}) {

  if(activePage !== 4) return null
  let {tours,fetchTours}=useTourStore()
  let {applications,fetchApplications} = useApplicationStore()
  let {userData} = useAuthStore()
  let [resapp,setApp] = useState<Application[]>()
  let [restour,setTour] = useState<Tour[]>()
  let [resuser,setUser] = useState<User>()
  useEffect(()=>{
    fetchApplications()
    fetchTours()
    let ra:Application[]=[]
    axios.get(`https://dff9a02614421063.mokky.dev/applications?userId=${userData?.id}`).then(
        (res)=>{
            ra=res.data
            setApp(res.data)
        }
    )
    axios.get(`https://dff9a02614421063.mokky.dev/users/${userData?.id}`).then(
        (res)=>{
            setUser(res.data)
        }
    )
  },[userData,tours])
  useEffect(()=>{
    let tour = resapp ? resapp.map(el => tours.find(t => t.id == el.tourId)).filter((t): t is Tour => t !== undefined) : []
    setTour(tour)
      
  },[resapp,applications])
  return (
    <div className="application">
      <div className="favs w-[900px] relative ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={15}
        slidesPerView={2}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
       <div className="flex gap-3 ">
          {
        resapp?.length > 0 ? (
          resapp.map(app => {
            let user = resuser
            let tour = restour?.find(el => el.id == app.tourId)
            return (
              <SwiperSlide><Application_Card key={app.id} user={user ? user : {} as User} tour={tour ? tour : {} as Tour} application={app}/></SwiperSlide>
            )
          })
        ) :( <SwiperSlide><div className='w-[900px] h-[500px] flex items-center '><h1 className='flex justify-center'>Пока что нету заявок</h1></div></SwiperSlide>)
        }
       </div>
       </Swiper>
    </div>
    </div>
  )
}
