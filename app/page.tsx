import Head from 'next/head'
import Link from 'next/link'

export default function page () {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className='p-6 bg-[#f6f6f7] w-full h-full flex flex-col gap-4 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
        <div className='flex justify-between w-full max-w-1280 mx-auto mb-4'>
          <h1 className='text-xl font-medium'>Inicio</h1>
          <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main text-white hover:bg-transparent hover:text-main transition-colors duration-200' href='/ventas/nueva-venta'>Nueva venta</Link>
        </div>
        <div className='flex flex-col gap-6 w-full max-w-1280 mx-auto mb-4'>
          <h2 className='text-2xl font-medium'>¡Hola Jorge! Te damos la bienvenida al panel de control de tu tienda</h2>
        </div>
      </div>
    </>
  )
}
