import React from 'react'

interface Button {
    title:string,
    type:keyof typeof ButtonTypes,
    Effectclass:string
}

let ButtonTypes = {
    primary: "bg-blue-500 text-white px-4 py-2 rounded-3xl",
    secondary: "bg-[#1083E61A] text-blue-500 px-4 py-2 rounded-3xl"
}
export default function Button(buttonProperty:Button) {
  return (
    <button className={`${buttonProperty.Effectclass} ${ButtonTypes[buttonProperty.type]}`}>{buttonProperty.title}</button>
  )
}
