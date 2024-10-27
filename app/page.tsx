"use client"
import Head from "next/head"

export default function page () {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className='p-6 bg-bg w-full h-full flex flex-col gap-6 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
        <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
          <h1 className='text-2xl my-auto font-medium'>Inicio</h1>
        </div>
        <div className='flex flex-col gap-6 w-full max-w-[1280px] mx-auto mb-4'>
          <h2 className='text-2xl font-medium'>¡Hola! Te damos la bienvenida al panel de control de tu sitio web</h2>
        </div>
      </div>
    </>
  )
}
