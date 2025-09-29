"use client"
import React, { useMemo, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css"
import Button from "@/shared/UI/Button"
import { useAuthStore } from "@/Hooks/AuthStore"
import { useModals } from "@/Hooks/MainStore"

type Step1 = {
  name: string
  fullName: string
  email: string
  phone: string
}

type Step2 = {
  city: string
  address: string
  password: string
  confirm: string
}

const required = (v: string) => v.trim().length > 0
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const minPassword = (v: string) => v.length >= 6

export const SignupSteps: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const registerCompany = useAuthStore((s) => s.registerCompany)
  let {close} = useModals()
  const [step1, setStep1] = useState<Step1>({
    name: "",
    fullName: "",
    email: "",
    phone: "",
  })
  const [step2, setStep2] = useState<Step2>({
    city: "Osh",
    address: "",
    password: "",
    confirm: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const step1Valid = useMemo(() => {
    return (
      required(step1.name) &&
      required(step1.fullName) &&
      isEmail(step1.email) &&
      required(step1.phone)
    )
  }, [step1])

  const step2Valid = useMemo(() => {
    return (
      required(step2.address) &&
      minPassword(step2.password) &&
      step2.password === step2.confirm
    )
  }, [step2])

  const next = () => {
    if (step1Valid) swiperRef.current?.slideNext()
  }

  const submit = async () => {
    if (!step2Valid) return
    setSubmitting(true)
    try {
      const payload = {
        name: step1.name,
        fullName: step1.fullName,
        email: step1.email,
        phone: step1.phone,
        city: step2.city,
        address: step2.address,
        password: step2.password,
      }
      await registerCompany(payload)
      alert("Company registered successfully!")
      close("sign_in_company")
    } catch (err) {
      alert("Registration failed")
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase =
    "w-full rounded-3xl bg-white border border-blue-500 px-3 py-3 text-black placeholder:text-neutral-500 focus:outline-none"

  const errorText = "mt-1 text-xs text-red-400"

  return (
      <div className="w-full">

        <Swiper
          modules={[Navigation]}
          allowTouchMove={false}
          onSwiper={(s) => (swiperRef.current = s)}
          className="w-full"
        >
        <SwiperSlide>
          <div className="space-y-5">
            <div className="progressBar flex justify-center items-center">
                <img src="/BaseUser.svg" alt="" />
                 <hr className='w-[250px] text-gray-400'/> 
                <img src="/BaseAgency.svg" alt="" />
              </div>
            <div>
              <input
                className={inputBase}
                value={step1.name}
                onChange={(e) => setStep1({ ...step1, name: e.target.value })}
                placeholder="Name"
              />
              {!required(step1.name) && step1.name !== "" && (
                <p className={errorText}>Required</p>
              )}
            </div>

            <div>
              <input
                className={inputBase}
                value={step1.fullName}
                onChange={(e) =>
                  setStep1({ ...step1, fullName: e.target.value })
                }
                placeholder="Full Name*"
              />
              {!required(step1.fullName) && step1.fullName !== "" && (
                <p className={errorText}>Required</p>
              )}
            </div>

            <div>
              <input
                className={inputBase}
                value={step1.email}
                onChange={(e) => setStep1({ ...step1, email: e.target.value })}
                placeholder="Email*"
                inputMode="email"
              />
              {step1.email !== "" && !isEmail(step1.email) && (
                <p className={errorText}>Invalid email</p>
              )}
            </div>

            <div>
              <input
                className={inputBase}
                value={step1.phone}
                onChange={(e) => setStep1({ ...step1, phone: e.target.value })}
                placeholder="Phone*"
                inputMode="tel"
              />
              {!required(step1.phone) && step1.phone !== "" && (
                <p className={errorText}>Required</p>
              )}
            </div>

            <Button
              Effectclass="w-full"
              type="fifth"
              title="Continue"
              onClick={next}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="space-y-5">
             <div className="progressBar flex justify-center items-center">
                <img src="/UserDone.svg" alt="" />
                 <hr className='w-[250px] text-gray-400'/> 
                <img src="/DoneAgency.svg" alt="" />
              </div>
            <div>
              <select
                className={inputBase}
                value={step2.city}
                onChange={(e) => setStep2({ ...step2, city: e.target.value })}
              >
                <option value="Osh">Osh</option>
                <option value="Bishkek">Bishkek</option>
                <option value="Karakol">Karakol</option>
              </select>
            </div>

            <div>
              <input
                className={inputBase}
                value={step2.address}
                onChange={(e) =>
                  setStep2({ ...step2, address: e.target.value })
                }
                placeholder="Street, building, apt"
              />
              {!required(step2.address) && step2.address !== "" && (
                <p className={errorText}>Required</p>
              )}
            </div>

            <div>
              <input
                type="password"
                className={inputBase}
                value={step2.password}
                onChange={(e) =>
                  setStep2({ ...step2, password: e.target.value })
                }
                placeholder="••••••"
              />
              {step2.password !== "" && !minPassword(step2.password) && (
                <p className={errorText}>At least 6 characters</p>
              )}
            </div>

            <div>
              <input
                type="password"
                className={inputBase}
                value={step2.confirm}
                onChange={(e) =>
                  setStep2({ ...step2, confirm: e.target.value })
                }
                placeholder="••••••"
              />
              {step2.confirm !== "" && step2.password !== step2.confirm && (
                <p className={errorText}>Passwords do not match</p>
              )}
            </div>

            <Button
              Effectclass="w-full"
              type="primary"
              title={submitting ? "Submitting..." : "Submit for review"}
              onClick={submit}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
