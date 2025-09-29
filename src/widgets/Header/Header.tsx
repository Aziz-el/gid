"use client"
import ConfirmModal from "@/features/Exiet/Exiet"
import Languages from "@/features/Languages/Languages"
import Search from "@/features/Search/Search"
import { useAuthStore } from "@/Hooks/AuthStore"
import { useModals } from "@/Hooks/MainStore"
import NavLink from "@/shared/UI/NavLink"
import navLink from "@/shared/UI/NavLink"
import React, { useState } from "react"
export default function Header() {
  const { open } = useModals();
  let {isAuthenticated, userData, logout,userType} = useAuthStore();

        let {close, modals} = useModals();
        let [delState,setDel] = useState(false);
        const handleLogout = () => {
      logout()
      setDel(false) 
      close("profile_user")
    }
  return (
    <div className="header flex items-center px-[80px] py-[40px] justify-between absolute w-full z-5">
       <div className="head flex items-center">
          <img src="/Logo.svg" alt="" />
          <div className="nav flex gap-[30px] ml-[124px] text-[14px] items-center justify-center text-[#494848]">
              <NavLink href="#Home" >Home</NavLink>
              <NavLink href="#tours">Tours</NavLink>
              <NavLink href="#agencyes">Organization</NavLink>

          </div>  
       </div>
        <div className="btns flex gap-5">
          {isAuthenticated ? (
            <div className="flex gap-4">
             <div className="profile rounded-[100px] bg-blue-500 p-[6px] w-[60px] h-[40px] flex items-center justify-center" onClick={() =>{userType=="user"?open("profile_user"):open("profile_company")}}>
              <img src="/profile.svg" alt="Profile" />
            </div>
            <div className="user-info flex items-center bg-white px-[14px]  rounded-[24px]">
              <button onClick={()=>setDel(true)}>Logout</button>
            </div>
            </div>
          ) : (
            <div className="sign-in_sign-up bg-white px-[14px] flex  w-[160px] py-[7px] rounded-[24px]">
            <p onClick={() => open("sign_in")}>Register /</p>
            <p onClick={() => open("login")}>Sign In</p>
          </div>
          )}
        </div>
             <ConfirmModal
                             isOpen={delState} 
                             title="Вы точно хотите выйти с аккаунта"
                             description="Надеемся вы запомнили свой пароль. Мы будем скучать по вам."
                             actionText="Выйти"
                             onClose={() => setDel(false)}
                             onConfirm={handleLogout}
                    />
    </div>
  )
}
