import React from 'react'
import { Tour } from '../Model/Tour_Model'
import Button from '@/shared/UI/Button'

interface TourCardProps {
  tourProperty: Tour
}

export default function TourCard({ tourProperty }: TourCardProps) {
  let rating = []
  for(let i = 0;i<5 ; i++){
    if(i <Math.floor(tourProperty.rating)){
       rating.push(<img src={"/starFull.svg"} key={`img${tourProperty.id}-${i}`} />)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${tourProperty.id}-${i}`} />)
    }
  }
const [year, month, day] = tourProperty.date.start_date.split("-");
const formatted = `${month}/${day}/${year.slice(2)}`;

 let price = tourProperty.price - tourProperty.discount
  return (
    <div className="tour w-[300px]  flex flex-col gap-4r">
      <div className="img w-[100%] h-[300px] relative self-center">
        <img src={tourProperty.img} alt="" className='absolute h-full w-full rounded-[32px] '/>
        <div className="head relative z-2 py-3 px-5">
          <div className="rating flex rounded-2xl bg-white items-center justify-center max-w-[154px] gap-2 p-1.5">
            Rating 
            <div className="stars flex">
               {rating.map(el=>el)}
            </div>
          </div>

          <div className="fav bg-white rounded-4xl max-w-[45px] p-4 absolute top-3 right-4">
            <img src="/fav.svg" alt="" className='w-[14px]' />
          </div>
        </div>
        <div className="foot absolute z-2 bg-white rounded-2xl max-w-[108px] flex items-center justify-center px-4 py-2 bottom-4 left-4">
          {formatted}
        </div>
      </div>
      <div className="body flex flex-col gap-3 justify-between ">
          <div className="text">
        <h1 className='text-[24px] font-semibold leading-[110%] tracking-normal max-w-[90%] mb-2'>{tourProperty.name}</h1>
        <div className='flex gap-1'>
          {tourProperty.tags.map((el, i) => (
            <Button key={i} type="secondary" Effectclass="" title={el} />
          ))}
        </div>
      </div>
      <div className="action flex items-center justify-between">
        <div className="price relative flex gap-1 pl-3">
          <h1>{price}сом</h1>
          <del className='text-gray-500 absolute top-[-13px] right-[-90%] inline'>{tourProperty.price}сом</del>
        </div>
        <div className="tickets"></div>
        <Button type="primary" Effectclass="py-3 px-5" title="Buy" />
      </div>
      </div>
    </div>
  )
}
