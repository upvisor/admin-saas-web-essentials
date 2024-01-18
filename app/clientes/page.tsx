"use client"
import { Spinner } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])

  const router = useRouter()

  const getClients = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getClients()
  }, [])

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <div className='w-full h-full bg-[#f6f6f7] dark:bg-neutral-900'>
        <div className='p-6 w-full flex flex-col gap-4 overflow-y-auto'>
          <div className='flex justify-between w-full max-w-1280 m-auto'>
            <h1 className='text-xl font-medium'>Clientes</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main' href='/clientes/nuevo-cliente'>Agregar cliente</Link>
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
                : clients.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <th className='text-left p-2 font-medium'>Email</th>
                        <th className='text-left p-2 font-medium'>Nombre</th>
                        <th className='text-left p-2 font-medium'>Telefono</th>
                        <th className='text-left p-2 font-medium'>Región</th>
                        <th className='text-left p-2 font-medium'>Ciudad</th>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          clients.map((client: any) => (
                            <tr onClick={() => router.push(`/clientes/${client._id}`)} className='border-b cursor-pointer w-full transition-colors duration-150 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={client._id}>
                              <td className='p-2'>
                                <p>{client.email}</p>
                              </td>
                              <td className='p-2'>
                                <p>{client.firstName} {client.lastName}</p>
                              </td>
                              <td className='p-2'>
                                <p>{client.phone}</p>
                              </td>
                              <td className='p-2'>
                                <p>{client.region}</p>
                              </td>
                              <td className='p-2'>
                                <p>{client.city}</p>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : <p>Aun no tienes clientes</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}