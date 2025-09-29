  "use client"
  import { Tour } from "@/entities/tours/Model/Tour_Model"
  import axios from "axios"
  import { create } from "zustand"
  import { persist } from "zustand/middleware"

  export type UserType = "user" | "company"

  export interface UserData {
    id?: number
    fullName?: string
    email?: string
    city?: string
    password?: string
    img?: string
    family?: string
    age?: string
    number?: string
    favorites?: number[]
  }

  export interface CompanyData {
    id?: number
    name?: string
    fullName?: string
    email?: string
    phone?: string
    city?: string
    address?: string
    description?:string
    password?: string
    favorites?: number[],
    img?:string
  }

  interface AuthState {
    isAuthenticated: boolean
    userType: UserType | null
    userData: UserData | null
    companyData: CompanyData | null
    setUserType: (type: UserType) => void
    registerUser: (data: UserData) => Promise<void>
    registerCompany: (data: CompanyData) => Promise<void>
    login: (email: string, password: string, type: UserType) => Promise<void>
    logout: () => void
    setUserData: (data: Partial<UserData>) => Promise<void>
    setCompanyData: (data: Partial<CompanyData>) => Promise<void>
    switchFavorite: (tourId: number) => Promise<boolean>
    setPassword: (newPassword: string) => Promise<void>
    deleteAccount: () => Promise<void>
  }
  export const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        userType: null,
        userData: null,
        companyData: null,

        setUserType: (type) => set({ userType: type }),

        registerUser: async (data) => {
          const { password, ...rest } = data
          const response = await axios.post("https://dff9a02614421063.mokky.dev/users", data)
          if (response.status >= 200 && response.status < 300) {
            set({
              isAuthenticated: true,
              userType: "user",
              userData: { ...rest, id: response.data.id, favorites: [] },
              companyData: null,
            })
          }
        },

        registerCompany: async (data) => {
          const { password, ...rest } = data
          const response = await axios.post("https://dff9a02614421063.mokky.dev/Agency", data)
          if (response.status >= 200 && response.status < 300) {
            set({
              isAuthenticated: true,
              userType: "company",
              companyData: { ...rest, id: response.data.id },
              userData: null,
            })
            close
          }
        },

        login: async (email, password, type) => {
          const endpoint =
            type === "user"
              ? "https://dff9a02614421063.mokky.dev/users"
              : "https://dff9a02614421063.mokky.dev/Agency"

          const response = await axios.get(endpoint, { params: { email, password } })

          if (response.status >= 200 && response.status < 300 && response.data.length > 0) {
            if (type === "user") {
              set({
                isAuthenticated: true,
                userType: "user",
                userData: response.data[0],
                companyData: null,
              })
            } else {
              set({
                isAuthenticated: true,
                userType: "company",
                companyData: response.data[0],
                userData: null,
              })
            }
          } else {
            throw new Error("Invalid credentials")
          }
        },

        logout: () => {
          set({
            isAuthenticated: false,
            userType: null,
            userData: null,
            companyData: null,
          })
        },

        setUserData: async (data) => {
          const { userData } = get()
          if (!userData?.id) return

          const response = await axios.patch(
            `https://dff9a02614421063.mokky.dev/users/${userData.id}`,
            {...userData,...data}
          )

          if (response.status >= 200 && response.status < 300) {
            set({ userData: { ...userData, ...data } })
          }
        },

        setCompanyData: async (data) => {
          const { companyData } = get()
          if (!companyData?.id) return
          const response = await axios.patch(
            `https://dff9a02614421063.mokky.dev/Agency/${companyData.id}`,
            {...companyData,...data}
          )

          if (response.status >= 200 && response.status < 300) {
            set({ companyData: { ...companyData, ...data } })
          }
        },  
  switchFavorite: async (tourId) => {
    const { userType, userData, companyData } = get()

    if (userType === "user" && userData?.id) {
      const isFavorite = userData.favorites?.includes(tourId)
      const updatedFavorites = isFavorite
        ? userData.favorites!.filter(id => id !== tourId)
        : [...(userData.favorites || []), tourId]

      const response = await axios.patch(
        `https://dff9a02614421063.mokky.dev/users/${userData.id}`,
        { ...userData, favorites: updatedFavorites }
      )

      if (response.status >= 200 && response.status < 300) {
        set({ userData: { ...userData, favorites: updatedFavorites } })
        return !isFavorite
      }
    }

    if (userType === "company" && companyData?.id) {
      const isFavorite = companyData.favorites?.includes(tourId)
      const updatedFavorites = isFavorite
        ? companyData.favorites!.filter(id => id !== tourId)
        : [...(companyData.favorites || []), tourId]

      const response = await axios.patch(
        `https://dff9a02614421063.mokky.dev/Agency/${companyData.id}`,
        { ...companyData, favorites: updatedFavorites }
      )

      if (response.status >= 200 && response.status < 300) {
        set({ companyData: { ...companyData, favorites: updatedFavorites } })
        return !isFavorite
      }
    }

    return false
  },

        setPassword: async (newPassword: string) => {
    const { userType, userData, companyData } = get()

    if (userType === "user" && userData?.id) {
      const response = await axios.patch(
        `https://dff9a02614421063.mokky.dev/users/${userData.id}`,
        { password: newPassword }
      )
      console.log(response);
      
      if (response.status >= 200 && response.status < 300) {
        set({ userData: { ...userData, password: newPassword } })
      }
      
    } else if (userType === "company" && companyData?.id) {
      const response = await axios.patch(
        `https://dff9a02614421063.mokky.dev/Agency/${companyData.id}`,
        { password: newPassword }
      )
      
      if (response.status >= 200 && response.status < 300) {
        set({ companyData: { ...companyData, password: newPassword } })
      }
    }
  },
  deleteAccount: async (): Promise<void> => {
    const { userType, userData, companyData, logout } = get()

    try {
      if (userType === "user" && userData?.id) {
        const response = await axios.delete(
          `https://dff9a02614421063.mokky.dev/users/${userData.id}`
        )
        if (response.status >= 200 && response.status < 300) {
          logout()
        }
      } else if (userType === "company" && companyData?.id) {
        const response = await axios.delete(
          `https://dff9a02614421063.mokky.dev/Agency/${companyData.id}`
        )
        if (response.status >= 200 && response.status < 300) {
          logout()
        }
      }
    } catch (err) {
      console.error("Ошибка при удалении аккаунта:", err)
      throw new Error("Не удалось удалить аккаунт")
    }
  }

      }),
      { name: "auth-store" }
    )
  )
