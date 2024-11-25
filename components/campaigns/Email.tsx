import { IStoreData } from '@/interfaces'
import React from 'react'
import Image from 'next/image'

interface Props {
    email: any
    storeData: IStoreData | undefined
}

export const Email: React.FC<Props> = ({ email, storeData }) => {
  return (
    <div className='max-w-[600px] w-full flex flex-col gap-4 m-auto bg-white border border-black/5 p-6 dark:bg-neutral-800 dark:border-neutral-700'>
      {
        storeData?.logo && storeData.logo !== ''
          ? <Image className='w-40 m-auto' src={storeData?.logo!} alt={`Logo tienda ${storeData?.name}`} width={160} height={50} />
          : <p className='text-2xl font-medium text-center'>SITIO WEB</p>
      }
      <h1 className='m-auto text-3xl font-medium text-center'>{email.title}</h1>
      <p className='m-auto text-center'>{email.paragraph}</p>
      {
        email.buttonText
          ? <button className='py-2 px-6 bg-main rounded-xl w-fit m-auto text-white'>{email.buttonText}</button>
          : ''
      }
      <div className='border-t pt-6 px-6 flex flex-col gap-2 dark:border-neutral-700'>
        <p className="text-center m-auto text-sm">Enviado a:</p>
        <p className="text-center m-auto text-sm"><a href="https://yourcompany.com/unsubscribe">Anular suscripción</a></p>
      </div>
    </div>
  )
}
