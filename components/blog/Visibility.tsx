import React from 'react'

interface Props {
    setContentData: any
    contentData: any
}

export const Visibility: React.FC<Props> = ({ setContentData, contentData }) => {
  return (
    <div className='bg-white p-4 flex flex-col gap-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Visibilidad del producto</h2>
      <select onChange={(e: any) => {
        setContentData({...contentData, state: e.target.value === 'Activo' ? true : false})
      }} value={contentData.state ? 'Activo' : 'En borrador'} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
        <option>Activo</option>
        <option>En borrador</option>
      </select>
    </div>
  )
}
