"use client"
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

interface Props {
  quantityOffers: any
  setQuantityOffers: any
}

export const QuantityOffers: React.FC<Props> = ({ quantityOffers, setQuantityOffers }) => {

  const [rotate, setRotate] = useState('rotate-90')

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-4'>
        <button onClick={(e: any) => {
          e.preventDefault()
          if (rotate === 'rotate-90') {
            setRotate('-rotate-90')
          } else {
            setRotate('rotate-90')
          }
        }} className='flex gap-3 w-fit'>
          <h2 className='font-medium'>Descuentos por cantidad</h2>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
        </button>
        <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex-col gap-4`}>
          <table>
            <thead>
              <tr>
                <th className='font-medium text-sm text-left w-1/2'>Cantidad</th>
                <th className='font-medium text-sm text-left w-1/2'>Descuento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                quantityOffers.map((offer: any, index: number) => (
                  <tr key={index}>
                    <td><input type='number' placeholder='Cantidad' onChange={(e: any) => {
                      const quantity = quantityOffers
                      quantity[index].quantity = e.target.value
                      setQuantityOffers(quantity)
                    }} value={offer.quantity} className='w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                    <td><input type='number' placeholder='%' onChange={(e: any) => {
                      const quantity = quantityOffers
                      quantity[index].descount = e.target.value
                      setQuantityOffers(quantity)
                    }} value={offer.descount} className='p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                    <td><button onClick={(e: any) => {
                      e.preventDefault()
                      const prevOffers = [...quantityOffers!]
                      prevOffers.splice(index, 1)
                      setQuantityOffers(prevOffers)
                    }}><IoCloseOutline className='text-xl' /></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button onClick={(e: any) => {
            e.preventDefault()
            setQuantityOffers(quantityOffers.concat({
              quantity: undefined,
              descount: undefined
            }))
          }} className='bg-main border border-main text-white text-sm rounded py-1.5 px-6 w-fit transition-colors duration-200 hover:bg-transparent hover:text-main'>Agregar fila</button>
        </div>
      </div>
    </div>
  )
}
