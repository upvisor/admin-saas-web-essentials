import React from 'react'
import { Card, Input } from '../ui'
import { IClient } from '@/interfaces'

interface Props {
    inputChange: any
    clientData: IClient
}

export const Data: React.FC<Props> = ({ inputChange, clientData }) => {
  return (
    <Card title='Datos'>
      <div className='flex gap-2'>
        <div className='w-1/2 flex gap-2 flex-col'>
          <p className='text-sm'>Nombre</p>
          <Input placeholder='Nombre' name='firstName' change={inputChange} value={clientData.firstName} />
        </div>
        <div className='w-1/2 flex gap-2 flex-col'>
          <p className='text-sm'>Apellido</p>
          <Input placeholder='Apellido' name='lastName' change={inputChange} value={clientData.lastName} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Correo electronico</p>
        <Input placeholder='Correo' name='email' change={inputChange} value={clientData.email} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Teléfono</p>
        <div className='flex gap-2'>
          <p className='m-auto pt-1 pb-1 pl-2 pr-2 rounded text-sm dark:border-neutral-600'>+56</p>
          <Input placeholder='Teléfono' name='phone' change={inputChange} value={clientData.phone} />
        </div>
      </div>
    </Card>
  )
}
