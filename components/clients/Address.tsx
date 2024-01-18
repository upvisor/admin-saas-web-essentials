import React from 'react'
import { ShippingCost } from '../product'

interface Props {
    setClientData: any
    inputChange: any
    clientData: any
}

export const Address: React.FC<Props> = ({ setClientData, inputChange, clientData }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Dirección</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Calle</p>
        <input type='text' placeholder='Calle' name='address' onChange={inputChange} value={clientData.address} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Departamento, local, etc. (Opcional)</p>
        <input type='text' placeholder='Departamento' name='departament' onChange={inputChange} value={clientData.departament} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <ShippingCost setClientData={setClientData} clientData={clientData} />
    </div>
  )
}
