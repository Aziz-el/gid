"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import Sign_in from "@/features/Sign_in/Sign_in"
import UserRegister from "@/features/Sign_in/UserRegister"
import CompanyRegister from "@/features/Sign_in/CompanyRegister"

export interface Modal {
  key: string
  component: ReactNode
  isActive: boolean
}

interface ModalContextType {
  modals: Modal[]
  open: (key: string) => void
  close: (key: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([
    { key: "sign_in", component: <Sign_in />, isActive: false },
    { key: "sign_in_tourist", component: <UserRegister />, isActive: false },
    { key: "sign_in_company", component: <CompanyRegister />, isActive: false },
  ])

  const open = (key: string) =>
    setModals((prev) =>
      prev.map((m) => (m.key === key ? { ...m, isActive: true } : m))
    )

  const close = (key: string) =>
    setModals((prev) =>
      prev.map((m) => (m.key === key ? { ...m, isActive: false } : m))
    )

  return (
    <ModalContext.Provider value={{ modals, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModals must be used within ModalProvider")
  }
  return context
}
