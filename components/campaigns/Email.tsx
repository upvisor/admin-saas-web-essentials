import { IStoreData } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface Props {
    email: any
    storeData: IStoreData | undefined
}

export const Email: React.FC<Props> = ({ email, storeData }) => {
  return (
    <div className='w-[600px] flex flex-col gap-4 m-auto bg-white pt-6 pb-6 dark:bg-neutral-800'>
      <Image className='w-40 m-auto' src={storeData?.logo.url!} alt={`Logo tienda ${storeData?.name}`} width={160} height={50} />
      <h1 className='m-auto text-3xl font-medium text-center'>{email.title}</h1>
      <p className='m-auto text-center'>{email.paragraph}</p>
      {
        email.buttonText
          ? <Link href={email.url} className='py-2 px-7 bg-main rounded w-fit m-auto text-white'>{email.buttonText}</Link>
          : ''
      }
      <div className='border-t pt-6 px-6 flex gap-4 justify-between dark:border-neutral-700'>
        {
          storeData
            ? (
              <>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>{storeData.name}</p>
                  <p className='text-sm'>{storeData.email}</p>
                  <p className='text-sm'>{storeData.phone}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm text-right'>{storeData.address}</p>
                  <p className='text-sm text-right'>{storeData.city}, {storeData.region}</p>
                </div>
              </>
            )
            : ''
        }
      </div>
    </div>
  )
}
