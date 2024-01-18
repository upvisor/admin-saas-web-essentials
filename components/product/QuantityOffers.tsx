import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

interface Props {
    quantityOffers: any
    setQuantityOffers: any
}

export const QuantityOffers: React.FC<Props> = ({ quantityOffers, setQuantityOffers }) => {
  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <div className='flex flex-col gap-4'>
                          <h2 className='font-medium'>Descuentos por cantidad</h2>
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
  )
}
