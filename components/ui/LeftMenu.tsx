"use client"
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineFund, AiOutlineNotification, AiOutlineMessage, AiOutlineFunnelPlot } from 'react-icons/ai'
import { MdOutlineCall, MdOutlinePayment } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
import { BsShop } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'
import { io } from 'socket.io-client'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { LiaClipboardListSolid } from 'react-icons/lia'
import { FaCogs } from 'react-icons/fa'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  transports: ['websocket']
})

export const LeftMenu: React.FC<PropsWithChildren> = ({ children }) => {
  
  const [messages, setMessages] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    socket.on('message', async (message) => {
      if (message.message) {
        if (pathname !== '/mensajes') {
          setMessages(true)
        }
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [pathname])

  useEffect(() => {
    if (pathname === '/mensajes') {
      setMessages(false)
    }
  }, [pathname])

  return (
    <>
      {
        pathname !== '/ingresar'
          ? (
                <div className='flex bg-bg w-full' style={{ height: 'calc(100vh - 49px' }}>
                  <div className={`w-[250px] z-40 border-r border-border p-4 hidden flex-col justify-between lg:flex dark:border-neutral-800 dark:bg-neutral-900`}>
                    <div className='flex flex-col gap-1'>
                      <Link href='/' className={`transition-all duration-150 ${pathname === '/' ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineHome className={`mt-auto mb-auto text-xl ${pathname === '/' ? 'text-white' : 'text-main'}`} /><p className={`${pathname === '/' ? 'text-white' : ''}`}>Inicio</p></Link>
                      <Link href='/pagos' className={`transition-all duration-150 ${pathname.includes('/pagos') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlinePayment className={`mt-auto mb-auto text-xl ${pathname.includes('/pagos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/pagos') ? 'text-white' : ''}`}>Pagos</p></Link>
                      <Link href='/servicios' className={`transition-all duration-150 ${pathname.includes('/servicios') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><PiSuitcaseSimple className={`mt-auto mb-auto text-xl ${pathname.includes('/servicios') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/servicios') ? 'text-white' : ''}`}>Servicios</p></Link>
                      <Link href='/embudos' className={`transition-all duration-150 ${pathname.includes('/embudos') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineFunnelPlot className={`mt-auto mb-auto text-xl ${pathname.includes('/embudos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/embudos') ? 'text-white' : ''}`}>Embudos</p></Link>
                      <Link href='/crm' className={`transition-all duration-150 ${pathname.includes('/crm') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><LiaClipboardListSolid className={`mt-auto mb-auto text-xl ${pathname.includes('/crm') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/crm') ? 'text-white' : ''}`}>CRM</p></Link>
                      <Link href='/llamadas' className={`transition-all duration-150 ${pathname.includes('/llamadas') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlineCall className={`mt-auto mb-auto text-xl ${pathname.includes('/llamadas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/llamadas') ? 'text-white' : ''}`}>Llamadas</p></Link>
                      <Link href='/estadisticas' className={`transition-all duration-150 ${pathname.includes('/estadisticas') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineFund className={`mt-auto mb-auto text-xl ${pathname.includes('/estadisticas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/estadisticas') ? 'text-white' : ''}`}>Estadisticas</p></Link>
                      <Link href='/clientes' className={`transition-all duration-150 ${pathname.includes('/clientes') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><HiOutlineUsers className={`mt-auto mb-auto text-xl ${pathname.includes('/clientes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/clientes') ? 'text-white' : ''}`}>Clientes</p></Link>
                      <Link href='/campanas' className={`transition-all duration-150 ${pathname.includes('/campanas') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineNotification className={`mt-auto mb-auto text-xl ${pathname.includes('/campanas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/campanas') ? 'text-white' : ''}`}>Campañas</p></Link>
                      <Link href='/automatizaciones' className={`transition-all duration-150 ${pathname.includes('/automatizaciones') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><FaCogs className={`mt-auto mb-auto text-xl ${pathname.includes('/automatizaciones') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/automatizaciones') ? 'text-white' : ''}`}>Automatizaciones</p></Link>
                      <Link href='/mensajes' onClick={() => setMessages(false)} className={`transition-all duration-150 ${pathname.includes('/mensajes') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineMessage className={`mt-auto mb-auto text-xl ${pathname.includes('/mensajes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/mensajes') ? 'text-white' : ''}`}>Mensajes</p>{messages ? <div className='bg-main h-3 w-3 my-auto ml-auto rounded-full' /> : ''}</Link>
                      <Link href='/blog' className={`transition-all duration-150 ${pathname.includes('/blog') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><TfiWrite className={`mt-auto mb-auto text-xl ${pathname.includes('/blog') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/blog') ? 'text-white' : ''}`}>Blog</p></Link>
                      <Link href='/diseno' className={`transition-all duration-150 ${pathname.includes('/diseno') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><BsShop className={`mt-auto mb-auto text-xl ${pathname.includes('/diseno') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/diseno') ? 'text-white' : ''}`}>Diseño</p></Link>
                    </div>
                    <div className='border-t border-border pt-4 dark:border-neutral-800'>
                      <Link href='/configuracion' className={`transition-all duration-150 ${pathname.includes('/configuracion') ? 'bg-main shadow-md shadow-main/30' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><IoSettingsOutline className={`mt-auto mb-auto text-xl ${pathname.includes('/configuracion') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/configuracion') ? 'text-white' : ''}`}>Configuración</p></Link>
                    </div>
                  </div>
                  <main className='w-full lg:w-[calc(100%-250px)]'>
                    { children }
                  </main>
                </div>
              )
          : <>{ children }</>
      }
    </>
  )
}
