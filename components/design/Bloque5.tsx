import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ICategory, IPage, IProduct } from '@/interfaces'

interface Props {
    edit: any
    design: any
    pages: IPage[]
    setPages: any
    index: number
    i: number
    categories: ICategory[]
    productsOrder: IProduct[] | undefined
}

export const Bloque5: React.FC<Props> = ({ edit, design, pages, setPages, index, i, categories, productsOrder }) => {
  return (
    <div className="w-full flex py-24 px-2">
                                                <div className="w-full text-center max-w-[1600px] m-auto flex flex-col gap-4">
                                                  {
                                                    edit !== 'Bloque 5'
                                                      ? (
                                                        <>
                                                          <h1 className={`transition-opacity duration-200 text-[25px] font-medium md:text-[32px]`}>{design.info.title}</h1>
                                                          <div className="flex gap-4">
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                              <h2 className="text-[20px] font-medium lg:text-[24px]">{design.info.subTitle}</h2>
                                                              <p className='text-sm lg:text-[16px]'>{design.info.description}</p>
                                                              <button className='bg-[#f6531a] border border-[#f6531a] w-fit m-auto transition-colors duration-200 text-white py-1.5 px-6 hover:bg-transparent rounded-md hover:text-[#f6531a]'>{design.info.button}</button>
                                                            </div>
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                              <h2 className="text-[20px] font-medium lg:text-[24px]">{design.info.subTitle2}</h2>
                                                              <p className='text-sm lg:text-[16px]'>{design.info.description2}</p>
                                                              <button className='bg-[#f6531a] border border-[#f6531a] w-fit m-auto transition-colors duration-200 text-white py-1.5 px-6 hover:bg-transparent rounded-md hover:text-[#f6531a]'>{design.info.button}</button>
                                                            </div>
                                                          </div>
                                                          {
                                                            design.info?.image?.url && design.info.image.url !== ''
                                                              ? <Image className='h-fit mx-auto mt-4' width={480} height={300} alt='Imagen slider prueba' src={design.info.image.url} />
                                                              : ''
                                                          }
                                                        </>
                                                      )
                                                      : (
                                                        <>
                                                          <input type='text' placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                                                            const oldPages = [...pages]
                                                            oldPages[i].design[index].info.title = e.target.value
                                                            setPages(oldPages)
                                                          }} className='p-1.5 rounded border w-[800px] m-auto text-center text-[25px] font-medium md:text-[32px]' />
                                                        <div className="flex gap-4">
                                                          <div className="w-1/2 flex flex-col gap-2">
                                                            <input type='text' placeholder='Subtitulo 1' value={design.info.subTitle} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              oldPages[i].design[index].info.subTitle = e.target.value
                                                              setPages(oldPages)
                                                            }} className='p-1.5 rounded border m-auto text-center text-[20px] font-medium lg:text-[24px]' />
                                                            <input type='text' placeholder='Descripción 1' value={design.info.description} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              oldPages[i].design[index].info.description = e.target.value
                                                              setPages(oldPages)
                                                            }} className='p-1.5 rounded border text-sm lg:text-[16px]' />
                                                            <div className='flex gap-4 m-auto'>
                                                              <div className='bg-main border border-main w-fit text-white py-1.5 px-6 rounded-md'>
                                                                <input type='text' placeholder='Boton 1' value={design.info.button} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  oldPages[i].design[index].info.button = e.target.value
                                                                  setPages(oldPages)
                                                                }} className='font-medium text-sm lg:text-[16px] w-32 bg-main rounded border border-neutral-500' />
                                                              </div>
                                                              <select value={design.info.buttonLink} onChange={(e: any) => {
                                                                const oldPages = [...pages]
                                                                oldPages[i].design[index].info.buttonLink = e.target.value
                                                                setPages(oldPages)
                                                              }} className='rounded border w-full'>
                                                                <option>Seleccionar pagina</option>
                                                                {
                                                                  pages.map(page => (
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
                                                          <div className="w-1/2 flex flex-col gap-2">
                                                            <input type='text' placeholder='Subtitulo 2' value={design.info.subTitle2} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              oldPages[i].design[index].info.subTitle2 = e.target.value
                                                              setPages(oldPages)
                                                            }} className='p-1.5 rounded border m-auto text-center text-[20px] font-medium lg:text-[24px]' />
                                                            <input type='text' placeholder='Descripción 2' value={design.info.description2} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              oldPages[i].design[index].info.description2 = e.target.value
                                                              setPages(oldPages)
                                                            }} className='p-1.5 rounded border text-sm lg:text-[16px]' />
                                                            <div className='flex gap-4 m-auto'>
                                                              <div className='bg-main border border-main w-fit text-white py-1.5 px-6 rounded-md'>
                                                                <input type='text' placeholder='Boton 2' value={design.info.button2} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  oldPages[i].design[index].info.button2 = e.target.value
                                                                  setPages(oldPages)
                                                                }} className='font-medium text-sm lg:text-[16px] w-32 bg-main rounded border border-neutral-500' />
                                                              </div>
                                                              <select value={design.info.buttonLink2} onChange={(e: any) => {
                                                                const oldPages = [...pages]
                                                                oldPages[i].design[index].info.buttonLink2 = e.target.value
                                                                setPages(oldPages)
                                                              }} className='rounded border w-full'>
                                                                <option>Seleccionar pagina</option>
                                                                {
                                                                  pages.map(page => (
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
                                                        </div>
                                                        {
                                                          design.info?.image?.url && design.info.image.url !== ''
                                                            ? <Image className='h-fit mx-auto mt-4' width={480} height={300} alt='Imagen slider prueba' src={design.info.image.url} />
                                                            : ''
                                                        }
                                                        <input type='file' className='m-auto text-sm w-fit file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' onChange={async (e: any) => {
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
                                                        </>
                                                      )
                                                  }
                                                </div>
                                              </div>
  )
}
