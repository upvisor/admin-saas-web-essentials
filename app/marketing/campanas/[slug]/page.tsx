"use client"
import { Email, Segment, Config } from '@/components/campaigns'
import { Spinner, Spinner2 } from '@/components/ui'
import { IClientTag, IEmail, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [email, setEmail] = useState<IEmail>()
  const [date, setDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])

  const router = useRouter()

  const getCampaign = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${params.slug}`)
    setEmail(response.data)
  }

  useEffect(() => {
    getCampaign()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data?.length) {
      setStoreData(response.data[0])
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setClientTags(response.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const submit = async () => {
    
  }

  return (
    <>
      <Head>
        <title>Campaña: {email?._id}</title>
      </Head>
        {
          email
            ? (
              <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
                <div className='flex m-auto w-full'>
                  <div className='flex gap-2 ml-auto w-fit'>
                    <button onClick={submit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-36 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Editar campaña'}</button>
                    <Link className='pt-1.5 pb-1.5 my-auto text-sm rounded pl-4 pr-4' href='/marketing/campanas'>Descartar</Link>
                  </div>
                </div>
              </div>
            )
            : (
              <div className='fixed flex bg-[#f6f6f7] bottom-0 right-0 p-4 dark:bg-neutral-900 h-full' style={{ width: 'calc(100% - 256px)' }}>

              </div>
            )
        }
        <div className='p-6 mb-16 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 65px)' }}>
          {
            email
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/marketing/campanas' className='border rounded p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl font-medium mt-auto mb-auto'>Campaña: {email?._id}</h1>
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