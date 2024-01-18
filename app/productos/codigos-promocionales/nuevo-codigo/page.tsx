"use client"
import { Code, Promotion, State } from '@/components/promotional-codes'
import { Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [codeInfo, setCodeInfo] = useState({
    promotionalCode: '',
    discountType: 'Porcentaje',
    value: '',
    minimumAmount: '',
    state: false
  })
  const [minimunPrice, setMinimunPrice] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  let promotionalCode = ''

  const inputChange = (e: any) => {
    setCodeInfo({...codeInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code`, codeInfo)
    router.push('/productos/codigos-promocionales')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nuevo codigo promocional</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                codeInfo.promotionalCode === promotionalCode
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed w-36 h-8 text-white text-sm rounded-md'>Crear codigo</button>
                  : <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-36 h-8'>{submitLoading ? <Spinner2 /> : 'Crear codigo'}</button>
              }
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 w-full min-h-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/productos/codigos-promocionales' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl font-medium mt-auto mb-auto'>Nuevo codigo promocional</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <Code codeInfo={codeInfo} inputChange={inputChange} />
              <Promotion codeInfo={codeInfo} inputChange={inputChange} minimunPrice={minimunPrice} setMinimunPrice={setMinimunPrice} />
            </div>
            <div className='w-1/3 flex flex-col gap-4'>
              <State codeInfo={codeInfo} setCodeInfo={setCodeInfo} />
            </div>
          </form>
        </div>
    </>
  )
}