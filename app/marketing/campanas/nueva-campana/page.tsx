"use client"
import { Config, Email, Segment } from '@/components/campaigns'
import { Spinner2 } from '@/components/ui'
import { IClientTag, IEmail, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [email, setEmail] = useState<IEmail>({
    address: 'Todos los suscriptores',
    affair: '',
    title: 'Te damos la bienvenida a nuestra tienda',
    paragraph: '¡Hola ${name}! Nos hace muy felices tenerte con nosotros, aquí te dejamos el código de descuento que te prometimos',
    buttonText: 'Visitar tienda',
    url: '',
    date: undefined
  })
  const [date, setDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])

  const router = useRouter()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    if (response.data) {
      setClientTags(response.data)
    }
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const submit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/new-campaign`, email)
    router.push('/marketing/campanas')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nueva campaña</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
        <div className='flex m-auto w-full'>
          <div className='flex gap-2 ml-auto w-fit'>
            <button onClick={submit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-36 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Crear campaña'}</button>
            <Link className='pt-1.5 pb-1.5 my-auto text-sm rounded pl-4 pr-4' href='/marketing/campanas'>Descartar</Link>
          </div>
        </div>
      </div>
      <div className='bg-[#f6f6f7] overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
        <div className='p-6 flex flex-col gap-4 w-full bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex gap-3 mb-4 max-w-1280'>
            <Link href='/marketing/campanas' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl font-medium my-auto'>Nueva campaña</h1>
          </div>
          <div className='flex flex-col gap-4 w-full max-w-1280 m-auto'>
            <Segment setEmail={setEmail} email={email} clientTags={clientTags} />
            <div className='w-full flex'>
              <div className='flex flex-wrap gap-6 m-auto'>
                <Email email={email} storeData={storeData} />
                <Config setEmail={setEmail} email={email} setDate={setDate} date={date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}