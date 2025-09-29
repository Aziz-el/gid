"use client"

import { Tour } from '@/entities/tours/Model/Tour_Model'
import TourCard from '@/entities/tours/UI/Tour'
import { useAuthStore } from '@/Hooks/AuthStore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Favorites({ activePage }: { activePage: number }) {
  const { userData } = useAuthStore()
  const [data, setData] = useState<Tour[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dff9a02614421063.mokky.dev/Tour")
      const resData = response.data.filter((item: { id: number }) =>
        userData?.favorites?.includes(item.id)
      )
      setData(resData)
    }
    fetchData()
  }, [userData])

  if (activePage !== 1) return null

  return (
    <div className="favs w-[900px] relative">
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
        {data.length > 0 ? data.map(el => (
          <SwiperSlide key={el.id} className="flex justify-center">
            <div className="w-full border-r mr-5 pl-3">
              <TourCard tourProperty={el} isFav={true} />
            </div>
          </SwiperSlide>
        )) : ( <SwiperSlide ><div className='w-[900px] h-[500px] flex items-center justify-end pr-30 '><h1 className='flex '>Пока что нету туров</h1></div></SwiperSlide>)}
      </Swiper>
    </div>
  )
}
