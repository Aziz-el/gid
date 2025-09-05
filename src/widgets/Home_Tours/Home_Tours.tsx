"use client"

import get_Tours, { Tour } from '@/entities/tours/Model/Tour_Model'
import TourCard from '@/entities/tours/UI/Tour'
import Rating from '@/features/Rating/Rating'
import Search from '@/features/Search/Search'
import Type_Of_Tours from '@/features/Type_Of_Tours_Filter/Type_Of_Tours'
import Button from '@/shared/UI/Button'
import { log } from 'console'
import React, { useEffect, useState } from 'react'

export default function Home_Tours() {
   const [data, setData] = useState<Tour[]>([])
   
     useEffect(() => {
      get_Tours(8,1).then(res => setData(res))
     }, [])
     console.log(data);
     
  return (
    <div className="Tours px-[100px] py-[50px]">
        <div className="Head flex items-center justify-between">
            <div className="head flex items-center">
              <h1 className='font-bold text-[50px]'>Tours</h1>
            <div className="filter flex gap-1 ml-7">
                <Button type='secondary' Effectclass='' title="For 1 days" />
                <Button type='secondary' Effectclass='' title="Walking" />
                <Button type='secondary' Effectclass='' title="By transport" />
                <Button type='secondary' Effectclass='' title="in my city" />
            </div>
            </div>

            <div className="foot flex items-center gap-3">
              <Search />
              <Rating />
              <Type_Of_Tours/>
            </div>
        </div>
       <div className="grid grid-cols-4 grid-rows-2 gap-px bg-gray-300">
  {data.map(el => (
    <div key={el.id} className="bg-[#F8F8F8] p-4">
      <TourCard tourProperty={el} />
    </div>
  ))}
</div>

</div>
  )
}
