import React, { PropsWithChildren, useState } from 'react'
import Image from 'next/image'
import { ICategory, IPage } from '@/interfaces'
import Link from 'next/link'

interface Props {
    edit: any
    setEdit: any
    setHeader: any
    header: any
    setPart: any
    setNavCategoriesOpacity: any
    setMouseEnter: any
    navCategoriesOpacity: string
    categories: ICategory[]
    pages: IPage[]
}

export const Layout: React.FC<PropsWithChildren<Props>> = ({ children, edit, setEdit, setHeader, header, setPart, setNavCategoriesOpacity, setMouseEnter, navCategoriesOpacity, categories, pages }) => {

  const [cartView, setCartView] = useState('hidden')
  const [cartPosition, setCartPosition] = useState('-mt-[395px]')
  const [cartPc, setCartPc] = useState(true)

  return (
    <>
      <div className='bg-[#22262c] text-white flex pl-2 pr-2 pt-1.5 pb-1.5 sticky text-center z-50'>
                  {
                    edit !== 'Header'
                      ? <p onClick={() => setEdit('Header')} className='cursor-pointer m-auto tracking-wide font-medium text-[11px]'>{header.topStrip}</p>
                      : <input onChange={(e: any) => setHeader({ ...header, topStrip: e.target.value })} type='text' placeholder='Texto superior' value={header.topStrip} className='bg-transparent border border-neutral-500 p-1.5 rounded m-auto w-[800px] text-center' />
                  }
                </div>
                <div style={{ top: '-0.5px' }} className="w-full sticky bg-white flex z-40">
                  <div className="w-full border-b bg-white">
                    <div className='flex gap-4 bg-white px-2 justify-between m-auto max-w-[1280px] w-full'>
                      <p className="text-3xl font-bold my-auto">TIENDA</p>
                      {
                        edit !== 'Header'
                          ? <button onClick={() => setEdit('Header')} className='bg-main border border-main text-white transition-colors duration-200 rounded px-6 py-1.5 h-fit m-auto hover:bg-transparent hover:text-main'>Editar</button>
                          : (
                            <div className='flex gap-4 m-auto'>
                              <button onClick={() => setEdit('')} className='bg-main border border-main text-white transition-colors duration-200 rounded px-6 py-1.5 h-fit m-auto hover:bg-transparent hover:text-main'>Guardar</button>
                            </div>
                          )
                      }
                      <ul className="flex gap-2 my-auto">
                        {
                          pages.map(page => {
                            if (page.header) {
                              if (page.page === 'Tienda') {
                                return (
                                  <li key={page.slug} onClick={() => {
                                    setNavCategoriesOpacity('-mt-[330px]')
                                  }} onMouseEnter={() => {
                                    setNavCategoriesOpacity('-mt-[1px]')
                                  }} onMouseLeave={() => {
                                    setNavCategoriesOpacity('-mt-[330px]')
                                  }} className="m-auto h-14 flex"><button onClick={() => setPart(page.page)} className={`px-2 h-fit m-auto transition-colors duration-150`}>{page.page}</button></li>
                                )
                              } else {
                                return (
                                  <li key={page.slug}  className="m-auto h-14 flex"><button onClick={() => setPart(page.page)} className={` px-2 h-fit m-auto transition-colors duration-150`}>{page.page}</button></li>
                                )
                              }
                            }
                          })
                        }
                        <button onClick={() => {
                          if (cartPosition === '-mt-[395px]') {
                            setCartView('flex')
                            setTimeout(() => {
                              setCartPosition('')
                            }, 10)
                          } else {
                            setCartPosition('-mt-[395px]')
                            setTimeout(() => {
                              setCartView('hidden')
                            }, 500)
                          }
                        }} className='flex h-full my-auto ml-4'>
                          {
                            cartPosition === '-mt-[395px]'
                              ? (
                                <svg className='m-auto cursor-pointer w-[17px]' role="presentation" viewBox="0 0 17 20">
                                  <path d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z" fill="currentColor"></path>
                                </svg>
                              )
                              : (
                                <svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg>
                              )
                          }
                          
                        </button>
                      </ul>
                    </div>
                  </div>
                  <div className={`${navCategoriesOpacity} -z-50 flex border-b box-border transition-all duration-500 absolute top-[57px] w-full bg-white dark:border-neutral-800`} onMouseEnter={() => {
                    setMouseEnter(true)
                    setNavCategoriesOpacity('-mt-[1px]')
                  }} onMouseLeave={() => {
                    setNavCategoriesOpacity('-mt-[330px]')
                  }}>
                    <div className='flex gap-4 m-auto p-4'>
                      {
                        categories.map(category => (
                          <div key={category._id} className='bg-white flex gap-4 w-64 justify-center dark:bg-neutral-900 dark:border-neutral-800'>
                            <div>
                              <Image className='w-64 rounded-md h-auto mb-2 cursor-pointer' src={category.image!.url} width={256} height={256} alt='Categoria' />
                              <button className='m-auto tracking-wide font-medium text-[#1c1b1b] dark:text-white'>{category.category}</button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div onClick={() => {
                    if (cartPc) {
                      setCartPosition('-mt-[395px]')
                      setTimeout(() => {
                        setCartView('hidden')
                      }, 500)
                    }
                  }} className={`${cartPosition} ${cartView} transition-all duration-500 -z-10 absolute top-[57px] w-full flex`} style={{ height: 'calc(100vh - 135px)' }}>
                    <div onMouseEnter={() => setCartPc(false)} onMouseLeave={() => setCartPc(true)} className='p-4 shadow-md bg-white h-fit rounded-md flex flex-col gap-2 ml-auto w-96'>
                      <h4 className='font-medium border-b pb-2 text-center text-xl tracking-wide'>Carrito</h4>
                      <p>No tienes productos añadidos al carrito</p>
                      {
                        categories.map(category => (
                          <Link key={category._id} onClick={() => {
                            setCartPosition('-mt-[395px]')
                            setTimeout(() => {
                              setCartView('hidden')
                            }, 500)
                          }} className='border p-1 text-center transition-colors duration-200 hover:border-black text-sm lg:text-[16px]' href={`/tienda/${category.slug}`}>{category.category}</Link>
                        ))
                      }
                      <button className='w-full text-sm text-white rounded tracking-wide py-1.5 bg-main border border-main transition-colors duration-200 hover:bg-transparent hover:text-main'>Ir a la tienda</button>
                    </div>
                  </div>
                </div>
                { children }
                <div className='flex pl-4 pr-4 pt-14 pb-24 z-40 bg-neutral-900'>
                  <div className='w-[1280px] m-auto'>
                    <div className='flex gap-4 justify-between flex-wrap pb-6 border-b'>
                      <div>
                        <button className='text-white text-3xl font-medium'>TIENDA</button>
                        <p className='text-white mb-4 text-sm'>contacto@tienda.cl</p>
                        <div className='flex gap-4'>
                          <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></button>
                          <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></button>
                          <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-white text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg></button>
                        </div>
                      </div>
                      <div>
                        <h3 className='text-white mb-2'>TIENDA</h3>
                        <button className='block text-white text-sm mb-1'>Productos</button>
                        <button className='block text-white text-sm mb-1'>Lorem ipsum</button>
                      </div>
                      <div>
                        <h3 className='text-white mb-2'>POLITICAS</h3>
                        <button className='block text-white text-sm mb-1'>Terminos y condiciones</button>
                        <button className='block text-white text-sm mb-1'>Politicas de privacidad</button>
                        <button className='block text-white text-sm mb-1'>Politicas de devoluciones y reembolsos</button>
                        <button className='block text-white text-sm mb-1'>Politicas de envío</button>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <span className='text-white text-sm'>© 2023 Tienda. Todos los derechos reservados</span>
                    </div>
                  </div>
                </div>
    </>
  )
}
