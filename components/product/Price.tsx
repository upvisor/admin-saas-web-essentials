import { IProduct } from '@/interfaces'
import React from 'react'

interface Props {
  information: IProduct
  setInformation: any
}

export const Price: React.FC<Props> = ({information, setInformation}) => {

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  return (
    <div className='bg-white p-4 rounded-md flex flex-col gap-4 shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Precio</h2>
      <div className='flex gap-2 border-b pb-4'>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Precio</p>
          <input type='text' placeholder='Precio actual' value={information.price} name='price' onChange={inputChange} className='w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Precio anterior</p>
          <input type='text' placeholder='Precio anterior' value={information.beforePrice} name='beforePrice' onChange={inputChange} className='w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Costo del producto</p>
        <input type='text' placeholder='Costo' name='cost' onChange={inputChange} value={information.cost} className='p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
