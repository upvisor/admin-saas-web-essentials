"use client"
import { INotification, IStoreData } from '@/interfaces'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { io } from 'socket.io-client'
import { Spinner } from '../ui'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

export const Navbar: React.FC<PropsWithChildren> = ({ children }) => {

  const { systemTheme, theme, setTheme } = useTheme()
  const { data: session } = useSession()

  const [mounted, setMounted] = useState(false)
  const [notificationsView, setNotificationsView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [account, setAccount] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [storeData, setStoreData] = useState<IStoreData>()
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(false)

  const notificationsRef = useRef(notifications)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (session === null) {
      router.push('/ingresar')
    } else if (session !== undefined) {
      setLoading(false)
    }
  }, [session])

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStoreData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (res.data) {
      setStoreData(res.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getNotifications = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/ultimate`)
    if (response.data.find((notification: any) => notification.view === false)) {
      setNotification(true)
    } else {
      setNotification(false)
    }
    setNotifications(response.data)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    notificationsRef.current = notifications
  }, [notifications])

  useEffect(() => {
    socket.on('message', async (message) => {
      setNotification(true)
      if (message.message) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {title: 'Nuevo mensaje: Chat web', description: message.message, url: '/mensajes', view: false})
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    socket.on('whatsapp', async (message) => {
      setNotification(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {title: 'Nuevo mensaje: WhatsApp', description: message.message, url: '/mensajes/whatsapp', view: false})
    })

    return () => {
      socket.off('whatsapp', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    socket.on('messenger', async (message) => {
      setNotification(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {title: 'Nuevo mensaje: Messenger', description: message.message, url: '/mensajes/messenger', view: false})
    })

    return () => {
      socket.off('messenger', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    socket.on('instagram', async (message) => {
      setNotification(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {title: 'Nuevo mensaje: Instagram', description: message.message, url: '/mensajes/instagram', view: false})
    })

    return () => {
      socket.off('instagram', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    socket.on('newNotification', async () => {
      setNotification(true)
    })
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500' /></button>
      )
    }
  }

  return (
    <>
      <div className={`${loading ? 'flex' : 'hidden'} fixed w-full h-full z-50 bg-white`}>
        <div className='w-fit h-fit m-auto'>
          <Spinner />
        </div>
      </div>
      {
        pathname !== '/ingresar'
          ? (
            <>
              <div className='w-full px-2 py-1 bg-white border-b z-40 dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='w-full m-auto flex justify-between'>
                  <div className='flex gap-2'>
                    {
                      !mounted
                        ? <Link href='/'><div className='h-10 w-1'><p>TIENDA</p></div></Link>
                        : storeData?.logo && storeData.logo.url !== ''
                          ? theme === 'system'
                            ? systemTheme === 'dark'
                              ? storeData.logoWhite && storeData.logoWhite.url !== ''
                                ? <Link href='/'><img className='h-10' src={storeData.logoWhite.url} /></Link>
                                : <Link href='/'><div className='h-10 w-1 flex'><p className='text-3xl m-auto font-semibold'>TIENDA</p></div></Link>
                              : <Link href='/'><img className='h-10' src={storeData.logo.url} /></Link>
                            : theme === 'dark'
                              ? storeData.logoWhite && storeData.logoWhite.url !== ''
                                ? <Link href='/'><img className='h-10' src={storeData.logoWhite.url} /></Link>
                                : <Link href='/'><div className='h-10 w-1 flex'><p className='text-3xl m-auto font-semibold'>TIENDA</p></div></Link>
                              : <Link href='/'><img className='h-10' src={storeData.logo.url} /></Link>
                          : <Link href='/'><div className='h-10 w-1 flex'><p className='text-3xl m-auto font-semibold'>TIENDA</p></div></Link>
                    }
                  </div>
                  <div className='flex gap-4'>
                    {renderThemeChanger()}
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      if (notificationsView.view === 'hidden') {
                        getNotifications()
                        setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      } else {
                        setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }}><IoIosNotificationsOutline className='m-auto text-2xl' />{notification ? <div className='w-2 h-2 bg-main rounded-full absolute ml-4 -mt-6' /> : ''}</button>
                    <button onClick={() => {
                      if (account.view === 'hidden') {
                        setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAccount({ ...account, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      } else {
                        setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }}>{session?.user?.email}</button>
                  </div>
                </div>
              </div>
              <div onClick={() => {
                if (!account.mouse) {
                  setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }
              }} className={`${account.opacity} ${account.view} transition-opacity duration-200 fixed z-50 w-full h-full mt-[1px]`}>
                <div onMouseEnter={() => setAccount({ ...account, mouse: true })} onMouseLeave={() => setAccount({ ...account, mouse: false })} className='p-6 w-64 bg-white rounded-md h-fit shadow-md ml-auto dark:bg-neutral-800'>
                <button onClick={async (e: any) => {
                  e.preventDefault()
                  setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                  await signOut()
                }}>Cerrar sesión</button>
                </div>
              </div>
              <div className={`${notificationsView.view} ${notificationsView.opacity} transition-opacity duration-200 w-full absolute z-50 flex`} onClick={(e: any) => {
                e.preventDefault()
                if (!notificationsView.mouse) {
                  setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }
              }} style={{ height: 'calc(100% - 56px)' }}>
                <div onMouseEnter={() => setNotificationsView({ ...notificationsView, mouse: true })} onMouseLeave={() => setNotificationsView({ ...notificationsView, mouse: false })} className='mt-[1px] mr-2 p-4 h-fit max-h-[500px] ml-auto rounded-md shadow-md bg-white z-50 w-[350px] dark:bg-neutral-800' style={{ overflow: 'overlay' }}>
                  <p className='mb-4 text-lg border-b pb-2 mt-2 ml-2 mr-2 dark:border-neutral-600'>Notificaciones</p>
                  {
                    notifications.length
                      ? (
                        <div className='flex flex-col gap-2'>
                          {
                            notifications.map(notification => {
                              const createdAt = new Date(notification.createdAt!)
                              return (
                                <Link className='hover:bg-neutral-100 transition-colors duration-150 p-2 rounded-md flex gap-4 justify-between dark:hover:bg-neutral-700' href={notification.url} key={notification.description} onClick={async () => {
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notification._id}`)
                                  getNotifications()
                                }}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{notification.title}</p>
                                    <p>{notification.description}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    notification.view
                                      ? ''
                                      : <div className='w-3 h-3 rounded-full bg-main mt-auto mb-auto' />
                                  }
                                </Link>
                              )
                            })
                          }
                          <Link href='/notificaciones' className='text-main text-center hover:bg-neutral-100 p-2 rounded-md dark:hover:bg-neutral-700'>Ver todos</Link>
                        </div>
                      )
                      : <p>No hay notificaciones</p>
                  }
                </div>
              </div>
              { children }
            </>
          )
          : <>{ children }</>
      }
    </>
  )
}
