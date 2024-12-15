"use client"
import { Button, Input, Select, Spinner } from '@/components/ui'
import { IClient, IFunnel, IService } from '@/interfaces'
import { IStadistics } from '@/interfaces/stadistics'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [stadistics, setStadistics] = useState<IStadistics>()
  const [filter, setFilter] = useState({
    dateInitial: undefined,
    dateLast: undefined
  })
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<IClient[]>([])

  const getStadistics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`)
    setStadistics(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getStadistics()
  }, [])

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleFilter = async () => {
    if (!loading) {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`, filter)
      setStadistics(response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Estadisticas</title>
      </Head>
        <div className='p-6 bg-bg flex flex-col gap-6 w-full h-full overflow-y-auto dark:bg-neutral-900'>
          <div className='flex flex-col gap-4 w-full max-w-[1280px] mx-auto'>
            <h1 className='text-2xl font-medium'>Estadisticas</h1>
            <p>Estadisticas de la tienda</p>
            <div className='flex gap-2 flex-col lg:flex-row'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Desde</p>
                <Input type='date' change={inputChange} name='dateInitial' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Hasta</p>
                <Input type='date' change={inputChange} name='dateLast' />
              </div>
              <Button action={handleFilter} config='mt-auto'>Filtrar</Button>
            </div>
          </div>
          <div className='flex gap-6 w-full flex-wrap max-w-[1280px] mx-auto overflow-auto min-h-[550px]'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : stadistics?.clients.length || stadistics?.leads.length || stadistics?.pages.length || stadistics?.sessions.length
                  ? (
                    <>
                      <div className='grid grid-cols-4 gap-4 w-full max-w-[1280px] min-w-[800px]'>
                        <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                          <p className='font-medium'>Registros completados</p>
                          <p className='text-2xl font-medium m-auto'>{stadistics.leads.length}</p>
                        </div>
                        <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                          <p className='font-medium'>Sesiones totales</p>
                          <p className='text-2xl font-medium m-auto'>{stadistics.sessions.length}</p>
                        </div>
                        <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                          <p className='font-medium'>Paginas visitadas</p>
                          <p className='text-2xl font-medium m-auto'>{stadistics.pages.length}</p>
                        </div>
                      </div>
                    </>
                  )
                  : <p>No hay estadisticas disponibles</p>
            }
          </div>
        </div>
    </>
  )
}