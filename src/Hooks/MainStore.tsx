"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import Sign_in from "@/widgets/Sign_in/Sign_in"
import UserRegister from "@/widgets/Sign_in/UserRegister"
import CompanyRegister from "@/widgets/Sign_in/CompanyRegister"
import Login from "@/widgets/Login/Login"
import Profile_User from "@/widgets/Profile_User/Profile_User"
import Add_Middle_Point from "@/features/Add_Middle_Point/Add_Middle_Point"
import Tour_Buying_modal from "@/entities/tours/UI/Tour_Buying_modal"
import Edit_Middle_Point from "@/features/Edit_Middle_Point/Edit_Middle_Point"
import { Step2 } from "@/widgets/Profile_Company/Pages/Add_Tour/Adding_steps"
import Agency_detail from "@/entities/agencies/UI/Agency_detail"

export interface Modal {
  key: string
  component: ReactNode
  isActive: boolean
  isChild?: boolean
  tourId?: number
  point?: (point: Step2 | ((prev: Step2) => Step2)) => void
  agency_id?:number
}

interface ModalContextType {
  modals: Modal[]
  open: (key: string, tourId?: number, point?: (point: Step2 | ((prev: Step2) => Step2)) => void, agency_id?: number) => void
  close: (key: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([
    { key: "sign_in", component: <Sign_in />, isActive: false },
    { key: "sign_in_tourist", component: <UserRegister />, isActive: false },
    { key: "sign_in_company", component: <CompanyRegister />, isActive: false },
    { key: "login", component: <Login />, isActive: false },
    { key: "profile_user", component: <Profile_User />, isActive: false },
    { key: "profile_company", component: <Profile_User />, isActive: false },
    { key: "profile_company_adding_middle_point", component: <Add_Middle_Point />, isActive: false, isChild: true },
    { key: "buy", component: <Tour_Buying_modal />, isActive: false, tourId: 0 },
    { key: "profile_company_editing_middle_point", component: <Edit_Middle_Point />, isActive: false, point: () => {} },
    { key: "add_review", component: "", isActive: false, isChild:true,tourId:0 },
    { key: "detail_company", component: <Agency_detail />, isActive: false,agency_id:1},
  ])

  const open = (key: string, tourId?: number, point?: (point: Step2 | ((prev: Step2) => Step2)) => void,agency_id?:number) => {
    setModals(prev =>
      prev.map(m =>
        m.key === key
          ? { ...m, isActive: true, tourId, ...(point ? { point } : {}),agency_id }
          : m
      )
    )
    modals.forEach(el => {
      if (el.key === key && el.isChild === undefined) document.body.style.overflow = 'hidden'
    })
  }

  const close = (key: string) => {
    setModals(prev => prev.map(m => (m.key === key ? { ...m, isActive: false } : m)))
    modals.forEach(el => {
      if (el.key === key && el.isChild === undefined) document.body.style.overflow = 'auto'
    })
  }

  return <ModalContext.Provider value={{ modals, open, close }}>{children}</ModalContext.Provider>
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) throw new Error("useModals must be used within ModalProvider")
  return context
}