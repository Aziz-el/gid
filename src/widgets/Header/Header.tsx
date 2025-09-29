"use client"
import Languages from "@/features/Languages/Languages"
import Search from "@/features/Search/Search"
import { useModals } from "@/Hooks/MainStore"
import NavLink from "@/shared/UI/NavLink"
import navLink from "@/shared/UI/NavLink"
import React from "react"
export default function Header() {
  const { open } = useModals();
  return (
    <div className="header flex items-center px-[80px] py-[40px] justify-between absolute w-full z-5">
       <div className="head flex items-center">
          <img src="/Logo.svg" alt="" />
          <div className="nav flex gap-[30px] ml-[124px] text-[14px] items-center justify-center text-[#494848]">
              <NavLink href="#Home" >Home</NavLink>
              <NavLink href="#tours">Tours</NavLink>
              <NavLink href="#agencyes">Organization</NavLink>
              <Search />
          </div>  
       </div>
        <div className="btns flex gap-5">
          <Languages />
          <div className="sign-in_sign-up bg-white px-[14px] flex   w-[160px] py-[7px] rounded-[24px]">
            <p onClick={() => open("sign_in")}>Register /</p>
            <p  >Sign In</p>
          </div>
        </div>
    </div>
  )
}
