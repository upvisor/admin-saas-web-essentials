import { ICategory, IPage } from '@/interfaces'
import React from 'react'
import Image from 'next/image'

interface Props {
    edit: any
    categories: ICategory[]
    pages: IPage[]
    setPages: any
    setMouse: any
    design: any
    index: number
    mouse: number
    i: number
}

export const Categories: React.FC<Props> = ({ edit, categories, setPages, pages, setMouse, design, index, mouse, i }) => {
  return (
    <div className="w-full flex px-4">
                                      <div className="w-full max-w-[1600px] m-auto flex flex-col gap-4">
                                        {
                                          edit !== 'Categorias'
                                            ? (
                                              <>
                                                <h2 className='text-[20px] font-medium lg:text-[24px] text-center'>{design.info.title}</h2>
                                                <div className="flex flex-col gap-4 justify-between lg:flex-row">
                                                  {
                                                    categories.map((category, index) => (
                                                      <button key={category._id} onMouseEnter={() => setMouse(index)} onMouseLeave={() => setMouse(-1)} className="flex cursor pointer flex-row gap-4 w-full lg:flex-col">
                                                        <div className="relative rounded-xl overflow-hidden w-1/2 lg:w-full">
                                                          <Image className={`${mouse === index ? 'scale-110' : 'scale-100'} transition-transform duration-150 rounded-xl w-full h-auto`} width={500} height={500} src={category.image!.url} alt='' />
                                                        </div>
                                                        <div className="flex flex-col gap-2 m-auto lg:m-0 w-1/2 lg:w-full">
                                                          <h3 className='text-left font-medium text-[16px] lg:text-[20px]'>{category.category}</h3>
                                                          {
                                                            design.info.descriptionView 
                                                              ? <p className='text-left text-sm lg:text-[16px]'>{category.description}</p>
                                                              : ''
                                                          }
                                                        </div>
                                                      </button>
                                                    ))
                                                  }
                                                </div>
                                              </>
                                            )
                                            : (
                                              <>
                                                <input type='text' placeholder='Boton' className='text-[20px] font-medium lg:text-[24px] text-center p-1.5 border rounded w-[800px] m-auto' value={design.info.title} onChange={(e: any) => {
                                                  const oldPages = [...pages]
                                                  oldPages[i].design[index].info.title = e.target.value
                                                  setPages(oldPages)
                                                }} />
                                                <div className="flex flex-col gap-4 justify-between lg:flex-row">
                                                  {
                                                    categories.map((category, index) => (
                                                      <button key={category._id} onMouseEnter={() => setMouse(index)} onMouseLeave={() => setMouse(-1)} className="flex cursor pointer flex-row gap-4 w-full lg:flex-col">
                                                        <div className="relative rounded-xl overflow-hidden w-1/2 lg:w-full">
                                                          <Image className={`${mouse === index ? 'scale-110' : 'scale-100'} transition-transform duration-150 rounded-xl w-full h-auto`} width={500} height={500} src={category.image!.url} alt='' />
                                                        </div>
                                                        <div className="flex flex-col gap-2 m-auto lg:m-0 w-1/2 lg:w-full">
                                                          <h3 className='text-left font-medium text-[16px] lg:text-[20px]'>{category.category}</h3>
                                                          {
                                                            design.info.descriptionView 
                                                              ? <p className='text-left text-sm lg:text-[16px]'>{category.description}</p>
                                                              : ''
                                                          }
                                                        </div>
                                                      </button>
                                                    ))
                                                  }
                                                </div>
                                                <div className='flex gap-2 m-auto'>
                                                  <input type='checkbox' checked={design.info.descriptionView } onClick={(e: any) => {
                                                    const oldPages = [...pages]
                                                    oldPages[i].design[index].info.descriptionView = e.target.checked
                                                    setPages(oldPages)
                                                  }} />
                                                  <p>Mostrar descripción de las categorias</p>
                                                </div>
                                              </>
                                            )
                                        }
                                      </div>
                                    </div>
  )
}
