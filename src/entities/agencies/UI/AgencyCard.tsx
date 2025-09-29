import React from 'react'
import { Agency } from '../Model/Agency_Model'
import Button from '@/shared/UI/Button'

interface AgencyCardProps {
  agencyProperty: Agency
}
export default function AgencyCard({ agencyProperty }:AgencyCardProps) {
    let rating = []
  for(let i = 0;i<5 ; i++){
    if(i <Math.floor(agencyProperty.rating)){
       rating.push(<img src={"/starFull.svg"} key={`img${agencyProperty.id}-${i}`} />)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${agencyProperty.id}-${i}`} />)
    }
  }
  return (
    <div className="Agency flex flex-col items-center w-[350px] py-4 gap-4 h-[480px] ">
      <div className="head flex items-center justify-between w-[90%]">
         <div className="rating flex gap-1 bg-white p-1 px-2 rounded-2xl ">Rating {rating}</div>
         <h1>(27 Tours)</h1>
      </div>
      <img src={agencyProperty.img} alt="" className='w-[90%]  object-fit rounded-3xl' />
      <h1 className='font-semibold text-[24px] leading-[110%] tracking-[0] text-center'>{agencyProperty.name}</h1>
      <Button type="primary" Effectclass="py-3 px-5" title="View tours" />
    </div>
  )
}
