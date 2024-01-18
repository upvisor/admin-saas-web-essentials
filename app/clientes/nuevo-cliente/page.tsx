"use client"
import { Address, Data, Tags } from '@/components/clients'
import { ShippingCost } from '@/components/product'
import { Spinner2 } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [clientTags, setClientTags] = useState([])
  const [newClientTag, setNewClientTag] = useState('')
  const [loadingClientTag, setLoadingClientTag] = useState(false)

  const router = useRouter()

  const initialEmail = ''

  const getClientTags = async () => {
    const tags = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setClientTags(tags.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const inputChange = (e: any) => {
    setClientData({...clientData, [e.target.name]: e.target.value})
  }

  const submitForm = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, clientData)
    setSubmitLoading(false)
    router.push('/clientes')
  }

  return (
    <>
      <Head>
        <title>Nuevo cliente</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                clientData.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed text-white text-sm rounded w-36 h-9'>Crear cliente</button>
                  : <button onClick={submitForm} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded-md w-36 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Crear cliente'}</button>
              }
              <Link className='pt-1.5 pb-1.5 my-auto text-sm rounded pl-4 pr-4' href='/clientes'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 w-full min-h-full overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/clientes' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto font-medium'>Nuevo cliente</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <Data inputChange={inputChange} clientData={clientData} />
              <Address setClientData={setClientData} inputChange={inputChange} clientData={clientData} />
            </div>
            <div className='flex gap-4 flex-col w-1/3'>
              <Tags clientTags={clientTags} clientData={clientData} setClientData={setClientData} setLoadingClientTag={setLoadingClientTag} setNewClientTag={setNewClientTag} newClientTag={newClientTag} getClientTags={getClientTags} loadingClientTag={loadingClientTag} />
            </div>
          </form>
        </div>
    </>
  )
}