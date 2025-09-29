"use client"

import React, { useEffect, useState } from 'react'
import get_Tours, { Tour } from '@/entities/tours/Model/Tour_Model'
import TourCard from '@/entities/tours/UI/Tour'
import Rating from '@/features/Rating/Rating'
import Search from '@/features/Search/Search'
import Type_Of_Tours from '@/features/Type_Of_Tours_Filter/Type_Of_Tours'
import Button from '@/shared/UI/Button'

export default function Home_Tours() {
  const [data, setData] = useState<Tour[]>([])
  const [page, setPage] = useState(1)
  const [countOfTours, setCountOfTours] = useState(0)
  const [pagination, setPagination] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const limit = 8

  useEffect(() => {
    setLoading(true)
    get_Tours(limit, page).then(res => {
      setData(res.items)
      setCountOfTours(res.meta.total_items)
      const pages = Math.ceil(res.meta.total_items / limit)
      const pagArr: number[] = []
      for (let i = 1; i <= pages; i++) {
        pagArr.push(i)
      }
      setPagination(pagArr)
      setLoading(false)
    })
  }, [page])

  return (
    <div id='tours' className="Tours px-4 md:px-[100px] py-[50px]">
      <div className="Head flex items-center justify-between">
        <div className="head flex items-center">
          <h1 className="font-bold text-[50px]">Tours</h1>
          <div className="filter flex gap-1 ml-7">
            <Button type="secondary" Effectclass="" title="For 1 days" />
            <Button type="secondary" Effectclass="" title="Walking" />
            <Button type="secondary" Effectclass="" title="By transport" />
            <Button type="secondary" Effectclass="" title="in my city" />
          </div>
        </div>

        <div className="foot flex items-center gap-3">
          <Search />
          <Rating />
          <Type_Of_Tours />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Загружаем туры...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mt-6">
          {data.map((el,index) => {
            if(index == 0){
              return (
              <div key={`tour-${index}`} className="bg-[#F8F8F8] p-4 border-b border-r border-gray-500">
                <TourCard tourProperty={el} />
              </div>
            )}

            if(index == 3){
              return (
              <div  key={`tour-${index}`} className="bg-[#F8F8F8] p-4 border-b border-gray-500">
                <TourCard tourProperty={el} />
              </div>
            )
          }
            if(index == 4){
              return (
                <div key={`tour-${index}`} className="bg-[#F8F8F8] p-4  border-r border-gray-500">
                  <TourCard tourProperty={el} />
                </div>
              )
            }
              if(index == 7){
              return (
                <div key={`tour-${index}`} className="bg-[#F8F8F8] p-4  ">
                  <TourCard tourProperty={el} />
                </div>
              )
               }
              if(index <=3 && index!=0 && index!=3){
              return (
                <div key={`tour-${index}`} className="bg-[#F8F8F8] p-4 border-b border-r border-gray-500">
                  <TourCard tourProperty={el} />
                </div>
              )
            }
             if(index >=4 &&index<=7 && index!=4 && index!=7){
              return (
                <div key={`tour-${index}`} className="bg-[#F8F8F8] p-4 border-r border-gray-500">
                  <TourCard tourProperty={el} />
                </div>
              )
            }
            
          })}
        </div>
      )}

      <div className="foot flex justify-between items-center mt-10 w-full">
        <Button
          type="third"
          Effectclass="mt-5  block"
          title="Все туры"
        />
        <div className="flex gap-2">
          {pagination.map(p => (
            <div
              key={p}
              onClick={() => setPage(p)}
              className={`cursor-pointer ${
                page === p ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } border border-blue-500 px-4 py-2 rounded-3xl`}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
