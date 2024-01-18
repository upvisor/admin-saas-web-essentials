import React from 'react'

interface Props {
    codeInfo: any
    setCodeInfo: any
}

export const State: React.FC<Props> = ({ codeInfo, setCodeInfo }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Estado del cupon</h2>
      <select value={codeInfo.state ? 'Activo' : 'Desactivado'} onChange={(e: any) => setCodeInfo({...codeInfo, state: e.target.value === 'Activo' ? true : false})} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
        <option>Activo</option>
        <option>Desactivado</option>
      </select>
    </div>
  )
}
