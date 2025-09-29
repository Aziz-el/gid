"use client"

import Agency_filter from '@/features/Agency_Filter/Agency_filter'
import React, { useEffect, useState } from 'react'
import { Agency} from '@/entities/agencies/Model/Agency_Model'
import get_Agencies from '@/entities/agencies/Model/Agency_Model'
import AgencyCard from '@/entities/agencies/UI/AgencyCard'
import All_Agencies from '@/features/All_Agencyis/All_Agencyis'
export default function Home_Agencies() {
    let [data, setData] = useState<Agency[]>([])
    useEffect(() => {
        get_Agencies(4,1).then((res) => setData(res.items))
    }, [])
    let rating = []
  return (
    <div id='agencyes' className="Agencies px-5 flex flex-col ">
        <div className="head flex justify-between items-center mx-10">
            <h1 className="font-bold text-[50px] ">Travel agencies</h1>
            <Agency_filter/>
        </div>
        <div className="body flex items-center justify-center">
            {data.length>0?data.map((el,i)=>{
                if(i != 3){
                    return (<div key={i} className="cont border-r border-gray-400"><AgencyCard  agencyProperty={el}/></div>)
                }else{return (<div key={i} className="cont"><AgencyCard  agencyProperty={el}/></div>)}
            }):<p>No agencies found</p>}
        </div>
        <All_Agencies/>
    </div>
  )
}
