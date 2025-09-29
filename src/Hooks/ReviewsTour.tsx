import { create } from "zustand"
import axios from "axios"
import { Review } from "@/entities/reviews/Model/Rewies"

const API_URL = "https://dff9a02614421063.mokky.dev/reviews"

type State = {
  reviews: Review[]
  loading: boolean
  error: string | null
}

type Actions = {
  fetchReviews: () => Promise<void>
  createReview: (review: Review) => Promise<void>
  updateReview: (id: number, review: Partial<Review>) => Promise<void>
  deleteReview: (id: number) => Promise<void>
}

export const useReviewsStore = create<State & Actions>((set) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviews: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get<Review[]>(API_URL)
      set({ reviews: data })
    } catch (e) {
      set({ error: "Ошибка загрузки отзывов" })
    } finally {
      set({ loading: false })
    }
  },

  createReview: async (review) => {
    try {
      const { data } = await axios.post<Review>(API_URL, review)
      set((state) => ({ reviews: [...state.reviews, data] }))
    } catch (e) {
      set({ error: "Ошибка при создании" })
    }
  },

  updateReview: async (id, review) => {
    try {
      const { data } = await axios.patch<Review>(`${API_URL}/${id}`, review)
      set((state) => ({
        reviews: state.reviews.map((r) => (r.reviewerId === id ? data : r)),
      }))
    } catch (e) {
      set({ error: "Ошибка при обновлении" })
    }
  },

  deleteReview: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      set((state) => ({
        reviews: state.reviews.filter((r) => r.reviewerId !== id),
      }))
    } catch (e) {
      set({ error: "Ошибка при удалении" })
    }
  },
}))
