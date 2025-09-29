import { useAuthStore } from '@/Hooks/AuthStore'
import { useModals } from '@/Hooks/MainStore'
import { useReviewsStore } from '@/Hooks/ReviewsTour'
import Button from '@/shared/UI/Button'
import Close_button from '@/shared/UI/Close_button'
import React, { useRef, useState } from 'react'

export default function Add_Review() {
    let {modals,open,close} = useModals()
    let {companyData,userData} = useAuthStore()
    let {createReview} = useReviewsStore()
    let activeModal = modals.find(el => el.key === "add_review")?.isActive || false
    let tourId = modals.find(el=>el.key == "add_review")?.tourId
    let [ratingStars,setRating] = useState(0)
    let [text,setText] = useState("")
    let rating = []
    for(let i = 0;i<5 ; i++){
    if(i < ratingStars){
       rating.push(<img src={"/starFull.svg"} key={`img${"1a"}-${i}`}  onClick={()=>setRating(i+1)}/>)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${"1ab"}-${i}`} onClick={()=>setRating(i+1)} />)
    }
  }
  function submit (){
     if (typeof tourId !== "number") return;
     const reviewerId = userData?.id ?? companyData?.id;
     if (typeof reviewerId !== "number") return; 
     createReview({tourId: tourId, text: text, rating: ratingStars, reviewerId: reviewerId, data: ""})
     close("add_review")
   
  }
  return (
    <div className={`addding_review bg-white border-1 border-blue-500 w-[600px] h-[500px] rounded-[80px] absolute z-11 left-[400px] ${activeModal?"":"hidden"} `}>
        <Close_button setState={close} modalKey={"add_review"} />
        <div className="body flex flex-col gap-3 items-center  justify-center pt-10">
            <h1 className='self-start pl-13'>Оценка</h1>
            <div className='self-start pl-13 flex gap-1 p-1 '>
              {rating}
              {ratingStars}/5
            </div>
            <h1 className='self-start pl-13'>Комментарий</h1>
            <input type="text" name="" id=""  className='h-[200px] w-[400px] rounded-[40px] border-1 border-blue-500 text-start pl-4' onChange={(e)=>setText(e.currentTarget.value)} value={text}/>
            <Button type="primary" title="Оставить коментарий" Effectclass='w-[85%]' onClick={()=>submit()}/>
        </div>
    </div>
  )
}
