"use client"

import { create } from "zustand"
import axios from "axios"
import { Tour } from "./ToursStore"

export type Application = {
  id?: number
  tourId: number
  userId: number
  number_of_tickets: number
  status: "accept" | "decline" | "waiting"
}

const API_URL = "https://dff9a02614421063.mokky.dev/applications"

type State = {
  applications: Application[]
  loading: boolean
  error: string | null
  fetchApplications: () => Promise<void>
  addApplication: (data: Omit<Application, "id">) => Promise<void>
  updateApplication: (id: number, data: Partial<Application>) => Promise<void>
  deleteApplication: (id: number) => Promise<void>
}

export const useApplicationStore = create<State>((set) => ({
  applications: [],
  loading: false,
  error: null,

  fetchApplications: async () => {
    try {
      set({ loading: true, error: null })
      const res = await axios.get<Application[]>(API_URL)
      set({ applications: res.data, loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },

  addApplication: async (data) => {
    try {
      const res = await axios.post<Application>(API_URL, data)
      set((state) => ({ applications: [...state.applications, res.data] }))
    } catch (e: any) {
      set({ error: e.message })
    }
  },

  updateApplication: async (id, data) => {
    try {
      const res = await axios.patch<Application>(`${API_URL}/${id}`, data)
      if(data.status == "accept"){
         const tourRes = await axios.get<Tour>(`https://dff9a02614421063.mokky.dev/Tour/${res.data.tourId}`)
        const currentBookCount = tourRes.data.people_count ?? 0
      await axios.patch<Tour>(
        `https://dff9a02614421063.mokky.dev/Tour/${res.data.tourId}`,
        { people_count: currentBookCount - (data.number_of_tickets ?? 0) }
      )
      }
      set((state) => ({
        applications: state.applications.map((app) =>
          app.id === id ? res.data : app
        ),
      }))
    } catch (e: any) {
      set({ error: e.message })
    }
  },

  deleteApplication: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
      }))
    } catch (e: any) {
      set({ error: e.message })
    }
  },
}))
