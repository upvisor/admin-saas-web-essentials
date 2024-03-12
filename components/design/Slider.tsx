import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from "./Slider.module.css"
import { Navigation, Pagination } from "swiper/modules"
import axios from 'axios'

interface Props {
    design: any
    edit: any
    pages: any
    setPages: any
    index: number
    ind: number
}

export const Slider: React.FC<Props> = ({ design, edit, pages, setPages, index, ind }) => {
  return (
    <div>
                                      <Swiper
                                        className={styles.mySwiper}
                                        slidesPerView={1}
                                        loop={true}
                                        pagination={{
                                          clickable: true,
                                        }}
                                        modules={[Pagination, Navigation]}
                                      >
                                        {
                                          design.info.banner?.length
                                            ? design.info.banner.map((banner: any, i: number) => (
                                              <SwiperSlide key={banner}>
                                                <div className={`flex h-[450px] md:h-[550px] 2xl:h-[700px]`}>
                                                  {
                                                    edit !== 'Carrusel'
                                                      ? (
                                                        <>
                                                          <div className="m-auto w-full p-4">
                                                            <div className='max-w-[1600px] w-full m-auto flex flex-col gap-4'>
                                                              <h1 className='text-[25px] font-medium lg:text-[32px] text-white'>{banner.title}</h1>
                                                              <p className={`text-white text-sm lg:text-[16px]`}>{banner.description}</p>
                                                              <button className='px-8 py-1.5 w-fit bg-main border border-main text-white transition-colors duration-200 rounded-md hover:bg-transparent hover:text-main'>{banner.button}</button>
                                                            </div>
                                                          </div>
                                                          <Image width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10`} src={banner.image!.url} alt='banner' />
                                                        </>
                                                      )
                                                      : (
                                                        <>
                                                        <div className="m-auto w-full p-4">
                                                          <div className='max-w-[1600px] w-full m-auto flex flex-col gap-4'>
                                                            <input type='text' placeholder='Titulo' className='text-[25px] font-medium lg:text-[32px] text-white bg-transparent border p-1.5 border-neutral-500 rounded w-[800px]' value={banner.title} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              if (oldPages[ind].design[index].info.banner?.length) {
                                                                oldPages[ind].design[index].info.banner![i].title = e.target.value
                                                                setPages(oldPages)
                                                              }
                                                            }} />
                                                            <input type='text' placeholder='Desctipción' className='text-white text-sm lg:text-[16px] rounded bg-transparent border border-neutral-500 p-1.5' value={banner.description} onChange={(e: any) => {
                                                              const oldPages = [...pages]
                                                              if (oldPages[ind].design[index].info.banner?.length) {
                                                                oldPages[ind].design[index].info.banner![i].description = e.target.value
                                                                setPages(oldPages)
                                                              }
                                                            }} />
                                                            <div className='flex gap-4'>
                                                              <div className='px-8 py-1.5 bg-main border border-main text-white rounded-md'>
                                                                <input type='text' placeholder='Boton' className='bg-main text-white border border-neutral-500 rounded' value={banner.button} onChange={(e: any) => {
                                                                  const oldPages = [...pages]
                                                                  if (oldPages[ind].design[index].info.banner?.length) {
                                                                    oldPages[ind].design[index].info.banner![i].button = e.target.value
                                                                    setPages(oldPages)
                                                                  }
                                                                }} />
                                                              </div>
                                                              <input type='text' placeholder='Link boton' className='p-1.5 border rounded' value={banner.buttonLink} onChange={(e: any) => {
                                                                const oldPages = [...pages]
                                                                if (oldPages[ind].design[index].info.banner?.length) {
                                                                  oldPages[ind].design[index].info.banner![i].buttonLink = e.target.value
                                                                  setPages(oldPages)
                                                                }
                                                              }} />
                                                            </div>
                                                            <input type='file' className='m-auto text-white text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/40 file:text-white hover:file:bg-main/20' onChange={async (e: any) => {
                                                              const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
                                                                headers: {
                                                                  accept: 'application/json',
                                                                  'Accept-Language': 'en-US,en;q=0.8',
                                                                  'Content-Type': 'multipart/form-data'
                                                                }
                                                              })
                                                              const oldPages = [...pages]
                                                              oldPages[ind].design[index].info.banner![i].image = { public_id: data.image.public_id, url: data.image.url }
                                                              setPages(oldPages)
                                                            }} />
                                                            <button onClick={() => {
                                                              const oldPages = [...pages]
                                                              oldPages[ind].design[index].info.banner?.push({ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: 'https://res.cloudinary.com/blasspod/image/upload/v1703351801/Upvisor/31314_pxhw9n.jpg' } })
                                                              setPages(oldPages)
                                                            }} className='px-6 py-1.5 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main w-fit'>Agregar banner</button>
                                                          </div>
                                                        </div>
                                                        <Image width={1920} height={1080} className={`absolute object-cover h-full w-full -z-10`} src={banner.image!.url} alt='banner' />
                                                        </>
                                                      )
                                                  }
                                                  
                                                </div>
                                              </SwiperSlide>
                                            ))
                                            : ''
                                        }
                                      </Swiper>
                                    </div>
  )
}
