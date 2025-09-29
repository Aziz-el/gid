import React from 'react'

export default function Close_button({ setState,modalKey }: { setState:(key:string)=> void , modalKey: string }) {
  return (
    <div
      onClick={() => setState(modalKey)}
      className="btnClose absolute top-[20px] right-[20px] bg-[#1083E6] px-6 py-3 rounded-4xl cursor-pointer text-[24px] font-bold text-white"
    >
      x
    </div>
  )
}
