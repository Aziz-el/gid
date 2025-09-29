"use client"

import { useModals } from '@/Hooks/MainStore'
import Close_button from '@/shared/UI/Close_button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Agency } from '../Model/Agency_Model'
import Button from '@/shared/UI/Button'
import { useTourStore } from '@/Hooks/ToursStore'
import TourCard from '@/entities/tours/UI/Tour'
import{Swiper, SwiperSlide} from 'swiper/react'
import { Pagination } from 'swiper/modules'


export default function Agency_detail() {
    let {modals,close} = useModals()
    let activeModal = modals?.find(el=>el.key == "detail_company")?.isActive
    let {tours,fetchTours} = useTourStore()
    let [agency,setAg] = useState<Agency>()
     useEffect(()=>{
        fetchTours()
           if( activeModal){
             document.body.style.overflow = 'auto'
             window.scrollTo({top: 0,behavior: "smooth"})
           }
           axios.get(`https://dff9a02614421063.mokky.dev/Agency/${modals?.find(el=>el.key == "detail_company")?.agency_id}`).then((res)=>{
            setAg(res.data)
            console.log( modals?.find(el=>el.key == "detail_company")?.agency_id);

            
     })
         },[modals])
     let rating = []
  for(let i = 0;i<5 ; i++){
    if(i < Math.floor(agency?.rating ?? 0)){
       rating.push(<img src={"/starFull.svg"} key={`img${agency?.id}-${i}`} />)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${agency?.id}-${i}`} />)
    }
  }
   let agency_tours = tours.filter(el=>el.agency_id == agency?.id)
  return (
     <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[3600px]  absolute top-0 left-0 z-6  flex justify-center ${activeModal ? '' : 'hidden'} pt-20`}>
          <div className='w-[90%] bg-white min-h-screen relative rounded-[80px] h-[1250px] p-10' >
              <Close_button setState={close} modalKey={"detail_company"} />
              <div className="body  ">
            <div className="start flex ">
                 <div className="img relative h-[460px] w-[600px] border-1 border-blue-500 rounded-[60px] z-12">
                                <img src={agency?.img} alt="" className='w-full h-[360px] object-cover rounded-[50px] mt-5 absolute '/>
                            
                                <div className="rating flex rounded-2xl bg-[#1083E61A] items-center justify-center max-w-[154px] gap-2 p-1.5 absolute z-3 top-8 right-8">
                                  Rating 
                                   <div className="stars flex">
                                      {rating.map(el=>el)}
                                     </div>
                                </div>
                               </div>
                               <div className="head pt-5 pl-10">
                                <h1 className='text-[40px] font-bold'>{agency?.name}</h1>
                                <p className='text-gray-500 text-[16px] max-w-[480px] '> {agency?.description}</p>
                               </div>
            </div>
                               <div className="other-data border-t border-b border-gray-500 flex items-start justify-around py-5 mt-5">
                                 <div className="inf ">
                                  <h1 className='font-bold text-[18px]'>Адресс Офиса</h1>
                                  <div className="sit flex items-center gap-4">
                                      <Button type="secondary" title={agency? agency.adress_of_their_main_building : ""} Effectclass='' />
                                  </div>
                                 </div>
                                 <div className="line h-[60px] w-[1px] bg-gray-400 self-center"></div>
                                 <div className="inf">
                                  <h1  className='font-bold text-[18px]'>Количество туров </h1>
                                  {agency ? <Button type="secondary" title={`${agency_tours.length}`} Effectclass='' />:""}
                                 </div>
                               </div>
                               
                                <h1 className='pt-4 pl-4 text[23px]'>Туры</h1>
                                <div className="favs w-full relative flex  p-4 ">
                                   
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
                               <div className="tours flex justify-center">
                                 {
                                    agency_tours?.length !== 0? agency_tours.map(el=>(<SwiperSlide className='border-r borfer-gray-500 max-w-[350px]'><TourCard tourProperty={el} isAgen={true}/></SwiperSlide>)):(<SwiperSlide className='w-[1000px]' style={{minWidth:'1000px'}}><div className='w-[1000px] h-[500px] flex justify-center items-center'>
                                    <h1 className='text-[30px] text-black'>Пока что нету туров</h1>
                                </div></SwiperSlide>)
                               }
                               </div>
                               </Swiper>
                            </div>
                            </div>
           </div>
      </div>

  )
}
