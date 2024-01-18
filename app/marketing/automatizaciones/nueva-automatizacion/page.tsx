"use client"
import { Spinner2 } from '@/components/ui'
import { IAutomatization, IClientTag, IEmailAutomatization, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

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

  const editEmail = (email: IEmailAutomatization, index: any, e: any) => {
    e.preventDefault()
    setTempEmail({ affair: email.affair, buttonText: email.buttonText, index: index, paragraph: email.paragraph, title: email.title, url: email.url })
  }

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
            <input onChange={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization.name} type='text' placeholder='Nombre' className='font-light p-1.5 rounded border text-sm w-96 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div className='flex gap-2 w-fit'>
            <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white m-auto text-sm rounded w-48 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Crear automatización'}</button>
            <Link className='h-8 flex m-auto text-sm rounded pl-4 pr-4' href='/marketing/automatizaciones'><p className='m-auto'>Descartar</p></Link>
          </div>
        </div>
      </div>
      <div className='overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
        <div className='p-6 w-full flex flex-col gap-4 bg-[#f6f6f7] mb-16 dark:bg-neutral-900'>
          <div className='w-full max-w-1280 m-auto'>
            <h1 className='text-xl font-medium'>Nueva automatización</h1>
          </div>
          <div className='w-full flex max-w-1280 m-auto'>
            <div className='m-auto flex gap-8'>
              <div className='flex flex-col mb-4 h-fit'>
                <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                  <p>Selecciona el segmento de usuarios para la automatización</p>
                  <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setAutomatization({ ...automatization, address: e.target.value })} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                    <option>Todos los suscriptores</option>
                    {
                      clientTags.length
                        ? clientTags.map(clientTag => (
                          <option key={clientTag.tag}>{clientTag.tag}</option>
                        ))
                        : ''
                    }
                  </select>
                </div>
                {
                  automatization.automatization.map((email, index) => (
                    <>
                      <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
                      <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                        <p>Tiempo de espera</p>
                        <div className='flex gap-2'>
                          <input onChange={(e: any) => {
                            const data = automatization.automatization
                            data[index].number = e.target.value
                            setAutomatization({ ...automatization, automatization: data })
                          }} value={automatization.automatization[index].number} type='text' placeholder='Tiempo' className='p-1.5 rounded border text-sm w-44 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          <select onChange={(e: any) => {
                            const data = automatization.automatization
                            data[index].time = e.target.value
                            setAutomatization({ ...automatization, automatization: data })
                          }} value={automatization.automatization[index].time} className='p-1.5 rounded border text-sm focus:outline-none w-44 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                            <option>Días</option>
                            <option>Horas</option>
                            <option>Minutos</option>
                          </select>
                        </div>
                      </div>
                      <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
                      <div key={email.affair} className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                        <p>Enviar correo</p>
                        <p className='text-sm'>Asunto: {email.affair}</p>
                        <button onClick={(e: any) => editEmail(email, index, e)} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-36 h-8 hover:bg-transparent hover:text-main'>Editar Correo</button>
                      </div>
                    </>
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
                    <div className='flex flex-col gap-6'>
                      <div className='w-[600px] p-4 flex flex-col gap-4 bg-white rounded-md shadow-md dark:bg-neutral-800'>
                        <h2 className='font-medium text-lg'>Configuración correo</h2>
                        <div className='flex flex-col gap-2'>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Asunto:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, affair: e.target.value })} value={tempEmail.affair} type='text' placeholder='Asunto' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Titulo:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, title: e.target.value })} value={tempEmail.title} type='text' placeholder='Titulo' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Parrafo:</p>
                            <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTempEmail({ ...tempEmail, paragraph: e.target.value })} value={tempEmail.paragraph} placeholder='Parrafo' className='h-16 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Texto boton:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, buttonText: e.target.value })} value={tempEmail.buttonText} type='text' placeholder='Boton' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Url:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, url: e.target.value })} value={tempEmail.url} type='text' placeholder='Url' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const data = automatization.automatization
                            data[tempEmail.index] = { ...data[tempEmail.index], affair: tempEmail.affair, buttonText: tempEmail.buttonText, paragraph: tempEmail.paragraph, title: tempEmail.title, url: tempEmail.url }
                            setAutomatization({ ...automatization, automatization: data })
                            setTempEmail({
                              affair: '',
                              buttonText: '',
                              paragraph: '',
                              title: '',
                              url: '',
                              index: 0
                            })
                          }} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-32 mt-2 h-8 hover:bg-transparent hover:text-main'>Guardar</button>
                        </div>
                      </div>
                      <div className='flex flex-col h-fit gap-4 p-4 bg-white w-[600px] dark:bg-neutral-800'>
                        <img className='w-40 mx-auto' src='https://res.cloudinary.com/blasspod/image/upload/v1692831635/blaspod/swiq7waalipkcq2dsucq.png' />
                        <h1 className='text-center mx-auto text-3xl font-medium'>{tempEmail.title}</h1>
                        <p className='text-center mx-auto'>{tempEmail.paragraph}</p>
                        {
                          tempEmail.buttonText !== ''
                            ? <Link className='py-2 px-7 bg-main rounded w-fit m-auto text-white' href={tempEmail.url}>{tempEmail.buttonText}</Link>
                            : ''
                        }
                        <div className='border-t pt-6 px-6 flex gap-4 justify-between dark:border-neutral-700'>
                          {
                            storeData
                              ? (
                                <>
                                  <div className='flex flex-col gap-2'>
                                    <p className='text-sm'>{storeData.name}</p>
                                    <p className='text-sm'>{storeData.email}</p>
                                    <p className='text-sm'>{storeData.phone}</p>
                                  </div>
                                  <div className='flex flex-col gap-2'>
                                    <p className='text-sm text-right'>{storeData.address}</p>
                                    <p className='text-sm text-right'>{storeData.city}, {storeData.region}</p>
                                  </div>
                                </>
                              )
                              : ''
                          }
                        </div>
                      </div>
                    </div>
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