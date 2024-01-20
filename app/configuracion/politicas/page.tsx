"use client"
import { Nav } from '@/components/configuration'
import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineLaptop, AiOutlineFileDone } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { TbWorldWww } from 'react-icons/tb'

export default function Page () {

  const [politics, setPolitics] = useState({
    terms: '',
    shipping: '',
    privacy: '',
    devolutions: ''
  })
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()

  const router = useRouter()

  const getPolitics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politics`)
    if (response.data) {
      setPolitics(response.data)
    }
  }

  useEffect(() => {
    getPolitics()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolitics({ ...politics, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/politics`, politics)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Politicas de la tienda</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-40 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <button onClick={() => router.refresh()} className='my-auto pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <Nav />
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Politicas de la tienda</h2>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Terminos y condiciones</h3>
                <textarea onChange={handleChange} name='terms' value={politics.terms} placeholder='Terminos y Condiciones' className='w-full p-1.5 border rounded text-sm h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Politicas de envíos</h3>
                <textarea onChange={handleChange} name='shipping' value={politics.shipping} placeholder='Politicas de envíos' className='w-full p-1.5 border rounded text-sm h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Politicas de privacidad</h3>
                <textarea onChange={handleChange} name='privacy' value={politics.privacy} placeholder='Politicas de privacidad' className='w-full p-1.5 border rounded text-sm h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Politicas de devoluciones y reembolsos</h3>
                <textarea onChange={handleChange} name='devolutions' value={politics.devolutions} placeholder='Politicas de devoluciones' className='w-full p-1.5 border rounded text-sm h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}