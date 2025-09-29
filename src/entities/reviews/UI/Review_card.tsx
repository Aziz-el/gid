"use client"

import React, { useEffect, useState } from 'react'
import { Review } from '../Model/Rewies'
import axios from 'axios'
import { User } from '@/entities/users/Model/User_Model'
import { useReviewsStore } from '@/Hooks/ReviewsTour'



interface Reviewer  {
fullName:string
}
export default function Review_card({review,isCom}:{review:Review,isCom?:boolean}) {
    let data = new Date().toISOString()
    let {deleteReview,reviews,fetchReviews} = useReviewsStore()
    let [reviewer,setReviewrer] = useState<Reviewer>()
    console.log(reviewer);
    
    async function fetch(){
        let responce = await axios.get(`https://dff9a02614421063.mokky.dev/users/${review.reviewerId}`)
        
        setReviewrer(responce.data)
    }
    useEffect(()=>{
      fetch()
      fetchReviews()
    },[fetchReviews,deleteReview,reviews])
    let rating = []
  for(let i = 0;i<5 ; i++){
    if(i < Math.floor(review.rating)){
       rating.push(<img src={"/starFull.svg"} key={`img${review.text[1]}-${i}`} />)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${review.text[1]}-${i}`} />)
    }
  }
  return (
    <div className={`review w-[350px] max-h-[500px] py-10 bg-[#1083E61A] rounded-[80px] flex flex-col `}>
        <div className="head flex relative px-5">
            {isCom ? "" : (<div className="img">
                <img src="/profileImage.jpg" alt="" className='w-[80px] h-[140px] rounded-3xl object-cover ' />
            </div>)}
            <div className="btns flex flex-col ">
                <div className="others flex">
                    
                    <div className="rating flex rounded-2xl bg-white items-center justify-center max-w-[154px] gap-2 p-3 absolute z-3 top-0 right-8 text-[14px]">
                     <div className="stars flex">
                        {rating.map(el=>el)}
                       </div>
                  </div>
                </div>
                {isCom ? (<div className='p-3 rounded-[70px] bg-blue-600' onClick={()=>{
                  deleteReview(review.id)
                }}><img src="/del.svg" alt="" /></div>):""}
                {isCom ? "" :<h1 className='pl-4 pt-2'>{reviewer?.fullName}</h1>}
            </div>
        </div>
        <div className={isCom ? "mt-10" :""}>
            <p className='text-[12px] max-w-[90%] ml-5'>{review.text}</p>
        </div>
    </div>
  )
}
