import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export const Nav = () => {

  const pathname = usePathname()

  return (
    <div className='bg-white flex flex-col gap-4 sticky top-0 w-1/4 h-fit p-5 rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <div>
        <h1 className='text-lg font-medium'>Configuración</h1>
      </div>
      <div className='flex flex-col gap-2'>
        <Link className={`flex gap-2 ${pathname === '/configuracion' ? 'bg-main text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'} p-1.5 rounded-xl transition-all duration-200`} href='/configuracion'><HiOutlineInformationCircle className={`${pathname === '/configuracion' ? 'text-white' : 'text-main'} my-auto  text-xl`} />Información de la tienda</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/pasarela-de-pago' ? 'bg-main text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'} p-1.5 rounded-xl transition-all duration-200`} href='/configuracion/pasarela-de-pago'><BsCreditCard className={`${pathname === '/configuracion/pasarela-de-pago' ? 'text-white' : 'text-main'} my-auto text-xl`} />Pasarela de pago</Link>
        <Link className={`flex gap-2 ${pathname === '/configuracion/politicas' ? 'bg-main text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'} p-1.5 rounded-xl transition-all duration-200`} href='/configuracion/politicas'><AiOutlineFileDone className={`${pathname === '/configuracion/politicas' ? 'text-white' : 'text-main'} my-auto text-xl`} />Politicas</Link>
      </div>
    </div>
  )
}
