"use client"
import Slider from "@/entities/stocks/UI/Slider_Stock";
import CompanyRegister from "@/features/Sign_in/CompanyRegister";
import Sign_in from "@/features/Sign_in/Sign_in";
import UserRegister from "@/features/Sign_in/UserRegister";
import { useState } from "react";

export default function Home_Home() {
  return (
    <div id="home" className="Home_Home w-full relative ">
       <img src="/Home_Home_bg.jpg" alt="" className="rounded-b-[124px] absolute z-[-1] h-[695px] w-full"/>
        <Slider />
        <Sign_in />
        <UserRegister />
        <CompanyRegister/>
    </div>
  )
}
