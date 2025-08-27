import Languages from "@/features/Languages/Languages"
import Search from "@/features/Search/Search"
import NavLink from "@/shared/UI/NavLink"
import navLink from "@/shared/UI/NavLink"
import React from "react"
export default function Header() {
  return (
    <div className="header flex items-center px-[60px] py-[40px] justify-between absolute w-full">
       <div className="head flex items-center">
          <img src="/Logo.svg" alt="" />
          <div className="nav flex gap-[40px] ml-[74px] text-[14px] items-center justify-center text-[#494848]">
              <NavLink href="/" >Home</NavLink>
              <NavLink href="/tours">Tours</NavLink>
              <NavLink href="/organization">Organization</NavLink>
              <Search />
          </div>  
       </div>
        <div className="btns flex gap-5">
          <Languages />
          <div className="sign-in_sign-up bg-white px-[14px]  py-[7px] rounded-[24px]">
            <NavLink href="/sign-in">Register / </NavLink>
            <NavLink href="/sign-up">Sign Up</NavLink>
          </div>
        </div>
    </div>
  )
}
