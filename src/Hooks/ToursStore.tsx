"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import { Tour } from "@/entities/tours/Model/Tour_Model"

interface TourState {
  tours: Tour[]
  fetchTours: () => Promise<void>
  addTour: (tour: Omit<Tour, "id">) => Promise<void>
  updateTour: (tourId: number, data: Partial<Tour>) => Promise<void>
  deleteTour: (tourId: number) => Promise<void>
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      tours: [],

      fetchTours: async () => {
        const res = await axios.get("https://dff9a02614421063.mokky.dev/Tour")
        if (res.status >= 200 && res.status < 300) {
          set({ tours: res.data })
        }
      },

      addTour: async (tour) => {
        const res = await axios.post("https://dff9a02614421063.mokky.dev/Tour", tour)
        if (res.status >= 200 && res.status < 300) {
          set({ tours: [...get().tours, res.data] })
        }
      },

      updateTour: async (tourId, data) => {
        const res = await axios.patch(`https://dff9a02614421063.mokky.dev/Tour/${tourId}`, data)
        if (res.status >= 200 && res.status < 300) {
          set({
            tours: get().tours.map(t => (t.id === tourId ? { ...t, ...data } : t))
          })
        }
      },

      deleteTour: async (tourId) => {
        const res = await axios.delete(`https://dff9a02614421063.mokky.dev/Tour/${tourId}`)
        if (res.status >= 200 && res.status < 300) {
          set({ tours: get().tours.filter(t => t.id !== tourId) })
        }
      }
    }),
    { name: "tour-store" }
  )
)
