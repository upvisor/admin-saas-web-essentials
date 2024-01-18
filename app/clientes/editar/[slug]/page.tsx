"use client"
import { Address, Data, Tags } from '@/components/clients'
import { ShippingCost } from '@/components/product'
import { LeftMenu, Spinner2 } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [clientTags, setClientTags] = useState([])
  const [newClientTag, setNewClientTag] = useState('')
  const [loadingClientTag, setLoadingClientTag] = useState(false)

  const router = useRouter()

  const initialEmail = ''

  const getClientData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.slug}`)
    setClientData(response.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

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
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.slug}`, clientData)
    setSubmitLoading(false)
    router.push('/clientes')
  }

  return (
    <>
      <Head>
        <title>Editar cliente</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                clientData.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear cliente</button>
                  : <button onClick={submitForm} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-36 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Editar cliente'}</button>
              }
              <Link className='pt-1.5 pb-1.5 text-sm rounded my-auto pl-4 pr-4' href='/clientes'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='bg-[#f6f6f7] overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='p-6 flex flex-col gap-4 dark:bg-neutral-900'>
            <div className='flex gap-3 w-full m-auto'>
              <Link href='/clientes' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
              <h1 className='text-xl mt-auto mb-auto font-medium'>Editar cliente</h1>
            </div>
            <form className='flex gap-4 w-full m-auto'>
              <div className='flex gap-4 flex-col w-2/3'>
                <Data inputChange={inputChange} clientData={clientData} />
                <Address setClientData={setClientData} inputChange={inputChange} clientData={clientData} />
              </div>
              <div className='flex gap-4 flex-col w-1/3'>
                <Tags clientTags={clientTags} clientData={clientData} setClientData={setClientData} setLoadingClientTag={setLoadingClientTag} setNewClientTag={setNewClientTag} newClientTag={newClientTag} getClientTags={getClientTags} loadingClientTag={loadingClientTag} />
              </div>
            </form>
          </div>
        </div>
    </>
  )
}