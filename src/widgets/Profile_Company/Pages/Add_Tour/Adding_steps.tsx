"use client"

import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Navigation } from "swiper/modules"
import axios from "axios"
import "swiper/css"
import Add_Middle_Point from "@/features/Add_Middle_Point/Add_Middle_Point"
import { useModals } from "@/Hooks/MainStore"
import { Tour, useTourStore } from "@/Hooks/ToursStore"
import { useAuthStore } from "@/Hooks/AuthStore"
import Edit_Middle_Point from "@/features/Edit_Middle_Point/Edit_Middle_Point"


type Point = {
  start_time: string
  location: string
  addres: string
  name: string
}

type Step1 = {
  img: string
  name: string
  price: number
  description: string
}

export type Step2 = {
  start_date: string
  people_count: number
  location:{
    start_point?:{
      start_time:string,
      location:string,
      addres:string,
      name:string,
    }
    middle_points?:{
      start_time:string,
      location:string,
      addres:string,
      name:string,
    }[],
    end_point?:{
      start_time:string,
      location:string,
      addres:string,
      name:string,
    }
  },
}

type Step3 = {
  vehicle_type: string
  book_count: number
  tags: string[]
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, ...props }: InputProps) => (
  <input
    min={0}
    {...props}
    className={`input-border-1 border border-blue-500 rounded-3xl text-black w-[100%] h-[40px] pl-2 outline-none ${className || ""}`}
  />
)

export default function Adding_steps() {
  let [pointState,setPoint] = useState<Point>()
  let {close} = useModals()
  let {companyData} = useAuthStore()
  let {addTour} = useTourStore()
  const swiperRef = useRef<SwiperType | null>(null)
  let {open} = useModals()
  const [step1, setStep1] = useState<Step1>({
    img: "/ProfileImageEdit.svg",
    name: "",
    price: 0,
    description: "",
  })
  const [step2, setStep2] = useState<Step2>({
    start_date: "",
    people_count: 0,
    location: {
      start_point: {
        start_time:"",
        location:"",
        addres:"",
        name:"",
      },
      middle_points: [] as { start_time:string; location:string; addres:string; name:string }[],
      end_point: {
        start_time:"",
        location:"",
        addres:"",
        name:"",
      },
    },
  })
  const [step3, setStep3] = useState<Step3>({
    vehicle_type: "",
    book_count: 0,
    tags: [],
  })

  const [tagInput, setTagInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState<string>(step1.img)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)
    try {
      const res = await axios.post("/api/upload-image", formData)
      const imageUrl = res.data.data.link
      setImage(imageUrl)
      setStep1({ ...step1, img: imageUrl })
    } catch {
      alert("Ошибка загрузки изображения")
    } finally {
      setUploading(false)
    }
  }

  const addTag = () => {
    if (!tagInput.trim()) return
    setStep3(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
    setTagInput("")
  }

  const removeTag = (index: number) => {
    setStep3(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))
  }

  const validateStep1 = () => step1.name.trim() !== "" && step1.price > 0
  const validateStep2 = () => step2.start_date !== "" && step2.people_count > 0
  const validateStep3 = () => step3.vehicle_type.trim() !== "" && step3.book_count >= 0

  const next = () => {
    const currentIndex = swiperRef.current?.activeIndex
    if (currentIndex === 0 && !validateStep1()) return
    if (currentIndex === 1 && !validateStep2()) return
    swiperRef.current?.slideNext()
  }

  const prev = () => swiperRef.current?.slidePrev()

  const handleSubmit = () => {
    if (!validateStep1() || !validateStep2() || !validateStep3()) return
    const payload = { ...step1, ...step2, ...step3, agency_id: companyData?.id, rating: 0,discount:0 }
    addTour(payload as Tour)
    close("profile_company")
  }

  const handleNumberInput = (value: string) => {
    const num = parseInt(value)
    if (!isNaN(num)) return num
    return 0
  }
 useEffect(()=>{
  console.log(step2);
  
 },[step2])
  return (
    <div className="w-full">
      <Swiper modules={[Navigation]} allowTouchMove={false} onSwiper={(s) => (swiperRef.current = s)} className="w-full">
        <SwiperSlide>
          <div className="flex flex-col gap-4 p-4">
            <div className="head flex gap-4">
              <div className="relative w-[200px] h-[360px] bg-gray-100 rounded-2xl flex items-center justify-center">
                <img src={image} alt="" className="rounded-2xl object-cover" />
                <label className="absolute bottom-2 right-2 cursor-pointer">
                  <img src="/Edit.svg" alt="" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
                {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/70">Загрузка...</div>}
              </div>
              <div className="btns flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="inp w-[270px]">
                    <h1>Название тура*</h1>
                    <Input placeholder="Название тура" value={step1.name} onChange={(e) => setStep1({ ...step1, name: e.target.value })} />
                  </div>
                  <div className="inp">
                    <h1>Стоимость за место*</h1>
                    <Input
                      type="text"
                      placeholder="Цена"
                      value={step1.price > 10 ? step1.price.toString() : step1.price}
                      onChange={(e) => setStep1({ ...step1, price: handleNumberInput(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="inp">
                  <h1>Описание тура</h1>
                  <textarea
                    placeholder="Описание"
                    value={step1.description}
                    onChange={(e) => setStep1({ ...step1, description: e.target.value })}
                    className="input-border-1 border border-blue-500 rounded-3xl text-black w-full min-h-[100px] p-2 outline-none"
                  />
                </div>
              </div>
              <button onClick={next} className="bg-blue-500 text-white p-2 rounded-3xl w-[200px] h-[40px] absolute bottom-5 right-5">Далее</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex gap-4 p-4">
            <div className="relative w-[250px] h-[360px] bg-gray-100 rounded-2xl flex items-center justify-center">
              <img src={image} alt="" className="rounded-2xl object-cover" />
              <label className="absolute bottom-2 right-2 cursor-pointer">
                <img src="/Edit.svg" alt="" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
              {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/70">Загрузка...</div>}
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="data flex gap-5">
                <div className="inp border-r max-h-[80px] pr-4 border-gray-400">
                  <h1>Дата начала</h1>
                  <Input
                    type="datetime-local"
                    value={step2.start_date}
                    onChange={(e) => setStep2({ ...step2, start_date: e.target.value })}
                  />
                </div>
                <div className="inp">
                  <h1>Количество людей</h1>
                  <Input
                    type="text"
                    placeholder="Количество людей"
                    value={step2.people_count > 10 ? step2.people_count.toString() : step2.people_count}
                    onChange={(e) => setStep2({ ...step2, people_count: handleNumberInput(e.target.value) })}
                  />
                </div>
              </div>
              <div className="way flex w-full border-t border-gray-500 text-white font-[300] gap-4 pt-6">
                <div className="way flex w-full gap-1 pt-1 flex-wrap">
                  <div
                    className="startPoint p-3 px-5 rounded-4xl bg-green-600 max-h-[50px]"
                    onClick={() => open("profile_company_editing_middle_point", 0, (updatedPoint: any) =>
                      setStep2(prev => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          start_point: updatedPoint,
                        }
                      }))
                    )}
                  >
                    Место старта
                  </div>
                  {step2.location.middle_points?.map((point, index) => (
                    <div key={index} className="middlePoint p-3 px-5 rounded-4xl bg-blue-300 max-h-[50px]">{point.name || "Без названия"}</div>
                  ))}
                  <div className="add rounded-4xl flex items-center text-[25px] px-4.5 border-1 border-blue-500 max-h-[50px] text-blue-600 cursor-pointer" onClick={() => open("profile_company_adding_middle_point")}>+</div>
                  <div
                    className="endPoint p-3 px-5 rounded-4xl bg-red-600 max-h-[50px]"
                    onClick={() => open("profile_company_editing_middle_point", 0, (updatedPoint: any) =>
                      setStep2(prev => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          end_point: updatedPoint,
                        }
                      }))
                    )}
                  >
                    Место завершения
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="bg-gray-400 text-white p-2 rounded-3xl w-[200px] absolute bottom-5 right-[230px]">Назад</button>
              <button onClick={next} className="bg-blue-500 text-white p-2 rounded-3xl w-[200px] absolute bottom-5 right-5">Далее</button>
            </div>
            <Add_Middle_Point add_middle_point={setStep2}/>
            <Edit_Middle_Point />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-wrap gap-4 flex-col">
              <div className="start flex justify-around items-center">
                <div className="inp">
                  <h1>Тип траспорта</h1>
                  <Input placeholder="Тип траспорта" value={step3.vehicle_type} onChange={(e) => setStep3({ ...step3, vehicle_type: e.target.value })} />
                </div>
                <div className="inp border-l border-gray-500 pl-10">
                  <h1>Мест занято</h1>
                  <Input
                    type="text"
                    placeholder="Мест занято"
                    value={step3.book_count > 10 ? step3.book_count.toString() : step3.book_count}
                    onChange={(e) => setStep3({ ...step3, book_count: handleNumberInput(e.target.value) })}
                  />
                </div>
              </div>
              <div className="tags flex flex-col gap-2 mt-4">
                <h1>Теги</h1>
                <div className="flex gap-2 mt-2">
                  <Input style={{maxWidth:"200px",paddingLeft:"40px"}} placeholder="Новый тег" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                  <button onClick={addTag} className="bg-green-500 text-white px-4 rounded-3xl">Добавить</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {step3.tags.map((tag, index) => (
                    <div key={index} className="bg-blue-300 text-black px-3 py-1 rounded-full flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(index)} className="text-red-600 font-bold">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={prev} className="bg-gray-400 text-white p-2 rounded-3xl w-[200px]">Назад</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded-3xl w-[200px]">Сохранить</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
