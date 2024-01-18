import React from 'react'

interface Props {
    codeInfo: any
    inputChange: any
}

export const Code: React.FC<Props> = ({ codeInfo, inputChange }) => {
  return (
    <div className='bg-white flex flex-col gap-2 border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Codigo promocional</h2>
      <input type='text' placeholder='Codigo promocional' name='promotionalCode' onChange={inputChange} value={codeInfo.promotionalCode} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
    </div>
  )
}
