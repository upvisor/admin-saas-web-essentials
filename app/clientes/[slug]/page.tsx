"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { IClient, ISell } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [clientData, setClientData] = useState<Partial<IClient>>()
  const [tags, setTags] = useState([])
  const [loadingClientTag, setLoadingClientTag] = useState(false)
  const [newClientTag, setNewClientTag] = useState('')
  const [clientSells, setClientSells] = useState<ISell[]>()
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getClientData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.slug}`)
    setClientData(response.data)
    const sells = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${response.data.email}`)
    setClientSells(sells.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getClientTags = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const deleteClient = async () => {
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData?._id}`)
    router.push('/clientes')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Cliente: {clientData?._id}</title>
      </Head>
      {
        clientData?.email
          ? (
            <div onClick={() => {
              if (!popup.mouse) {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
              <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
                <p>Estas seguro que deseas eliminar el cliente <strong>{clientData!.email}</strong></p>
                <div className='flex gap-6'>
                  <button onClick={deleteClient} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-36 rounded text-white hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
                  <button onClick={() => {
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                    }, 200)
                  }}>Cancelar</button>
                </div>
              </div>
            </div>
          )
          : ''
      }
      <div className='bg-[#f6f6f7] overflow-y-auto dark:bg-neutral-900 h-full'>
        <div className='p-6 flex flex-col gap-4 w-full'>
          {
            clientData
              ? (
                <>
                  <div className='flex gap-3 w-full justify-between m-auto'>
                    <div className='flex gap-3'>
                      <Link href='/clientes' className='border rounded p-2 bg-white transition-colors duration-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-xl font-medium mt-auto mb-auto'>{ clientData.email }</h1>
                    </div>
                    <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main text-white transition-colors duration-200 hover:bg-transparent hover:text-main' href={`/clientes/editar/${clientData._id}`}>Editar datos</Link>
                  </div>
                  <form className='flex gap-4 w-full m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Pedidos</h2>
                        <div className='flex flex-col gap-2'>
                          {
                            clientSells
                              ? clientSells.length
                                ? clientSells.map(sell => (
                                  <div onClick={() => router.push(`/ventas/${sell._id}`)} className='flex gap-4 cursor-pointer justify-between transition-colors duration-150 hover:bg-neutral-100 pt-4 pb-4 rounded pl-2 pr-2 dark:hover:bg-neutral-700' key={sell._id}>
                                    <p className='mt-auto mb-auto text-sm'>{sell.pay}</p>
                                    <p className='mt-auto mb-auto text-sm'>{sell.state}</p>
                                    <p className='mt-auto mb-auto text-sm'>{sell.shippingMethod}</p>
                                    <p className='mt-auto mb-auto text-sm'>{sell.shippingState}</p>
                                    <p className='mt-auto mb-auto text-sm'>${NumberFormat(sell.total)}</p>
                                  </div>
                                ))
                                : <p className='text-sm'>No hay ventas</p>
                              : (
                                <div className="flex w-full">
                                  <div className="m-auto mt-16 mb-16">
                                    <Spinner />
                                  </div>
                                </div>
                              )
                          }
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-4 flex-col w-1/3'>
                      <div className='bg-white flex flex-col gap-4 border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Datos</h2>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Nombre</p>
                          <p className='text-sm'>{clientData.firstName} {clientData.lastName}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Email</p>
                          <p className='text-sm'>{clientData.email}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Telefono</p>
                          <p className='text-sm'>{clientData.phone}</p>
                        </div>
                      </div>
                      <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Dirección</h2>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Calle</p>
                          <p className='text-sm'>{clientData.address}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Ciudad</p>
                          <p className='text-sm'>{clientData.city}, {clientData.region}</p>
                        </div>
                      </div>
                      <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='text-md font-medium'>Tags</h2>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Tags</p>
                          {
                            tags?.length
                              ? <div className='flex gap-2'>
                                {
                                  tags.map((tag: any) => (
                                    <div className='flex gap-1' key={tag.tag}>
                                      <input onChange={async (e: any) => {
                                        if (clientData.tags) {
                                          if (e.target.checked) {
                                            const tags = clientData.tags.concat(e.target.value)
                                            setClientData({...clientData, tags: tags})
                                            const updated = {...clientData, tags: tags}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          } else {
                                            const filter = clientData.tags.filter(tag => tag !== e.target.value)
                                            setClientData({...clientData, tags: filter})
                                            const updated = {...clientData, tags: filter}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          }
                                        } else {
                                          setClientData({...clientData, tags: [e.target.value]})
                                          const updated = {...clientData, tags: [e.target.value]}
                                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                        }
                                      }} value={tag.tag} type='checkbox' checked={clientData.tags?.find(e => e === tag.tag) ? true : false} />
                                      <p className='text-sm'>{tag.tag}</p>
                                    </div>
                                  ))
                                }
                              </div>
                              : <p className='text-sm'>No hay tags creados</p>
                          }
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Nuevo tag</p>
                          <div className='flex gap-2'>
                            <input type='text' placeholder='Nuevo tag' onChange={(e: any) => setNewClientTag(e.target.value)} value={newClientTag} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <button onClick={async (e: any) => {
                              e.preventDefault()
                              setLoadingClientTag(true)
                              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newClientTag })
                              setNewClientTag('')
                              setLoadingClientTag(false)
                              getClientTags()
                            }} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded h-8 w-24 hover:bg-transparent hover:text-main'>{loadingClientTag ? <Spinner2 /> : 'Crear'}</button>
                          </div>
                        </div>
                      </div>
                      <div className='bg-white flex flex-col gap-4 border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Eliminar cliente</h2>
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }} className='py-1.5 px-6 w-fit bg-red-600 border border-red-600 transition-colors duration-200 rounded text-white hover:bg-transparent hover:text-red-600'>Eliminar</button>
                      </div>
                    </div>
                  </form>
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
      </div>
    </>
  )
}