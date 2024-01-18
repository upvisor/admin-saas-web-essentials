import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineFileDone, AiOutlineLaptop } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { TbWorldWww } from 'react-icons/tb'

export const Nav = () => {

  const pathname = usePathname()

  return (
    <div className='bg-white flex flex-col gap-4 sticky top-0 w-1/4 h-fit shadow-md p-4 rounded-md dark:bg-neutral-800'>
      <div>
        <h1 className='text-lg font-medium'>Configuración</h1>
      </div>
      <div className='flex flex-col gap-2'>
        <Link className={`flex gap-2 ${pathname === '/configuracion' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion'><HiOutlineInformationCircle className='my-auto text-main text-xl' />Información de la tienda</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/pasarela-de-pago' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/pasarela-de-pago'><BsCreditCard className='my-auto text-main text-xl' />Pasarela de pago</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/plan' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/plan'><AiOutlineLaptop className='my-auto text-main text-xl' />Plan</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/politicas' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/politicas'><AiOutlineFileDone className='my-auto text-main text-xl' />Politicas</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/dominio' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/dominio'><TbWorldWww className='my-auto text-main text-xl' />Dominio</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/envios' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/envios'><LiaShippingFastSolid className='my-auto text-main text-xl' />Envíos</Link>
      </div>
    </div>
  )
}
