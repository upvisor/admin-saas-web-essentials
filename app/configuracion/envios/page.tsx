"use client"
import { Nav } from '@/components/configuration'
import { Spinner2 } from '@/components/ui'
import { IStoreData, Region } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [storeData, setStoreData] = useState<IStoreData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    city: '',
    logo: { public_id: '', url: '' },
    logoWhite: { public_id: '', url: '' }
  })
  const [regions, setRegions] = useState<Region[]>()
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()
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

  const requestRegions = async () => {
    const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setRegions(request.data.regions)
  }

  useEffect(() => {
    requestRegions()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, storeData)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Envíos</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-40 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <button onClick={() => router.refresh()} className='my-auto pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <Nav />
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg mt-3 pb-3 font-medium border-b dark:border-neutral-700'>Envíos</h2>
            </div>
          </div>
        </div>
    </>
  )
}