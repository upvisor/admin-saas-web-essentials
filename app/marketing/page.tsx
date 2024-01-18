import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Page () {
  return (
    <>
      <Head>
        <title>Marketing</title>
      </Head>
        <div className='p-6 w-full min-h-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='w-full max-w-1280 flex flex-col gap-4 m-auto'>
            <div className='flex gap-2 justify-between w-full'>
              <h1 className='text-xl font-medium'>Marketing</h1>
              <div className='flex gap-2'>
                <Link href='/marketing/automatizaciones/nueva-automatizacion' className='pt-1.5 pb-1.5 my-auto pl-7 pr-7'>Crear automatización</Link>
                <Link href='/marketing/campanas/nueva-campana' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7  rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main'>Crear campaña</Link>
              </div>
            </div>
            <div className='flex gap-4 w-full max-w-1280 m-auto'>
              <Link className='p-6 bg-white rounded-md border border-white shadow transition-colors duration-200 dark:bg-neutral-800 hover:bg-main hover:border-main hover:text-white dark:hover:bg-main dark:border-neutral-700 dark:hover:border-main' href='/marketing/campanas'>Campañas</Link>
              <Link className='p-6 bg-white rounded-md border border-white shadow transition-colors duration-200 dark:bg-neutral-800 hover:bg-main hover:border-main hover:text-white dark:hover:bg-main dark:border-neutral-700 dark:hover:border-main' href='/marketing/automatizaciones'>Automatizaciones</Link>
            </div>
          </div>
        </div>
    </>
  )
}