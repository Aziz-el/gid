import React, { useState } from 'react'
import Adding_steps from './Adding_steps'


export default function Add_Tour({ activePage }: { activePage: number }) {
  if (activePage !== 1) return null
  return (
    <div className="adding border-1 border-blue-500 rounded-[60px] w-[75%] h-[450px] flex items-center justify-center relative  ">
      <Adding_steps />
    </div>
  )
}
