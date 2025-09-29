import { useModals } from '@/Hooks/MainStore'
import Close_button from '@/shared/UI/Close_button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tour } from '../Model/Tour_Model'
import { Agency } from '@/entities/agencies/Model/Agency_Model'
import Button from '@/shared/UI/Button'
import { useReviewsStore } from '@/Hooks/ReviewsTour'
import Review_card from '@/entities/reviews/UI/Review_card'
import { Review } from '@/entities/reviews/Model/Rewies'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Add_Review from '@/features/Add_Review/Add_Review'
import { useApplicationStore } from '@/Hooks/ApplicationStore'
import { useAuthStore } from '@/Hooks/AuthStore'


const formatDateTime = (isoString: string) => {
  const [datePart, timePart] = isoString.split("T")
  const [year, month, day] = datePart.split("-")
  console.log(isoString);
  
  const [hours, minutes] = timePart.split(":")
  return `${year}/${month}/${day} ${hours}:${minutes}`
}

export default function Tour_Buying_modal() {
  let {isAuthenticated} = useAuthStore()
    const { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview } = useReviewsStore()
    let {addApplication} = useApplicationStore()
  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])
    let { modals, close, open } = useModals()
    let {companyData,userData} = useAuthStore()
    let activeModal = modals.find(el => el.key === "buy")?.isActive || false
    let isChild = modals.find(el => el.key === "add_review")?.isActive
    let tourId = modals.find(el=>el.key == "buy")?.tourId
    let resReviews:Review[] = reviews.filter(el => el.tourId == tourId)
    let [tour,setTour] = useState<Tour>()
    let [agency,setAgency] = useState<Agency>()
    let [tickets,setTic] = useState(0)
    let fetch = async () =>{
      if(tourId !==undefined && tourId !=0){
        let responce = await axios.get(`https://dff9a02614421063.mokky.dev/Tour/${tourId}`)
        setTour(responce.data as Tour)
        let responce2 = await axios.get(`https://dff9a02614421063.mokky.dev/Agency/${responce.data.agency_id}`)
        setAgency(responce2.data as Agency)
      }
      
    }
    useEffect(()=>{
      fetch()
      if( activeModal&& !isChild){
        document.body.style.overflow = 'auto'
        window.scrollTo({top: 0,behavior: "smooth"})
      }
      else if(activeModal && isChild){
         window.scrollTo({top:900,behavior: "smooth"})
         document.body.style.overflow = 'hidden'
      }
      
    },[tourId,modals])
    console.log(tour);
    let rating = []
  for(let i = 0;i<5 ; i++){
    if(i < Math.floor(tour?.rating ?? 0)){
       rating.push(<img src={"/starFull.svg"} key={`img${tour?.id}-${i}`} />)
    }else{
      rating.push(<img src={"/starEmpty.svg"} key={`img${tour?.id}-${i}`} />)
    }
  }
   const [year, month, day] =
     tour
       ? tour.date !== undefined
         ? tour.date.start_date.split("-")
         : formatDateTime(tour.start_date).slice(0, 10).split("/")
       : ["", "", ""];
  const formatted = `${month}/${day}/${year.slice(2)}`;
  function submit (){
    if(tickets ==0 )return alert("билетов 0 так нельзя")
    if(companyData)return alert("компаниям нельзя покупать ")
    if(!isAuthenticated){
      close("buy")
      open("sign_in")
      return
    }
    if (tour?.id === undefined) {
      alert("Ошибка: не удалось определить тур");
      return;
    }
    addApplication({
      status: "waiting",
      tourId: tour.id,
      userId: userData?.id ?? 0,
      number_of_tickets: tickets
    })
    close("buy")
  }
  return (
    <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[3600px]  absolute top-0 left-0 z-6  flex justify-center ${activeModal ? '' : 'hidden'} pt-20`}>
          <div className='w-[90%] bg-white min-h-screen relative rounded-[80px] h-[1500px] p-8' >
              <Close_button setState={close} modalKey={"buy"} />
              <div className="body">
                 <div className="tour_Agency flex items-center justify-between">
                  <div className="head flex items-center gap-2">
                    <div className="img w-[40px] h-[40px] rounded-4xl border-1 border-gray-500">
                       <img src={agency?.img} alt="" className='rounded-4xl' />
                    </div>
                      <h1>Турогенство {agency?.name}</h1>
                  </div>
                  <div className="foot">
                    <p onClick={()=>{
                      open("detail_company",0,()=>{},agency?.id)
                      close("buy")
                    }} className='pr-13 text-blue-500 underline'>смотреть</p>
                  </div>
                 </div>
                 <div className="img relative h-[400px] w-full">
                  <img src={tour?.img} alt="" className='w-full h-[380px] object-cover rounded-[50px] mt-5 absolute'/>
                  <div className="foot absolute z-2 bg-white rounded-2xl max-w-[108px] flex items-center justify-center px-4 py-2 top-8 left-8">
                    {formatted}
                  </div>
                  <div className="rating flex rounded-2xl bg-white items-center justify-center max-w-[154px] gap-2 p-1.5 absolute z-3 top-8 right-8">
                    Rating 
                     <div className="stars flex">
                        {rating.map(el=>el)}
                       </div>
                  </div>
                 </div>
                 <div className="head pt-5">
                  <div className="tags">
                     <div className='flex gap-1'>
                               {tour?.tags.map((el, i) => (
                                 <Button key={i} type="secondary" Effectclass={` `} title={el} />
                               ))}
                      </div>
                  </div>
                  <h1 className='text-[40px] font-bold'>{tour?.name}</h1>
                  <p className='text-gray-500 text-[16px] '> {tour?.description}</p>
                 </div>
                 <div className="other-data border-t border-b border-gray-500 flex items-start justify-around py-5 mt-5">
                   <div className="inf ">
                    <h1 className='font-bold text-[18px]'>Кол-во пассажиров</h1>
                    <div className="sit flex items-center gap-4">
                        <h1>Всего мест: {tour?.people_count}</h1>
                        <Button type="secondary" title={`Осталось ${tour? tour.people_count-tour.book_count :""}`} Effectclass='' />
                    </div>
                   </div>
                   <div className="line h-[60px] w-[1px] bg-gray-400 self-center"></div>
                   <div className="inf">
                    <h1  className='font-bold text-[18px]'>Тип транспорта </h1>
                    {tour ? <Button type="secondary" title={tour.vehicle_type } Effectclass='' />:""}
                   </div>
                 </div>
                 <div className="Way mt-5">
                  <h1 className='text-[20px] '>Маршруты </h1>
                  <div className="trip flex gap-3">
                    <div className="startPlace flex gap-2">
                      <h1 className='text-green-500 flex items-center gap-1'>Выезд <img src="/tripIcon.svg" alt="" /></h1>
                      <div className="time border-1 border-green-500 text-green-500 w-[70px] py-2 rounded-4xl text-center">
                        {tour?tour.location.start_point.start_time:""}
                      </div>

                    </div>
                    <img src="/array.svg" alt="" />
                    <div className="middle flex">
                      {tour?tour.location.middle_points.map(el=>(<div key={`ELmID-${el.addres}`} className='flex gap-2 items-center pl-3'> 
                        <h1 className='text-blue-500 flex items-center gap-1'>{el.location}</h1>
                        <div className="time border-1 border-blue-500 text-blue-500 w-[70px] py-2 rounded-4xl text-center">
                        {el.start_time}
                      </div>
                      <img src="/array.svg" alt="" />
                      </div>)):""}
                    </div>
                    <div className="endPlace flex gap-2">
                      <h1 className='text-red-500 flex items-center gap-1'>Конечная<img src="/finishIcon.svg" alt="" /></h1>
                      <div className="time border-1 border-red-500 text-red-500 w-[70px] py-2 rounded-4xl text-center">
                        {tour?tour.location.end_point.start_time:""}
                      </div>
                    </div>
                  </div>
                 </div>
                 <div className="map">
                  {/* времени не было изучать апишку для карты плюс там нада банковскую карту привязать если норм апи хочешь использовать
                  а если бесплатные то у них ограниченный функционал или не совместимость с реактом 19 или вообще не грузик как в яндекс */}
                 </div>
                 <div className="review mt-5 w-full">
                  <Add_Review />
                  <div className="head flex items-center justify-between">
                    <h1 className='text-[20px] '>Отзывы</h1>
                    <Button Effectclass='' type='secondary' title="Оставить отзыв" onClick={()=>{
                      if(isAuthenticated){
                        open("add_review",tour?.id)
                      }else{
                        close("buy")
                        open("sign_in")
                      }
                    }}/>
                  </div>
                    <Swiper
        modules={[Pagination]}
        spaceBetween={15}
        slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: -100 },
        }}
      >
        
                  {resReviews.length > 0 ?resReviews.map(el=>(
                    <SwiperSlide className="flex items-center "> <div className="slipe w-full"><Review_card review={el}/> </div></SwiperSlide>
                  )) : (<div className='w-full h-[300px] flex flex-col items-center justify-center '><h1 className='text-[20px]'>Пока что нету отзывов</h1></div>)}
               </Swiper>
                
                 </div>

              </div>
              <div className="foot w-full border-t border-gray-400 p-4 flex justify-center items-center gap-10">
                 <div className="price relative flex gap-6 items-center pl-3">
                    <h1 className='text-[25px] font-bold'>{tour? tour.price-tour.discount:""}сом</h1>
                    <div className='text-gray-500 text-[25px] absolute top-[-14px] right-[67%] inline z-10 line-through '>{tour?.price}сом</div>
                    <div className="count flex items-center gap-5 text-blue-500 border-1 border-blue-500 rounded-[80px] py-4 px-5">
                        <button disabled={tickets-1 < 0} onClick={()=>setTic(prev=>prev-1)}>{"<"}</button>
                        <p>{tickets}</p>
                        <button disabled={tickets+1 > (tour? tour.people_count - tour.book_count  : 0)} onClick={()=>setTic(prev=>prev+1)}>{">"}</button>
                    </div>
                    <Button type='primary' title="Купить" Effectclass='w-[180px] h-[50px]' onClick={submit} />
                 </div>
              </div>
          </div>
    </div>
  )
}
