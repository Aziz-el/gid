import React from 'react'

interface Button {
    title:string,
    type:keyof typeof ButtonTypes,
    Effectclass:string,
    onClick?: () => void 
}

let ButtonTypes = {
    primary: "bg-blue-500 text-white px-4 py-2 rounded-3xl",
    secondary: "bg-[#1083E61A] text-blue-500 px-4 py-2 rounded-3xl",
    third: "bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-3xl",
    fourd: "bg-white text-blue-500  px-2 py-1 rounded-3xl",
    fifth:"bg-[#1083E61A] text-blue-400 px-4 py-3 rounded-3xl ",
    sixth:"bg-white border-1 border-red-400 px-4 py-3 rounded-3xl text-red-500 ",
}
export default function Button(buttonProperty:Button) {
  return (
    <button className={`${buttonProperty.Effectclass} ${ButtonTypes[buttonProperty.type]}`} onClick={buttonProperty.onClick}>{buttonProperty.title}</button>
  )
}
