"use client"
import { Nav } from '@/components/configuration'
import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineFileDone, AiOutlineLaptop } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { TbWorldWww } from 'react-icons/tb'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState('')

  const pathname = usePathname()

  const getDomain = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`)
    if (response.data) {
      setDomain(response.data.domain)
    }
  }

  useEffect(() => {
    getDomain()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/domain`, { domain: domain })
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Configuración</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-40 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <Link className='my-auto pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <Nav />
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Configuración del dominio</h2>
              <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='font-medium'>Cambio de dominio</h3>
                <p className='text-sm'>Este cambio tiene un tiempo de demora de maximo un día habil, se le enviara un email cuando el cambio se haya realizado</p>
                <div className='flex gap-2'>
                  <p className='text-sm my-auto'>Dominio</p>
                  <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setDomain(e.target.value)} value={domain} placeholder='Dominio' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}