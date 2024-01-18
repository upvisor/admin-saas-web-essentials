"use client"
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineDollarCircle, AiOutlineFund, AiOutlineNotification, AiOutlineMessage } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
import { BsShop } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'

export const LeftMenu: React.FC<PropsWithChildren> = ({ children }) => {
  
  const pathname = usePathname()

  return (
    <>
      {
        pathname !== '/ingresar'
          ? (
            <div className='flex w-full' style={{ height: 'calc(100vh - 49px' }}>
              <div className={`w-[250px] z-40 bg-white border-r pt-6 pb-6 pl-4 pr-4 flex flex-col justify-between dark:border-neutral-800 dark:bg-neutral-900`}>
                <div className='flex flex-col gap-2'>
                  <Link href='/' className={`transition-all duration-150 ${pathname === '/' ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineHome className='mt-auto mb-auto text-xl text-main' /><p>Inicio</p></Link>
                  <Link href='/ventas' className={`transition-all duration-150 ${pathname.includes('/ventas') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineDollarCircle className='mt-auto mb-auto text-xl text-main' /><p>Ventas</p></Link>
                  <Link href='/productos' className={`transition-all duration-150 ${pathname.includes('/productos') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><MdOutlineLocalOffer className='mt-auto mb-auto text-xl text-main' /><p>Productos</p></Link>
                  {
                    pathname.includes('productos')
                      ? (
                        <>
                          <div className='flex flex-col gap-2'>
                            <Link href='/productos/categorias' className={`transition-all duration-150 ${pathname.includes('/productos/categorias') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p>Categorias</p></Link>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <Link href='/productos/codigos-promocionales' className={`transition-all duration-150 ${pathname.includes('/productos/codigos-promocionales') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p>Codigos</p></Link>
                          </div>
                        </>
                      )
                      : ''
                  }
                  <Link href='/estadisticas' className={`transition-all duration-150 ${pathname.includes('/estadisticas') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineFund className='mt-auto mb-auto text-xl text-main' /><p>Estadisticas</p></Link>
                  <Link href='/clientes' className={`transition-all duration-150 ${pathname.includes('/clientes') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><HiOutlineUsers className='mt-auto mb-auto text-xl text-main' /><p>Clientes</p></Link>
                  <Link href='/marketing' className={`transition-all duration-150 ${pathname.includes('/marketing') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineNotification className='mt-auto mb-auto text-xl text-main' /><p>Marketing</p></Link>
                  {
                    pathname.includes('marketing')
                      ? (
                        <>
                          <div className='flex flex-col gap-2'>
                            <Link href='/marketing/campanas' className={`transition-all duration-150 ${pathname.includes('/marketing/campanas') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p>Campañas</p></Link>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <Link href='/marketing/automatizaciones' className={`transition-all duration-150 ${pathname.includes('/marketing/automatizaciones') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p>Automatizaciones</p></Link>
                          </div>
                        </>
                      )
                      : ''
                  }
                  <Link href='/mensajes' className={`transition-all duration-150 ${pathname.includes('/mensajes') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineMessage className='mt-auto mb-auto text-xl text-main' /><p>Mensajes</p></Link>
                  <Link href='/blog' className={`transition-all duration-150 ${pathname.includes('/blog') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><TfiWrite className='mt-auto mb-auto text-xl text-main' /><p>Blog</p></Link>
                  <Link href='/diseno' className={`transition-all duration-150 ${pathname.includes('/diseno') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><BsShop className='mt-auto mb-auto text-xl text-main' /><p>Diseño</p></Link>
                </div>
                <div className='border-t pt-4 dark:border-neutral-800'>
                  <Link href='/configuracion' className={`transition-all duration-150 ${pathname.includes('/configuracion') ? 'bg-main/20' : ''} flex h-8 gap-2 rounded pt-1 pb-1 pl-2 pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800`}><IoSettingsOutline className='mt-auto mb-auto text-xl text-main' /><p>Configuración</p></Link>
                </div>
              </div>
              <main style={{ width: 'calc(100% - 250px)' }}>
                { children }
              </main>
            </div>
          )
          : <>{ children }</>
      }
    </>
  )
}
