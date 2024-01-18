import React from 'react'

interface Props {
    codeInfo: any
    inputChange: any
    minimunPrice: any
    setMinimunPrice: any
}

export const Promotion: React.FC<Props> = ({ codeInfo, inputChange, minimunPrice, setMinimunPrice }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Promoción</h2>
      <div className='flex gap-2 border-b pb-4 dark:border-neutral-700'>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Tipo de descuento</p>
          <select value={codeInfo.discountType} onChange={inputChange} name='discountType' className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
            <option>Porcentaje</option>
            <option>Valor</option>
          </select>
        </div>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Valor del descuento</p>
          <input type='text' placeholder='Valor' name='value' onChange={inputChange} value={codeInfo.value} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <input type='checkbox' onChange={(e: any) => e.target.checked ? setMinimunPrice(true) : setMinimunPrice(false)} />
          <p className='text-sm'>Este cupon requiere de un monto minimo</p>
        </div>
        {
          minimunPrice
            ? (
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Monto minimo</p>
                <input type='text' placeholder='Valor' name='minimumAmount' onChange={inputChange} value={codeInfo.minimumAmount} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}
