"use client"
import { ButtonLink, Spinner, Table } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<IClient[]>([])

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
      <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-2xl font-medium my-auto'>Clientes</h1>
            <ButtonLink href='/clientes/nuevo-cliente'>Agregar cliente</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
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
                    <Table th={['Email', 'Nombre', 'Teléfono']}>
                      {
                        clients.map((client, index) => (
                          <tr onClick={() => router.push(`/clientes/${client.email}`)} className={`${index + 1 < clients.length ? 'border-b border-border' : ''} bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={client._id}>
                            <td className='p-3'>
                              <p>{client.email}</p>
                            </td>
                            <td className='p-3'>
                              <p>{client.firstName} {client.lastName}</p>
                            </td>
                            <td className='p-3'>
                              <p>{client.phone}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>Aun no tienes clientes</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}