"use client"
import { Nav } from '@/components/configuration'
import { Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState({
    transbank: {
      active: false,
      commerceCode: '',
      apiKey: ''
    },
    mercadoPago: {
      active: false,
      accessToken: '',
      publicKey: ''
    }
  })

  const pathname = usePathname()
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment-gateway`, payment)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Pasarela de pago</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-40 h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <button onClick={() => router.refresh()} className='my-auto pt-1.5 pb-1.5 text-sm rounded pl-4 pr-4'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <Nav />
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Pasarela de pago</h2>
              <div className='flex flex-col gap-4'>
                <p>Selecciona los metodos de pago para tu tienda</p>
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setPayment({ ...payment, transbank: { ...payment.transbank, active: true } }) : setPayment({ ...payment, transbank: { ...payment.transbank, active: false } }) } />
                  <p>Transbank - WebPay Plus</p>
                </div>
                {
                  payment.transbank.active
                    ? (
                      <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                          <p>Codigo del comercio</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, transbank: { ...payment.transbank, commerceCode: e.target.value } }) } value={payment.transbank.commerceCode} placeholder='Codigo del comercio' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p>Api Key</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, transbank: { ...payment.transbank, apiKey: e.target.value } }) } value={payment.transbank.apiKey} placeholder='Api Key' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      </div>
                    )
                    : ''
                }
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, active: true } }) : setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, active: false } })} />
                  <p>MercadoPago</p>
                </div>
                {
                  payment.mercadoPago.active
                    ? (
                      <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                          <p>Token de acceso</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, accessToken: e.target.value } }) } value={payment.mercadoPago.accessToken} placeholder='Token de acceso' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p>Public key</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, publicKey: e.target.value } }) } value={payment.mercadoPago.publicKey} placeholder='Public key' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
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