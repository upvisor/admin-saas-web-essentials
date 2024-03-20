import { IProduct, IProductPage } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./OtherProductSlider.module.css"
import { Navigation, Pagination } from "swiper/modules"
import { NumberFormat } from '@/utils'
import { ShippingPrice } from '.'

export const PageProduct = ({ productsOrder, productPage }: { productsOrder: IProduct[] | undefined, productPage: IProductPage[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex p-4'>
                <div className='block m-auto w-full max-w-[1600px] gap-4 lg:flex xl2:gap-8'>
                  <div className='w-full lg:w-7/12'>
                    <div className='mb-2'>
                      <span className='text-15'><Link href='/tienda'>Tienda</Link> / <Link href={`/tienda/${ productsOrder![0].category.slug }`}>{ productsOrder![0].category.category }</Link> / <Link href={`/tienda/${productsOrder![0].category.slug}/${ productsOrder![0]?.slug }`}>{ productsOrder![0].name }</Link></span>
                    </div>
                    <div className='relative top-0 mb-0 lg:mb-5 lg:sticky lg:top-32'>
                      <Swiper
                        className={styles.mySwiper}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination, Navigation]}
                      >
                        {
                          productsOrder![0].images.map(image => {
                            return (
                            <SwiperSlide key={ image.public_id }>
                                <Image src={image.url} alt='Imagen producto' width={650} height={650} className={`m-auto w-full h-auto max-w-2xl rounded-2xl`} />
                            </SwiperSlide>
                            )
                          })
                        }
                      </Swiper>
                    </div>
                  </div>
                  <div className='w-full mt-2 lg:w-5/12 lg:mt-11'>
                    <h1 className={`transition-opacity duration-200 text-[25px] font-medium md:text-[32px]`}>{ productsOrder![0].name }</h1>
                    {
                      productPage[0].reviews
                        ? (
                          <div className="w-fit h-fit cursor-pointer">
                            <div className='flex gap-1 mb-2'>
                              <span className='mr-1 text-[#444444] text-[14px] dark:text-neutral-400'>0</span>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                            </div>
                          </div>
                        )
                        : ''
                    }
                    
                    <div className='flex gap-2 mb-2'>
                      <span className='text-[16px] font-medium dark:text-white'>${ productsOrder![0].price ? NumberFormat(productsOrder![0].price) : '' }</span>
                      {
                        productsOrder![0].beforePrice
                          ? <span className='text-sm line-through dark:text-neutral-400'>${ NumberFormat(productsOrder![0].beforePrice) }</span>
                          : ''
                      }
                    </div>
                      <span className='mb-2 text-[14px] block dark:text-neutral-400'><span className='font-medium dark:text-white'>Stock:</span> { productsOrder![0].stock } { productsOrder![0].stock === 1 ? 'unidad' : 'unidades' }</span>
                      {
                        productsOrder![0].quantityOffers?.length && productsOrder![0].quantityOffers[0].descount
                          ? (
                            <div className='mb-2 bg-[#f5f5f7] p-3 rounded-md w-fit'>
                              <p className='text-sm mb-2'>Descuentos por cantidad</p>
                              <div className='flex gap-2'>
                                {
                                  productsOrder![0].quantityOffers.map(offer => (
                                    <div key={offer._id} className=' rounded w-20 flex flex-col'>
                                      <p className='text-sm m-auto'>{offer.quantity}+</p>
                                      <p className='text-sm m-auto'>${NumberFormat(Math.round((productsOrder![0].price / 100) * (100 - offer.descount)))}</p>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          )
                          : ''
                      }
                      <div className='flex gap-2'>
                        <div className='border rounded-md border-[#0071e3] w-fit flex bg-white dark:bg-transparent'>
                          <button className='pl-3 pr-3 text-[#0071e3] text-sm'>-</button>
                          <span className='mt-auto mb-auto text-[#0071e3] w-4 text-center text-sm'>1</span>
                          <button className='pl-3 pr-3 text-[#0071e3] text-sm'>+</button>
                        </div>
                        <button className='py-2 h-fit w-56 rounded-md transition-all duration-200 border border-[#0071e3] bg-[#0071e3] text-white hover:bg-transparent hover:text-[#0071e3]'>Añadir al carrito</button>
                      </div>
                    <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                      <button className='flex gap-2 w-full justify-between'>
                        <h5 className='text-[16px] font-medium md:text-[18px] dark:text-white'>Descripción</h5>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={` -rotate-90 transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
                      </button>
                      <div style={{ overflow: 'hidden', transition: 'max-height 0.3s' }} className={`transition-all duration-200 flex flex-col gap-2 mt-2`}>
                        {productsOrder![0].description.split('/').map(des => {
                          return <p className='text-[#444444] mb-1 text-sm dark:text-neutral-400 md:text-[16px]' key={des}>{des}</p>
                        })}
                      </div>
                    </div>
                    <ShippingPrice />
                    {
                      productPage[0].title !== '' || productPage[0].text !== ''
                        ? (
                          <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                            <button className='flex gap-2 w-full justify-between'>
                              <h5 className='text-[16px] font-medium md:text-[18px] dark:text-white'>{productPage[0].title}</h5>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className={` -rotate-90 transition-all duration-150 ml-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
                            </button>
                            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s' }} className={`transition-all duration-200 flex flex-col gap-2 mt-2`}>
                              <p className='text-[#444444] mb-1 text-sm dark:text-neutral-400 md:text-[16px]'>{productPage[0].text}</p>
                            </div>
                          </div>
                        )
                        : ''
                    }
                  </div>
                </div>
              </div>
              {
                productPage[0].reviews
                  ? (
                    <div className='flex p-4'>
                      <div className='w-[1600px] m-auto'>
                        <h2 className="text-[20px] font-medium lg:text-[24px]">Evaluaciones de clientes</h2>
                        <span className='text-[14px] md:text-[16px] dark:text-neutral-400'>Valoracion media</span>
                        <div className='mt-2'>
                        <div className='flex gap-1'>
                          <span className='text-[#444444] dark:text-neutral-400'>0</span>
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg text-yellow-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
                        </div>
                        </div>
                      </div>
                    </div>
                  )
                  : ''
              }
            </div>
  )
}
