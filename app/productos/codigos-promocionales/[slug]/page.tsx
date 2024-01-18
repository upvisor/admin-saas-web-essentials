"use client"
import { Code, Promotion, State } from '@/components/promotional-codes'
import { Spinner, Spinner2 } from '@/components/ui'
import { IPromotionalCode } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [codeInfo, setCodeInfo] = useState<Partial<IPromotionalCode>>()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [minimunPrice, setMinimunPrice] = useState(false)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getPromotionalCode = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${params.slug}`)
    setCodeInfo(data)
    if (data.minimumAmount !== 0) {
      setMinimunPrice(true)
    }
  }

  useEffect(() => {
    getPromotionalCode()
  }, [])

  const inputChange = (e: any) => {
    setCodeInfo({...codeInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${params.slug}`, codeInfo)
    router.push('/productos/codigos-promocionales')
    setSubmitLoading(false)
  }

  const deleteCode = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${codeInfo?._id}`)
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{codeInfo?.promotionalCode}</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full left-0 top-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 border border-white rounded-md shadow-md bg-white m-auto dark:bg-neutral-800 dark:border-neutral-700'>
            <p>Estas seguro que deseas eliminar el codigo <strong>{codeInfo?.promotionalCode}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCode} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-32 rounded text-white hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main text-white text-sm rounded transition-colors duration-200 w-36 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Modificar codigo'}</button>
              <Link className='my-auto pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4' href='/productos/codigos-promocionales'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 65px)' }}>
          {
            codeInfo
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos/codigos-promocionales' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl font-medium mt-auto mb-auto'>{codeInfo.promotionalCode}</h1>
                  </div>
                  <form className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <Code codeInfo={codeInfo} inputChange={inputChange} />
                      <Promotion codeInfo={codeInfo} inputChange={inputChange} minimunPrice={minimunPrice} setMinimunPrice={setMinimunPrice} />
                    </div>
                    <div className='w-1/3 flex flex-col gap-4'>
                      <State codeInfo={codeInfo} setCodeInfo={setCodeInfo} />
                      <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Eliminar cupon</h2>
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }} className='bg-red-600 border border-red-600 transition-colors duration-200 text-white py-1.5 w-24 rounded text-sm hover:bg-transparent hover:text-red-600'>Eliminar</button>
                      </div>
                    </div>
                  </form>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
    </>
  )
}