import React from 'react'

interface Props {
    inputChange: any
    clientData: any
}

export const Data: React.FC<Props> = ({ inputChange, clientData }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Datos</h2>
      <div className='flex gap-2'>
        <div className='w-1/2 flex gap-2 flex-col'>
          <p className='text-sm'>Nombre</p>
          <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={clientData.firstName} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='w-1/2 flex gap-2 flex-col'>
          <p className='text-sm'>Apellido</p>
          <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={clientData.lastName} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Correo electronico</p>
        <input type='text' placeholder='Correo' name='email' onChange={inputChange} value={clientData.email} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Telefono</p>
        <div className='flex gap-2'>
          <p className='border m-auto pt-1 pb-1 pl-2 pr-2 rounded text-sm dark:border-neutral-600'>+56</p>
          <input type='text' placeholder='Telefono' name='phone' onChange={inputChange} value={clientData.phone} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
      </div>
    </div>
  )
}
