"use client"

import Agency_filter from '@/features/Agency_Filter/Agency_filter'
import React, { useEffect, useState } from 'react'
import { Agency } from '@/entities/agencies/Model/Agency_Model'
import get_Agencies from '@/entities/agencies/Model/Agency_Model'
import AgencyCard from '@/entities/agencies/UI/AgencyCard'
import All_Agencies from '@/features/All_Agencyis/All_Agencyis'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default function Home_Agencies() {
    let [data, setData] = useState<Agency[]>([])

    useEffect(() => {
        get_Agencies().then((res) => setData(res))
    }, [])

    return (
        <div id='agencyes' className="Agencies px-5 flex flex-col mb-10">
            <div className="head flex justify-between items-center mx-10">
                <h1 className="font-bold text-[50px]">Travel agencies</h1>
                <Agency_filter />
            </div>

            <div className="body w-full h-[500px] flex justify-center">
                {data.length > 0 ? (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation
                        className="w-full"
                    >
                        {data.map((el, i) => (
                            <SwiperSlide key={i}>
                                <div className={`cont ${i !== data.length  -1? "border-r border-gray-400 flex justify-center " : ""}`}>
                                    <AgencyCard agencyProperty={el} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p>No agencies found</p>
                )}
            </div>
        </div>
    )
}
