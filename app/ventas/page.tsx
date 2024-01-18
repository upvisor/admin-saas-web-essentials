"use client"
import { Spinner } from '@/components/ui'
import { NumberFormat } from '@/utils'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Page () {

  const [loading, setLoading] = useState(true)
  const [sells, setSells] = useState([])

  const router = useRouter()

  const getSells = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells`)
    setSells(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getSells()
  }, [])

  return (
    <>
      <Head>
        <title>Ventas</title>
      </Head>
      <div className='p-6 w-full min-h-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900'>
        <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
          <h1 className='text-xl font-medium'>Ventas</h1>
          <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main text-white hover:bg-transparent hover:text-main transition-colors duration-200' href='/ventas/nueva-venta'>Nueva venta</Link>
        </div>
        <div className='w-full max-w-1280 m-auto'>
          {
            loading
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : sells?.length
                ? (
                  <table className='shadow-md w-full border dark:border-neutral-600'>
                    <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                      <th className='text-left p-2 font-medium'>Nombre</th>
                      <th className='text-left p-2 font-medium'>Email</th>
                      <th className='text-left p-2 font-medium'>Teléfono</th>
                      <th className='text-left p-2 font-medium'>Región</th>
                      <th className='text-left p-2 font-medium'>Envío</th>
                      <th className='text-left p-2 font-medium'>Estado</th>
                      <th className='text-left p-2 font-medium'>Fecha</th>
                    </thead>
                    <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                      {
                        sells.map((sell: any) => (
                          <tr key={sell._id} onClick={() => router.push(`/ventas/${sell._id}`)} className='border-b cursor-pointer w-full transition-colors duration-150 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'>
                            <td className='p-2'>
                              <p>{sell.firstName} {sell.lastName}</p>
                            </td>
                            <td className='p-2'>
                              <p>{sell.email}</p>
                            </td>
                            <td className='p-2'>
                              <p>+{sell.phone}</p>
                            </td>
                            <td className='p-2'>
                              <p>{sell.region}</p>
                            </td>
                            <td className='p-2'>
                              <p>${NumberFormat(sell.shipping)}</p>
                            </td>
                            <td className='p-2'>
                              <p>{sell.state}</p>
                            </td>
                            <td className='p-2'>
                              <p>{new Date(sell.createdAt!).toLocaleDateString()}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
                : <p>No hay ventas</p>
          }
        </div>
      </div>
    </>
  )
}