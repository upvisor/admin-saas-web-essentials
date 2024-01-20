"use client"
import { Config, Segment, Step } from '@/components/automatizations'
import { Spinner2 } from '@/components/ui'
import { IAutomatization, IClientTag, IEmailAutomatization, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [automatization, setAutomatization] = useState<IAutomatization>({
    address: 'Todos los suscriptores',
    name: '',
    automatization: [{
      affair: '',
      title: 'Te damos la bienvenida a nuestra tienda',
      paragraph: '¡Hola ${name}! Nos hace muy felices tenerte con nosotros, aquí te dejamos el código de descuento que te prometimos',
      buttonText: 'Visitar tienda',
      url: '',
      number: 0,
      time: 'Días'
    }]
  })
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [loading, setLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState({
    affair: '',
    buttonText: '',
    paragraph: '',
    title: '',
    url: '',
    index: 0
  })
  const [storeData, setStoreData] = useState<IStoreData>()

  const router = useRouter()

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    if (response.data) {
      setClientTags(response.data)
    }
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data[0])
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/automatization`, { address: automatization.address, name: automatization.name, date: new Date(), automatization: automatization.automatization })
    router.push('/marketing/automatizaciones')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nueva automatización</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 250px)' }}>
        <div className='flex m-auto w-full justify-between'>
          <div className='flex gap-4'>
            <p className='my-auto'>Nombre de la automatización:</p>
            <input onChange={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization.name} type='text' placeholder='Nombre' className='p-1.5 rounded border text-sm w-96 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div className='flex gap-2 w-fit'>
            <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white m-auto text-sm rounded w-48 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Crear automatización'}</button>
            <Link className='h-8 flex m-auto text-sm rounded pl-4 pr-4' href='/marketing/automatizaciones'><p className='m-auto'>Descartar</p></Link>
          </div>
        </div>
      </div>
      <div className='overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
        <div className='p-6 w-full flex flex-col gap-4 bg-[#f6f6f7] mb-16 dark:bg-neutral-900'>
          <div className='flex gap-3 mb-4 max-w-1280'>
            <Link href='/marketing/automatizaciones' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl my-auto font-medium'>Nueva automatización</h1>
          </div>
          <div className='w-full flex max-w-1280 m-auto'>
            <div className='m-auto flex gap-8'>
              <div className='flex flex-col mb-4 h-fit'>
                <Segment setAutomatization={setAutomatization} automatization={automatization} clientTags={clientTags} />
                {
                  automatization.automatization.map((email, index) => (
                    <Step email={email} index={index} setAutomatization={setAutomatization} automatization={automatization} setTempEmail={setTempEmail} />
                  ))
                }
                <button onClick={(e: any) => {
                  e.preventDefault()
                  setAutomatization({ ...automatization, automatization: automatization.automatization.concat({
                    affair: '',
                    title: 'Te damos la bienvenida a nuestra tienda',
                    paragraph: '¡Hola ${name}! Nos hace muy felices tenerte con nosotros, aquí te dejamos el código de descuento que te prometimos',
                    buttonText: 'Visitar tienda',
                    url: '',
                    number: 0,
                    time: 'Días'
                  }) })
                }} className='bg-main mt-6 border border-main transition-colors duration-200 text-white text-sm rounded w-36 m-auto h-8 hover:bg-transparent hover:text-main'>Agregar paso</button>
              </div>
              {
                (tempEmail.buttonText !== '' || tempEmail.paragraph !== '' || tempEmail.title !== '')
                  ? (
                    <Config setTempEmail={setTempEmail} automatization={automatization} tempEmail={tempEmail} setAutomatization={setAutomatization} storeData={storeData} />
                  )
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}