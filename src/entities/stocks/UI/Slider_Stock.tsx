"use client"

import React, { useEffect, useState } from 'react'
import get_Stocks, { Stock } from '../Model/Stock_Model'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Button from '@/shared/UI/Button'
import { useModals } from '@/Hooks/MainStore'

export default function Slider_Stock() {
  const [data, setData] = useState<Stock[]>([])
  let {open} = useModals()
  useEffect(() => {
    get_Stocks().then(res => setData(res))
  }, [])

  return (
    <div className="slider w-[800px] h-[450px] rounded-[44px] bg-[#21212199] absolute top-[169px] left-[120px]">
      <Swiper
         pagination={{
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class=" bg-none ${className} border-1 border-[#FFFFFF] p-1 rounded-4xl custom-bullet"></span>`;
    },
  }}
        spaceBetween={50}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {data.map((el, i) => (
          <SwiperSlide key={i}>
            <div className="slide text-gray-50 px-[50px] py-[50px] flex flex-col gap-1 mb-13">
              <h2 className='text-[16px]'>Бронируйте свой тур прямо сейчас!</h2>
              <p className='text-[50px] font-bold leading-[110%] max-w-[760px]'>{el.title}</p>
              <p className='text-gray-400 text-[16px] max-w-[760px]'>{el.desc}</p>
              <Button type='primary' Effectclass="max-w-[110px] absolute bottom-1" title='Смотреть' onClick={()=>open('buy',el.tour_id)} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
