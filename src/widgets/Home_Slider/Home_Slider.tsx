"use client"
import React, { useEffect, useState } from 'react'
import get_Stocks, { Stock } from '@/entities/stocks/Model/Stock_Model'
import  { Tour } from '@/entities/tours/Model/Tour_Model'
import axios from 'axios'
import Complicated_Slider from '@/entities/stocks/UI/Complicated_Slider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Home_Slider() {
    const [stockData, stockSetData] = useState<Stock[]>([])
    const [tourData, tourSetData] = useState<Tour[]>([])
    useEffect(() => {
             get_Stocks().then(res => stockSetData(res))
             axios.get("https://dff9a02614421063.mokky.dev/Tour").then(res => tourSetData(res.data))
         }, [])
         let AlpData = stockData.map((stock)=>{
             return  tourData.filter(tour=>tour.agency_id == stock.agency_id).at(-1)
         })
         console.log(AlpData);
         
  return (
    <>
    <div className="Slider bg-[#1083E6] rounded-4xl h-[500px] w-[85%] text-white mx-auto my-20 flex relative">
    <Swiper spaceBetween={50} slidesPerView={1}>
    {stockData.map((stock, index)=>{
        if(AlpData[index]){
            return  <SwiperSlide><Complicated_Slider key={index} stock={stock} tour={AlpData[index]}/></SwiperSlide>
        }
    })}
  </Swiper>
  </div>
    </>
  )
}
