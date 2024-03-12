import { IPage } from '@/interfaces'
import React from 'react'

interface Props {
    edit: any
    pages: IPage[]
    setPages: any
    design: any
    index: number
    i: number
}

export const Bloque6: React.FC<Props> = ({ edit, pages, setPages, design, index, i }) => {
  return (
    <div className="w-full flex text-white text-center" style={{ backgroundImage: `url(${design.info.image?.url})` }}>
                                                        <div className="w-full max-w-[1280px] m-auto py-28 flex flex-col gap-2">
                                                          {
                                                            edit !== 'Bloque 6'
                                                              ? (
                                                                <>
                                                                  <h1 className={`${design.info.image.url !== '' ? 'text-white' : 'text-black'} text-[25px] font-medium lg:text-[32px]`}>{design.info.title}</h1>
                                                                  <p className={`${design.info.image.url !== '' ? 'text-white' : 'text-black'} text-sm lg:text-[16px]`}>{design.info.description}</p>
                                                                </>
                                                              )
                                                              : (
                                                                <>
                                                                  <input type='text' placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                                                                    const oldPages = [...pages]
                                                                    oldPages[i].design[index].info.title = e.target.value
                                                                    setPages(oldPages)
                                                                  }} className={`${design.info.image.url !== '' ? 'text-white' : 'text-black'} p-1.5 border rounded text-[25px] w-[800px] bg-transparent border-neutral-500 text-center font-medium lg:text-[32px] m-auto`} />
                                                                  <input type='text' placeholder='Descripción' value={design.info.description} onChange={(e: any) => {
                                                                    const oldPages = [...pages]
                                                                    oldPages[i].design[index].info.description = e.target.value
                                                                    setPages(oldPages)
                                                                  }} className={`${design.info.image.url !== '' ? 'text-white' : 'text-black'} p-1.5 rounded border text-sm lg:text-[16px] bg-transparent border-neutral-500 text-center`} />
                                                                </>
                                                              )
                                                          }
                                                          
                                                        </div>
                                                      </div>
  )
}
