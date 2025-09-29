"use client"
import Agency_detail from "@/entities/agencies/UI/Agency_detail";
import Slider from "@/entities/stocks/UI/Slider_Stock";
import Tour_Buying_modal from "@/entities/tours/UI/Tour_Buying_modal";
import ConfirmModal from "@/features/Exiet/Exiet";
import { useAuthStore } from "@/Hooks/AuthStore";
import { useModals } from "@/Hooks/MainStore";
import Login from "@/widgets/Login/Login";
import Profile_Company from "@/widgets/Profile_Company/Profile_Company";
import Profile_User from "@/widgets/Profile_User/Profile_User";
import CompanyRegister from "@/widgets/Sign_in/CompanyRegister";
import Sign_in from "@/widgets/Sign_in/Sign_in";
import UserRegister from "@/widgets/Sign_in/UserRegister";
import { useState } from "react";

export default function Home_Home() {
  return (
    <div id="home" className="Home_Home w-full relative ">
       <img src="/Home_Home_bg.jpg" alt="" className="rounded-b-[124px] absolute z-[-1] h-[695px] w-full"/>
        <Slider />
        <Sign_in />
        <UserRegister />
        <CompanyRegister/>
        <Login />
        <Profile_User />
        <Profile_Company />
        <Tour_Buying_modal />
        <Agency_detail />
    </div>
  )
}
