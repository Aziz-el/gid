"use client"

import Application_Card from '@/entities/applications/UI/Application_Card'
import { Tour } from '@/entities/tours/Model/Tour_Model'
import { User } from '@/entities/users/Model/User_Model'
import { Application, useApplicationStore } from '@/Hooks/ApplicationStore'
import { useAuthStore } from '@/Hooks/AuthStore'
import {  useTourStore } from '@/Hooks/ToursStore'
import { useUserStore } from '@/Hooks/UserStore'
import { ppid } from 'process'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

export default function Applications( {activePage}: {activePage: number}) {
  if(activePage !== 3) return null
  let {companyData} = useAuthStore()
  let {applications,fetchApplications} = useApplicationStore()
  let {users,getUserById,fetchUsers}= useUserStore()
  let {tours,fetchTours} = useTourStore()

  useEffect(()=>{
    fetchApplications()
    fetchTours()
    fetchUsers()
  },[])
    let restour = tours.filter(el=>el.agency_id == companyData?.id)
    let resapp = applications.filter(el=>restour.find(el1=>el1.id == el.tourId)!==undefined)
    let resuser = users.filter(el=>applications.filter(app=>app.userId == el.id))
  return (
    <div className="application">
      <div className="favs w-[900px] relative ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={15}
        slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
       <div className="flex gap-3 ">
          {
            resapp?
          resapp.map(app=>{
            let user = resuser?.find(el=>el.id == app.userId)
            let tour = restour?.find(el=>el.id == app.tourId)
            
            
            return (
              console.log(resapp),
              <SwiperSlide><Application_Card key={app.id} user={user ? user : {} as User} tour={tour ? tour : {} as Tour} application={app}/></SwiperSlide>
            )
          }):( <SwiperSlide><div className='w-[900px] h-[500px] flex items-center '><h1 className='flex justify-center'>Пока что нету коментов</h1></div></SwiperSlide>)
        }
       </div>
       </Swiper>
    </div>
    </div>
  )
}
