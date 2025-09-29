"use client"

import React, { useState } from "react"
import Button from "@/shared/UI/Button"
import { useAuthStore } from "@/Hooks/AuthStore"
import ConfirmModal from "@/features/Exiet/Exiet"
import { useModals } from "@/Hooks/MainStore"

export default function Settings({
  activePage,
}: {
  activePage: number
}) {
  
  const [form, setForm] = useState({ password: "", repeatPassword: "" })
  const [errors, setErrors] = useState({ password: "", repeatPassword: "" })
  const setPassword = useAuthStore(state => state.setPassword)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
 let {deleteAccount} = useAuthStore()
   let {close, modals} = useModals();
  const handleDelete = () => {
    deleteAccount()
    setDeleteOpen(false)
    close("profile_company")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === "password") {
      setErrors(prev => ({
        ...prev,
        password: value.length < 6 ? "Пароль минимум 6 символов" : "",
        repeatPassword:
          form.repeatPassword && value !== form.repeatPassword
            ? "Пароли не совпадают"
            : "",
      }))
    }

    if (name === "repeatPassword") {
      setErrors(prev => ({
        ...prev,
        repeatPassword: value !== form.password ? "Пароли не совпадают" : "",
      }))
    }
  }

  const handleSubmit = async () => {
    if (errors.password || errors.repeatPassword) return
    try {
      await setPassword(form.password)
      alert("Пароль успешно изменён!")
      setForm({ password: "", repeatPassword: "" })
    } catch (err) {
      alert("Ошибка при смене пароля")
      console.error(err)
    }
  }

  if (activePage !== 5) return null

  const isFormValid =
    !errors.password &&
    !errors.repeatPassword &&
    form.password.length >= 6 &&
    form.repeatPassword.length >= 6

  return (
    <div className="edit w-full">
      <div className="window rounded-[60px] w-[95%] h-[450px] bg-white border border-blue-500 flex flex-col items-start justify-center relative p-6 gap-6">
        <h1 className="text-2xl font-bold">Поменять пароль</h1>
        <div className="password flex gap-4 w-full">
          <div className="flex-1 flex flex-col">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="border border-blue-500 rounded-3xl text-black w-full h-[40px] pl-4"
              placeholder="Новый пароль"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <input
              name="repeatPassword"
              value={form.repeatPassword}
              onChange={handleChange}
              type="password"
              className="border border-blue-500 rounded-3xl text-black w-full h-[40px] pl-4"
              placeholder="Повторите пароль"
            />
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>
            )}
          </div>
        </div>

        <Button
          Effectclass=""
          type="sixth"
          title="Удалить аккаунт"
          onClick={() => setDeleteOpen(true)}
        />
        <ConfirmModal
          isOpen={isDeleteOpen}
          title="Вы точно хотите удалить свой аккаунт"
          description="Мы будем скучать по вам. Надеемся вы передумаете и обратитесь к нашему менеджеру за восстановлением данных."
          actionText="Удалить"
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />

        <Button
          title="Применить"
          type="primary"
          Effectclass="w-[200px] h-[50px] mt-4 self-end"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}
