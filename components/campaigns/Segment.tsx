import React, { ChangeEvent } from 'react'

interface Props {
    setEmail: any
    email: any
    clientTags: any
}

export const Segment: React.FC<Props> = ({ setEmail, email, clientTags }) => {
  return (
    <div className='bg-white p-4 w-full flex flex-col gap-2 rounded-md shadow-md dark:bg-neutral-800'>
      <div className='flex'>
        <p className='text-sm mt-auto mb-auto w-20'>Para:</p>
        <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmail({ ...email, address: e.target.value })} value={email.address} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
          <option>Todos los suscriptores</option>
          {
            clientTags.length
              ? clientTags.map((clientTag: any) => (
                        <option key={clientTag.tag}>{clientTag.tag}</option>
              ))
              : ''
          }
        </select>
      </div>
      <div className='flex'>
        <p className='text-sm mt-auto mb-auto w-20'>Asunto:</p>
        <input type='text' placeholder='Asunto' onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail({...email, affair: e.target.value})} value={email.affair} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
