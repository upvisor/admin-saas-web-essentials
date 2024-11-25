import React, { ChangeEvent } from 'react'
import { Input, Select } from '../ui'

interface Props {
    setEmail: any
    email: any
    clientTags: any
    clientData: any
    setClientData: any
}

export const Segment: React.FC<Props> = ({ setEmail, email, clientTags, clientData, setClientData }) => {
  return (
    <div className='bg-white p-5 w-full flex flex-col gap-2 rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <div className='flex gap-2'>
        <p className='text-sm mt-auto mb-auto w-20 min-w-20'>Para:</p>
        <Select change={(e: ChangeEvent<HTMLSelectElement>) => setEmail({ ...email, address: e.target.value })} value={email.address}>
          <option>Todos los suscriptores</option>
          {
            clientTags.length
              ? clientTags.map((clientTag: any) => (
                <option key={clientTag.tag}>{clientTag.tag}</option>
              ))
              : ''
          }
        </Select>
      </div>
      <div className='flex gap-2 flex-col lg:flex-row'>
        <p className='text-sm mt-auto mb-auto w-20 min-w-20'>Asunto:</p>
        <Select change={(e: any) => {
          e.preventDefault()
          setEmail({...email, affair: email.affair + e.target.value})
        }} value='' config='w-fit'>
          <option value=''>Agregar dato cliente</option>
          {
            clientData.length
              ? clientData.map((data: any) => (
                <option key={data.data} value={'{' + data.data + '}'}>{data.name}</option>
              ))
              : ''
          }
        </Select>
        <Input placeholder='Asunto' change={(e: ChangeEvent<HTMLInputElement>) => setEmail({...email, affair: e.target.value})} value={email.affair} />
      </div>
    </div>
  )
}
