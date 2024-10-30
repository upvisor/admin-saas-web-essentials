"use client"
import { Spinner } from '@/components/ui'
import { INotification } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  transports: ['websocket']
})

export default function Page () {

  const [notifications, setNotifications] = useState<INotification[]>()

  const pathname = usePathname()

  const getNotifications = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
    setNotifications(response.data)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    getNotifications()
  }, [pathname])

  return (
    <>
      <Head>
        <title>Notificaciones</title>
      </Head>
        <div className='p-6 bg-bg h-full overflow-y-auto dark:bg-neutral-900'>
          <div className='flex flex-col gap-2 border border-black/5 bg-white rounded-xl p-4 justify-between w-full max-w-[900px] m-auto mb-4 shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
            <h1 className='text-xl p-2 font-medium'>Notificaciones</h1>
            <div className='flex flex-col gap-2'>
              {
                notifications === undefined
                  ? (
                    <div className='w-full flex mt-10 mb-10'>
                      <div className='m-auto w-fit'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : notifications.length
                    ? notifications.map(notification => {
                      const createdAt = new Date(notification.createdAt!)
                      return (
                        <Link href={notification.url} key={notification._id} className='flex gap-4 justify-between transition-colors duration-150 hover:bg-neutral-100 p-2 rounded-md dark:hover:bg-neutral-700' onClick={async () => {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notification._id}`)
                          socket.emit('newNotification', true)
                          getNotifications()
                        }}>
                          <div className='flex flex-col gap-1'>
                            <p>{notification.title}</p>
                            <p>{notification.description}</p>
                            <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                          </div>
                          {
                            notification.view
                              ? ''
                              : <div className='w-3 h-3 rounded-full bg-main mt-auto mb-auto' />
                          }
                        </Link>
                      )
                    })
                    : <p>No hay notificaciones</p>
              }
            </div>
          </div>
        </div>
    </>
  )
}