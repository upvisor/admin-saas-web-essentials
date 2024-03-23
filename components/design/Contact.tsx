import { ICategoryPage, IPage } from '@/interfaces'
import React from 'react'

interface Props {
    edit: any
    design: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    i: number
}

export const Contact: React.FC<Props> = ({ edit, design, pages, setPages, index, i }) => {
  return (
    <div className="w-full flex py-10 px-2">
                                                    <div className="w-full max-w-[1600px] m-auto flex gap-8">
                                                      {
                                                        edit !== 'Contacto'
                                                          ? (
                                                            <>
                                                              <div className="w-1/2 flex flex-col gap-2 m-auto">
                                                                <h1 className="text-[25px] font-medium lg:text-[32px]">{design.info.title}</h1>
                                                                <p className='text-sm lg:text-[16px]'>{design.info.description}</p>
                                                              </div>
                                                              <div className="w-1/2">
                                                                <div className="shadow-lg p-8 flex flex-col gap-4">
                                                                  <h2 className='text-[20px] font-medium lg:text-[24px]'>{design.info.titleForm}</h2>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Nombre</p>
                                                                    <input type="text" placeholder="Nombre" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Email</p>
                                                                    <input type="text" placeholder="Email" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Telefono</p>
                                                                    <input type="text" placeholder="Telefono" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Mensaje</p>
                                                                    <textarea placeholder="Mensaje" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700 h-36" />
                                                                  </div>
                                                                  <button className='bg-[#f6531a] border border-[#f6531a] w-fit transition-colors duration-200 text-white py-1.5 px-6 hover:bg-transparent rounded-md hover:text-[#f6531a]'>Enviar</button>
                                                                </div>
                                                              </div>
                                                            </>
                                                          )
                                                          : (
                                                            <>
                                                              <div className="w-1/2 flex flex-col gap-2 m-auto">
                                                                <input type='text' placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  oldPages[i].design[index].info.title = e.target.value
                                                                  setPages(oldPages)
                                                                }} className='p-1.5 rounded border text-[25px] font-medium md:text-[32px]' />
                                                                <textarea placeholder='Descripción' value={design.info.description} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  oldPages[i].design[index].info.description = e.target.value
                                                                  setPages(oldPages)
                                                                }} className='p-1.5 h-20 rounded border text-sm lg:text-[16px]' />
                                                              </div>
                                                              <div className="w-1/2">
                                                                <div className="shadow-lg p-8 flex flex-col gap-4">
                                                                <input type='text' placeholder='Titulo del formulario' value={design.info.titleForm} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  oldPages[i].design[index].info.titleForm = e.target.value
                                                                  setPages(oldPages)
                                                                }} className='p-1.5 rounded border text-[20px] font-medium lg:text-[24px]' />
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Nombre</p>
                                                                    <input type="text" placeholder="Nombre" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Email</p>
                                                                    <input type="text" placeholder="Email" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Telefono</p>
                                                                    <input type="text" placeholder="Telefono" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700" />
                                                                  </div>
                                                                  <div className="flex flex-col gap-2">
                                                                    <p>Mensaje</p>
                                                                    <textarea placeholder="Mensaje" className="p-1.5 w-full rounded-md border transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:bg-neutral-800 dark:border-neutral-700 h-36" />
                                                                  </div>
                                                                  <button className='bg-[#f6531a] border border-[#f6531a] w-fit transition-colors duration-200 text-white py-1.5 px-6 hover:bg-transparent rounded-md hover:text-[#f6531a]'>Enviar</button>
                                                                </div>
                                                              </div>
                                                            </>
                                                          )
                                                      }
                                                    </div>
                                                  </div>
  )
}
