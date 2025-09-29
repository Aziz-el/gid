"use client"
import axios from "axios"
import { create } from "zustand"

export type UserType = "user" | "company"

interface UserData {
  fullName?: string
  email?: string
  city?: string
  password?: string
}

interface CompanyData {
  name?: string
  fullName?: string
  email?: string
  phone?: string
  city?: string
  address?: string
  password?: string
}

interface AuthState {
  isAuthenticated: boolean
  userType: UserType | null
  userData: UserData | null
  companyData: CompanyData | null
  setUserType: (type: UserType) => void
  registerUser: (data: UserData) => Promise<void>
  registerCompany: (data: CompanyData) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userType: null,
  userData: null,
  companyData: null,

  setUserType: (type) => set({ userType: type }),

  registerUser: async (data) => {
    const response = await axios.post("https://dff9a02614421063.mokky.dev/users", data)

    if (response.status === 200) {
      set({
        isAuthenticated: true,
        userType: "user",
        userData: data,
        companyData: null
      })
    }
  },

  registerCompany: async (data) => {
    const response = await axios.post("https://dff9a02614421063.mokky.dev/companies", data)

    if (response.status === 200) {
      set({
        isAuthenticated: true,
        userType: "company",
        companyData: data,
        userData: null
      })
    }
  },

  login: async (email, password) => {
    const response = await axios.post("https://dff9a02614421063.mokky.dev/auth", { email, password })

    if (response.status === 200) {
      if (response.data.type === "user") {
        set({
          isAuthenticated: true,
          userType: "user",
          userData: response.data,
          companyData: null
        })
      } else {
        set({
          isAuthenticated: true,
          userType: "company",
          companyData: response.data,
          userData: null
        })
      }
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      userType: null,
      userData: null,
      companyData: null
    })
  }
}))
