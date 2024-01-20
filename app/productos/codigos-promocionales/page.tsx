"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const router = useRouter()

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [codeSelect, setCodeSelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingCodes, setLoadingCodes] = useState(true)
  const [codes, setCodes] = useState([])

  const getCodes = async () => {
    setLoadingCodes(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code`)
    setCodes(res.data)
    setLoadingCodes(false)
  }

  useEffect(() => {
    getCodes()
  }, [])

  const deleteCode = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${codeSelect._id}`)
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Codigos Promocionales</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar el codigo <strong>{codeSelect.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCode} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-36 rounded-md text-white hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] min-h-full overflow-y-auto w-full dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl font-medium'>Codigos promocionales</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main' href='/productos/codigos-promocionales/nuevo-codigo'>Nuevo codigo</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loadingCodes
                ? (
                    <div className="flex w-full">
                      <div className="m-auto mt-16 mb-16">
                        <Spinner />
                      </div>
                    </div>
                  )
                : codes.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-medium'>Codigo promocional</th>
                          <th className='text-left p-2 font-medium'>Tipo de descuento</th>
                          <th className='text-left p-2 font-medium'>Valor del descuento</th>
                          <th className='text-left p-2 font-medium'>Precio minimo</th>
                          <th className='text-left p-2 font-medium'>Estado</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          codes.map((promotionalCode: any) => (
                            <tr className='border-b transition-colors duration-150 cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={promotionalCode._id}>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p>{promotionalCode.promotionalCode}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p>{promotionalCode.discountType}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p>{promotionalCode.value}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p>${NumberFormat(Number(promotionalCode.minimumAmount))}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/${promotionalCode.promotionalCode}`)}>
                                <p>
                                  {
                                    promotionalCode.state === true
                                      ? <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                      : <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Desactivado</p>
                                  }
                                </p>
                              </td>
                              <td className='p-2'>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                  setCodeSelect({ _id: promotionalCode._id!, name: promotionalCode.promotionalCode })
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : <p>No hay codigos promocionales</p>
            }
          </div>
        </div>
    </>
  )
}