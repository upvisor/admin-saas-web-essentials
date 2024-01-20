import React, { ChangeEvent } from 'react'

interface Props {
    setAutomatization: any
    automatization: any
    clientTags: any
}

export const Segment: React.FC<Props> = ({ setAutomatization, automatization, clientTags }) => {
  return (
    <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
      <p>Selecciona el segmento de usuarios para la automatización</p>
      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setAutomatization({ ...automatization, address: e.target.value })} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
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
  )
}
