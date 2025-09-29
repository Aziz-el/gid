"use client"

import React from "react"
import Button from "@/shared/UI/Button"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description: string
  actionText: string
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  actionText,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[60px] w-[90%] max-w-md p-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-center text-gray-400">{description}</p>
        <Button
          title={actionText}
          type="primary"
          Effectclass="w-full py-3 rounded-3xl bg-red-500 text-white text-lg"
          onClick={onConfirm}
        />
        <button
          onClick={onClose}
          className="text-gray-400 mt-2 hover:text-gray-600"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
