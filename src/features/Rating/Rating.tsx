"use client"
import { useState } from "react"

const ratings = [1, 2, 3, 4, 5]

export default function  Rating() {
  const [selected, setSelected] = useState(1) 
  const [open, setOpen] = useState(false)

  const renderStars = (count: number) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <img
          key={i}
          src={i < count ? "/starFull.svg" : "/starEmpty.svg"}
          alt=""
          className="w-3 h-3"
        />
      ))}
    </div>
  )

  return (
    <div className="relative w-[100px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between  p-3 rounded-xl bg-white py-3"
      >
        {renderStars(selected)}
      </button>

      {open && (
        <ul className="absolute mt-2 w-full bg-white  rounded-lg shadow z-10 ">
          {ratings.map((r) => (
            <li
              key={r}
              onClick={() => {
                setSelected(r)
                setOpen(false)
              }}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
            >
              {renderStars(r)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
