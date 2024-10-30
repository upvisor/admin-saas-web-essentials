"use client"
import { ButtonSubmit, Calendar } from "@/components/ui"
import { DateData } from "@/interfaces"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"

export default function AvaliableCallsPage () {

  const [availableDates, setAvailableDates] = useState<DateData[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/calendar`, { dates: availableDates })
    setSubmitLoading(false)
  }

  return (
    <>
      <main className="flex flex-col gap-6 p-6 h-full bg-bg dark:bg-neutral-900">
        <div className="flex flex-col gap-6 w-full mx-auto max-w-[1280px]">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4">
              <Link href='/llamadas' className='border rounded-xl p-2 h-fit my-auto bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
              <h1 className='text-2xl font-medium my-auto'>Horario llamadas</h1>
            </div>
            <Calendar availableDates={availableDates} setAvailableDates={setAvailableDates} />
          </div>
        </div>
      </main>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 250px)' }}>
        <div className='flex m-auto w-full max-w-[1280px]'>
          <div className='flex gap-2 ml-auto w-fit'>
            <ButtonSubmit action={handleSubmit} color="main" submitLoading={submitLoading} textButton="Modificar disponibilidad" config="w-52" />
            <Link className='pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4 my-auto' href='/llamadas'>Descartar</Link>
          </div>
        </div>
      </div>
    </>
  )
}