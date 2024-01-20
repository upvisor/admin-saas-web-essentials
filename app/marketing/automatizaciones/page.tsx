"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { IAutomatization } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [automatizations, setAutomatizations] = useState<IAutomatization[]>([])
  const [automatizationSelect, setAutomatizationSelect] = useState({ _id: '', automatization: '' })
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingDelete, setLoadingDelete] = useState(false)

  const router = useRouter()

  const getAutomatizations = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/automatizations`)
    setAutomatizations(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getAutomatizations()
  }, [])

  const deleteAutomatization= async (e: any) => {
    e.preventDefault()
    setLoadingDelete(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/automatization/${automatizationSelect._id}`)
    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
    getAutomatizations()
    setTimeout(() => {
      setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
    }, 200)
    setLoadingDelete(false)
  }

  return (
    <>
      <Head>
        <title>Automatizaciones</title>
      </Head>
      <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 right-0 fixed w-full z-50 flex -top-[49px] bg-black/20 dark:bg-black/40`} style={{ height: 'calc(100vh + 49px)' }}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar la campaña: <strong>{automatizationSelect.automatization}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteAutomatization} className='bg-red-600 h-9 w-36 rounded border border-red-600 text-white transition-colors duration-200 hover:bg-transparent hover:text-red-600'>{loadingDelete ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full min-h-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl font-medium'>Automatizaciones</h1>
            <Link href='/marketing/automatizaciones/nueva-automatizacion' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main'>Crear automatización</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='m-auto w-fit'>
                      <Spinner />
                    </div>
                  </div>
                )
                : automatizations.length
                  ? (
                    <div className='bg-white border shadow-md dark:bg-neutral-800 dark:border dark:border-neutral-700'>
                      <table className='w-full'>
                        <thead>
                          <tr>
                            <th className='p-2 text-left font-medium'>Nombre</th>
                            <th className='p-2 text-left font-medium'>Segmento</th>
                            <th className='p-2 text-left font-medium'>Pasos</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            automatizations.map(automatization => {
                              return (
                                <tr className='cursor-pointer transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={automatization.name}>
                                  <td className='p-2 border-t dark:border-neutral-700' onClick={() => router.push(`/marketing/automatizaciones/${automatization._id}`)}>{automatization.name}</td>
                                  <td className='p-2 border-t dark:border-neutral-700' onClick={() => router.push(`/marketing/automatizaciones/${automatization._id}`)}>{automatization.address}</td>
                                  <td className='p-2 border-t dark:border-neutral-700' onClick={() => router.push(`/marketing/automatizaciones/${automatization._id}`)}>{automatization.automatization.length}</td>
                                  <td className='p-2 border-t dark:border-neutral-700' onClick={(e: any) => {
                                    e.preventDefault()
                                    setAutomatizationSelect({ _id: automatization._id!, automatization: automatization.name })
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                    setTimeout(() => {
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                    }, 10)
                                  }}><AiOutlineClose /></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                  : <p>No hay automatizaciones creadas</p>
            }
          </div>
        </div>
    </>
  )
}