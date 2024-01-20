"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { IEmail } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [campaigns, setCampaigns] = useState<IEmail[]>([])
  const [loading, setLoading] = useState(false)
  const [campaignSelect, setCampaignSelect] = useState({ _id: '', campaign: '' })
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingDelete, setLoadingDelete] = useState(false)

  const router = useRouter()

  const getCampaigns = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
    setCampaigns(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const deleteCampaign = async (e: any) => {
    e.preventDefault()
    setLoadingDelete(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${campaignSelect._id}`)
    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
    getCampaigns()
    setTimeout(() => {
      setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
    }, 200)
    setLoadingDelete(false)
  }

  return (
    <>
      <Head>
        <title>Campañas</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 right-0 fixed w-full z-50 flex -top-[49px] bg-black/20 dark:bg-black/40`} style={{ height: 'calc(100vh + 49px)' }}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar la campaña: <strong>{campaignSelect.campaign}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCampaign} className='bg-red-600 h-9 w-36 rounded border border-red-600 text-white transition-colors duration-200 hover:bg-transparent hover:text-red-600'>{loadingDelete ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full min-h-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl font-medium'>Campañas</h1>
            <Link href='/marketing/campanas/nueva-campana' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main'>Crear campaña</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loading
                ? (
                  <div className='w-full mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : campaigns.length
                  ? (
                    <div className='bg-white border shadow-md dark:bg-neutral-800 dark:border dark:border-neutral-700'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-neutral-300 dark:border-neutral-600'>
                            <th className='p-2 text-left font-medium'>Receptores</th>
                            <th className='p-2 text-left font-medium'>Asunto</th>
                            <th className='p-2 text-left font-medium'>Fecha</th>
                            <th className='p-2 text-left font-medium'>Estado</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            campaigns.map(campaign => {
                              const campaignDate = new Date(campaign.date!)
                              const date = new Date()
                              const day = String(campaignDate.getUTCDate()).padStart(2, '0')
                              const month = String(campaignDate.getUTCMonth() + 1).padStart(2, '0')
                              const year = String(campaignDate.getUTCFullYear())
                              return (
                                <tr key={campaign._id} className='border-t border-neutral-300 transition-colors duration-150 cursor-pointer hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'>
                                  <td className='p-2' onClick={() => router.push(`/marketing/campanas/${campaign._id}`)}>{campaign.address}</td>
                                  <td className='p-2' onClick={() => router.push(`/marketing/campanas/${campaign._id}`)}>{campaign.affair}</td>
                                  <td className='p-2' onClick={() => router.push(`/marketing/campanas/${campaign._id}`)}>{`${day}/${month}/${year}`}</td>
                                  <td className='p-2' onClick={() => router.push(`/marketing/campanas/${campaign._id}`)}>{campaignDate < date ? 'Completado' : 'No completado'}</td>
                                  <td className='p-2' onClick={(e: any) => {
                                    e.preventDefault()
                                    setCampaignSelect({ _id: campaign._id!, campaign: campaign.title })
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                    setTimeout(() => {
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                    }, 10)
                                  }}><AiOutlineClose /></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                  : <p>No hay campañas creadas</p>
            }
          </div>
        </div>
    </>
  )
}