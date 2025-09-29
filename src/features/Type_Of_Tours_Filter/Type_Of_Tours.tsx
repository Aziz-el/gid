"use client"
import { useState } from "react"
import { Menu, Square } from "lucide-react" // пример иконок

export default function Type_Of_Tours() {
  const [active, setActive] = useState<"menu" | "square">("menu")

  return (
    <div className="flex items-center gap-2 p-1 bg-white rounded-full shadow  w-23 justify-between">
      <button
        onClick={() => setActive("menu")}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
          active === "menu" ? "bg-blue-500 text-white" : "text-blue-400"
        }`}
      >
        <Menu size={20} />
      </button>
      <button
        onClick={() => setActive("square")}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
          active === "square" ? "bg-blue-500 text-white" : "text-blue-400"
        }`}
      >
        <Square size={20} />
      </button>
    </div>
  )
}
