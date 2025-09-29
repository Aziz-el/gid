import { User } from '@/entities/users/Model/User_Model'
import { Application, useApplicationStore } from '@/Hooks/ApplicationStore'
import { CompanyData, useAuthStore } from '@/Hooks/AuthStore'
import { useModals } from '@/Hooks/MainStore'
import { Tour } from '@/entities/tours/Model/Tour_Model'
import React from 'react'

export default function Application_Card({application,tour,user}:{application:Application, tour:Tour,user:User}) {
    let {updateApplication} = useApplicationStore()
    let {userData} = useAuthStore()
  return (
    <div className="apple_card w-[300px] flex flex-col items-center">
        <div className="head mb-3">
            <h1 className='text-[25px] text-center'>{tour.name}</h1>
            <img src={tour.img} alt=""  className='rounded-[40px] w-[300px] h-[200px]'/>
        </div>
        <div className="body flex gap-3">
            <div className="img">
                <img src="/profileImage.jpg" alt="" className='w-[80px] h-[140px] rounded-3xl object-cover ' />
            </div>
            <div className="title flex flex-col gap-2">
                <h1>{user.fullName}</h1>
                <p>Tickets: {application.number_of_tickets}</p>
                <p>phone:{user.number}</p>
                <div className="btns flex gap-3">
                    {application.status == "waiting" ?(
                        <>
                        {userData ? (
                            <div>
                                <button className='bg-gray-500 roudned-[50px] w-[100px] text-white  h-[50px] rounded-4xl'>Waiting</button>
                            </div>
                        ):(
                        <>
                        <button className='bg-red-500 roudned-[50px] w-[100px] text-white  h-[50px] rounded-4xl' onClick={() => { if (application.id !== undefined) updateApplication(application.id, { ...application, status:"decline" }) }}>Decline</button>
                        <button className='bg-blue-500 roudned-[50px] w-[100px] text-white  h-[50px] rounded-4xl'onClick={() => { if (application.id !== undefined) updateApplication(application.id, { ...application, status: "accept" }) }}>Accept</button>
                        </>
                        )}
                    </>
                    ) : (
                        <>
                            {application.status == "accept" ? (
                                <div className='bg-blue-500 roudned-[50px] w-[200px] text-white text-center pt-3 h-[50px] rounded-4xl'> accepted</div>
                            ) : (
                                <div className='bg-red-500 roudned-[50px] w-[200px] text-white text-center pt-3 h-[50px] rounded-4xl'> declined</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
