import axios from 'axios'
import React from 'react'
import Image from 'next/image'
import { ICategory, ICategoryPage, IPage, IProduct } from '@/interfaces'

interface Props {
    edit: any
    design: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    i: number
    categories: ICategory[]
    productsOrder: IProduct[] | undefined
    pageNeed: IPage[]
}

export const Bloque2: React.FC<Props> = ({ edit, design, pages, setPages, index, i, categories, productsOrder, pageNeed }) => {
  return (
    <div className="w-full flex py-24 px-2">
                                          <div className="w-full flex max-w-[1600px] m-auto">
                                            {
                                              edit !== 'Bloque 2'
                                                ? (
                                                  <>
                                                    <div className="w-1/2 flex">
                                                      {
                                                        design.info?.image?.url && design.info.image.url !== ''
                                                          ? <Image className='h-fit m-auto' width={480} height={300} alt='Imagen slider prueba' src={design.info.image.url} />
                                                          : ''
                                                      }
                                                    </div>
                                                    <div className="w-1/2 m-auto flex flex-col gap-4">
                                                      <h1 className={`transition-opacity duration-200 text-[25px] font-medium md:text-[32px]`}>{design.info.title}</h1>
                                                      <p className={`transition-opacity duration-200 text-sm lg:text-[16px]`}>{design.info.description}</p>
                                                      <button className='bg-[#f6531a] border border-[#f6531a] w-fit transition-colors duration-200 text-white py-1.5 px-6 hover:bg-transparent rounded-md hover:text-[#f6531a]'>{design.info.button}</button>
                                                    </div>
                                                  </>
                                                )
                                                : (
                                                  <>
                                                    <div className="w-1/2 flex flex-col gap-2">
                                                      {
                                                        design.info?.image?.url && design.info.image.url !== ''
                                                          ? <Image className='h-fit m-auto' width={480} height={300} alt='Imagen slider prueba' src={design.info.image.url} />
                                                          : ''
                                                      }
                                                      <input type='file' className='m-auto text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' onChange={async (e: any) => {
                                                        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
                                                          headers: {
                                                            accept: 'application/json',
                                                            'Accept-Language': 'en-US,en;q=0.8',
                                                            'Content-Type': 'multipart/form-data'
                                                          }
                                                        })
                                                        const oldPages = [...pages]
                                                        oldPages[i].design[index].info.image = { public_id: data.image.public_id, url: data.image.url }
                                                        setPages(oldPages)
                                                      }} />
                                                    </div>
                                                    <div className="w-1/2 m-auto flex flex-col gap-4">
                                                      <input type='text' placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                                                        const oldPages = [...pages]
                                                        oldPages[i].design[index].info.title = e.target.value
                                                        setPages(oldPages)
                                                      }} className='text-[25px] font-medium md:text-[32px] p-1.5 rounded border' />
                                                      <input type='text' placeholder='Descripción' value={design.info.description} onChange={(e: any) => {
                                                        const oldPages = [...pages]
                                                        oldPages[i].design[index].info.description = e.target.value
                                                        setPages(oldPages)
                                                      }} className='font-medium text-sm lg:text-[16px] p-1.5 rounded border' />
                                                      <div className='flex gap-4'>
                                                        <div className='bg-main border border-main w-fit text-white py-1.5 px-6 rounded-md'>
                                                          <input type='text' placeholder='Boton' value={design.info.button} onChange={(e: any) => {
                                                            const oldPages = [...pages]
                                                            oldPages[i].design[index].info.button = e.target.value
                                                            setPages(oldPages)
                                                          }} className='font-medium text-sm lg:text-[16px] bg-main rounded border border-neutral-500' />
                                                        </div>
                                                        <select value={design.info.buttonLink} onChange={(e: any) => {
                                                          const oldPages = [...pages]
                                                          oldPages[i].design[index].info.buttonLink = e.target.value
                                                          setPages(oldPages)
                                                        }} className='rounded border w-full'>
                                                          <option>Seleccionar pagina</option>
                                                          {
                                                             pageNeed.map(page => (
                                                              <option key={page.slug}>/{page.slug}</option>
                                                            ))
                                                          }
                                                          {
                                                            categories.map(category => (
                                                              <option key={category._id}>/tienda/{category.slug}</option>
                                                            ))
                                                          }
                                                          {
                                                            productsOrder?.map(product => (
                                                              <option key={product._id}>/tienda/{product.category.slug}/{product.slug}</option>
                                                            ))
                                                          }
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </>
                                                )
                                            }
                                          </div>
                                        </div>
  )
}
