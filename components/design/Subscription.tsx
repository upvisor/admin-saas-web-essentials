import { ICategoryPage, IPage } from '@/interfaces'
import React from 'react'

interface Props {
    edit: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    design: any
    i: number
}

export const Subscription: React.FC<Props> = ({ edit, pages, setPages, index, design, i }) => {
  return (
    <div className='w-full bg-neutral-100 pl-4 pr-4 flex'>
                                                      <form className='m-auto w-full max-w-[1600px] mt-16 mb-16 flex flex-col gap-4'>
                                                      {
                                                        edit !== 'Suscripción'
                                                          ? (
                                                            <>
                                                              <h2 className='text-[20px] font-medium lg:text-[24px] text-center'>{design.info.title}</h2>
                                                              <div className='flex gap-2'>
                                                                <input type='email' placeholder='Email' className='p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main bg-white' />
                                                                <button className='transition-colors duration-200 rounded-md border border-main w-28 tracking-wide bg-main text-white hover:bg-transparent hover:text-main'>Enviar</button>
                                                              </div>
                                                            </>
                                                          )
                                                          : (
                                                            <>
                                                              <input type='text' placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                                                                const oldPages = [...pages]
                                                                oldPages[i].design[index].info.title = e.target.value
                                                                setPages(oldPages)
                                                              }} className='p-1.5 border rounded text-[20px] w-[800px] text-center font-medium lg:text-[24px] m-auto' />
                                                              <div className='flex gap-2'>
                                                                <input type='email' placeholder='Email' className='p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main bg-white' />
                                                                <button className='transition-colors duration-200 rounded-md border border-main w-28 tracking-wide bg-main text-white hover:bg-transparent hover:text-main'>Enviar</button>
                                                              </div>
                                                            </>
                                                          )
                                                      }
                                                      </form>
                                                    </div>
  )
}
