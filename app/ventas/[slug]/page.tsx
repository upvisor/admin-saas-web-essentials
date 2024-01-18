"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ISell } from '../../../interfaces'
import { NumberFormat } from '@/utils'
import { offer } from '@/utils/QuantityOffer'

export default function Page ({ params }: { params: { slug: string } }) {

  const [sell, setSell] = useState<ISell>()
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingEditPay, setLoadingEditPay] = useState(false)
  const [shippingCode, setShippingCode] = useState('')

  const router = useRouter()

  const getSell = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells/${params.slug}`)
    setSell(response.data)
  }

  useEffect(() => {
    getSell()
  }, [])

  return (
    <>
      <Head>
        <title>Venta: {sell?._id}</title>
      </Head>
        <div className='p-6 bg-[#f6f6f7] overflow-y-auto w-full min-h-full dark:bg-neutral-900'>
          {
            sell
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/ventas' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl mt-auto mb-auto font-medium'>Venta id: {sell?._id}</h1>
                  </div>
                  <div className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-3/5'>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Productos</h2>
                        {
                          sell?.cart?.map(product => (
                            <div className='flex gap-2 justify-between mb-2' key={product._id}>
                              <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                  <img className='w-28' src={product.image} alt={product.name} />
                                </div>
                                <div className='mt-auto mb-auto'>
                                  <p className='text-sm font-medium'>{product.name}</p>
                                  <p className='text-sm'>Cantidad: {product.quantity}</p>
                                  {
                                    product.variation?.variation
                                      ? product.variation?.subVariation
                                        ? <p className='text-sm'>Variante: {product.variation.variation} / {product.variation.subVariation}</p>
                                        : <p className='text-sm'>Variante: {product.variation.variation}</p>
                                      : ''
                                  }
                                </div>
                              </div>
                              <div className='mt-auto mb-auto'>
                                <p className='text-sm'>${NumberFormat(product.quantityOffers?.length ? offer(product) : product.price * product.quantity)}</p>
                              </div>
                            </div>
                          ))
                        }
                        <div className='flex gap-2 justify-between mb-2'>
                          <p className='text-sm'>Subtotal</p>
                          <p className='text-sm'>${NumberFormat(sell?.cart?.reduce((bef, curr) => curr.quantityOffers?.length ? offer(curr) : bef + curr.price * curr.quantity, 0)!)}</p>
                        </div>
                        <div className='flex gap-2 justify-between mb-2'>
                          <p className='text-sm'>Envío</p>
                          <p className='text-sm'>${NumberFormat(sell?.shipping!)}</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p className='font-medium'>Total</p>
                          <p className='font-medium'>${NumberFormat(sell?.total!)}</p>
                        </div>
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Pago</h2>
                        <p className='text-sm mb-2'>Estado del pago: {sell?.state}</p>
                        <p className='text-sm'>Metodo de pago: {sell?.pay}</p>
                        {
                          sell?.pay === 'Pago en la entrega'
                            ? sell?.state === 'No pagado'
                              ? (
                                <button onClick={async (e: any) => {
                                  e.preventDefault()
                                  setLoadingEditPay(true)
                                  const updatedSell = {...sell, state: 'Pago realizado'}
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                  await getSell()
                                  setLoadingEditPay(false)
                                }} className='bg-main mt-2 h-9 text-white text-sm rounded-md w-48'>{loadingEditPay ? <Spinner2 /> : 'Marcar pago realizado'}</button>
                              )
                              : ''
                            : ''
                        }
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Entrega</h2>
                        <p className='text-sm mb-2'>Estado del envío: {sell?.shippingState}</p>
                        <p className='text-sm'>Metodo del envío: {sell?.shippingMethod}</p>
                        {
                          sell?.shippingState === 'No empaquetado'
                            ? (
                              <button onClick={async (e: any) => {
                                e.preventDefault()
                                setLoadingEdit(true)
                                const updatedSell = {...sell, shippingState: 'Productos empaquetados'}
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                await getSell()
                                setLoadingEdit(false)
                              }} className='bg-main border border-main mt-2 h-9 text-white text-sm rounded w-64 transition-colors duration-200 hover:bg-transparent hover:text-main'>{loadingEdit ? <Spinner2 /> : 'Marcar como empaquetado'}</button>
                            )
                            : ''
                        }
                        {
                          sell?.shippingState === 'Productos empaquetados'
                            ? sell?.shippingMethod === 'ENVIO EXPRESS'
                              ? (
                                <button onClick={async (e: any) => {
                                  e.preventDefault()
                                  setLoadingEdit(true)
                                  const updatedSell = {...sell, shippingState: 'Envío realizado'}
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                  await getSell()
                                  setLoadingEdit(false)
                                }} className='bg-main border border-main mt-2 h-9 text-white text-sm rounded-md w-52 transition-colors duration-200 hover:bg-transparent hover:text-main'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                              )
                              : (
                                <div className='mt-2'>
                                  <p className='mb-2 font-light text-sm'>Codigo de seguimiento</p>
                                  <input type='text' placeholder='Codigo' onChange={(e: any) => setShippingCode(e.target.value)} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                  {
                                    shippingCode !== ''
                                      ? (
                                        <button onClick={async (e: any) => {
                                          e.preventDefault()
                                          setLoadingEdit(true)
                                          const updatedSell = {...sell, shippingState: 'Envío realizado'}
                                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell, shippingCode: shippingCode})
                                          await getSell()
                                          setLoadingEdit(false)
                                        }} className='bg-main border border-main mt-2 h-9 text-white text-sm rounded-md w-52 transition-colors duration-200 hover:bg-transparent hover:text-main'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                                      )
                                      : (
                                        <button onClick={async (e: any) => e.preventDefault()} className='bg-main/50 border border-main/50 mt-2 h-9 text-white text-sm rounded-md w-52 cursor-not-allowed'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                                      )
                                  }
                                </div>
                              )
                            : ''
                        }
                      </div>
                    </div>
                    <div className='flex gap-4 flex-col w-2/5'>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Datos del cliente</h2>
                        <Link className='text-sm block mb-2' href={`/clientes/${sell?.email}`}>{sell?.firstName} {sell?.lastName}</Link>
                        <Link className='text-sm block' href={`/clientes/${sell?.email}`}>{sell?.email}</Link>
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Dirección de envío</h2>
                        <p className='text-sm mb-2'>{sell?.address}</p>
                        <p className='text-sm mb-2'>{sell?.city}</p>
                        <p className='text-sm'>{sell?.region}</p>
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4 font-medium'>Cancelar venta</h2>
                        <button onClick={async () => {
                          const sellUpdate = {...sell, state: 'Cancelado'}
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell?._id}`, {sell: sellUpdate})
                          router.push('/ventas')
                        }} className='bg-red-600 border border-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md w-24 transition-colors duration-200 hover:bg-transparent hover:text-red-600'>Cancelar</button>
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