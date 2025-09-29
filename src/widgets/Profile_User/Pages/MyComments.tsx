"use client"

import Review_card from '@/entities/reviews/UI/Review_card'
import { useAuthStore } from '@/Hooks/AuthStore'
import { useReviewsStore } from '@/Hooks/ReviewsTour'

import React, { Key, useEffect } from 'react'
import { Pagination } from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

export default function MyComments({activePage}: {activePage: number}) {
  const { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview } = useReviewsStore()
  let {userData} = useAuthStore()
  useEffect(() => {
      fetchReviews()
    }, [fetchReviews])
    let userComments = reviews.filter((el) => el.reviewerId === userData?.id);

  return (
    <>
    {activePage === 2 ? (
        <div className="my_comments flex max-w-[600px] m-0 " key="my-comments-container">
            <Swiper
                  modules={[Pagination]}
                  spaceBetween={15}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                  breakpoints={{  
                    1024: { slidesPerView: 3, spaceBetween: 160 },
                  }}
                >
          {
            userComments.length >0?
            userComments.map(el => (
               <SwiperSlide className="flex items-center "> <div className="slipe">
              <Review_card review={el} isCom={true} />
              </div></SwiperSlide>
            )):( <SwiperSlide><div className='w-[900px] h-[500px] flex items-center '><h1 className='flex justify-center'>Пока что нету коментов</h1></div></SwiperSlide>)
          }
          </Swiper>
        </div>
    ) : null}
    </>
  )
}
