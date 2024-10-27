import React from 'react'
import { Card, Input } from '../ui'

interface Props {
    setClientData: any
    inputChange: any
    clientData: any
}

export const Address: React.FC<Props> = ({ setClientData, inputChange, clientData }) => {
  return (
    <Card title='Dirección'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Calle</p>
        <Input placeholder='Calle' name='address' change={inputChange} value={clientData.address} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Departamento, local, etc. (Opcional)</p>
        <Input placeholder='Departamento' name='departament' change={inputChange} value={clientData.departament} />
      </div>
    </Card>
  )
}
