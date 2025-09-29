"use client"

import { create } from "zustand"
import axios from "axios"

import { User } from '@/entities/users/Model/User_Model'
const API_USERS = "https://dff9a02614421063.mokky.dev/users"

type State = {
  users: User[]
  fetchUsers: () => Promise<void>
  getUserById: (id: number) => User | undefined
}

export const useUserStore = create<State>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    const res = await axios.get<User[]>(API_USERS)
    set({ users: res.data })
  },
  getUserById: (id) => get().users.find(u => u.id === id),
}))
