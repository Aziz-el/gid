"use client"
import { useSearchParams } from "next/navigation"
export default function Search({param:string=""}) {
    let searchParams = useSearchParams()
  return (
    <div className="search h-[38px] w-[165px]  relative text-[14px]">
        <input type="search" name="" id="" className="bg-white rounded-[24px] w-full h-full  underline placeholder:text-[#212121] placeholder:mb-1 outline-0 pl-11" placeholder="Search"/>
        <img src="/search.svg" alt="" className="absolute left-[22px] top-[50%] transform -translate-y-1/2" />

    </div>
  )
}
