"use client"
import { ICategory, IPage, IProduct, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Image from 'next/image'
import { Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Bloque6, Categories, Contact, Layout, Products, Slider, Subscription } from '@/components/design'
import { Spinner2 } from '@/components/ui'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./Slider.module.css"
import { Pagination } from "swiper/modules"
import { NumberFormat } from '@/utils'

export default function Page () {

  const [part, setPart] = useState('')
  const [pages, setPages] = useState<IPage[]>([
    {
      page: 'Inicio',
      slug: '',
      header: true,
      design: [
        { content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: 'https://res.cloudinary.com/blasspod/image/upload/v1703351801/Upvisor/31314_pxhw9n.jpg' } }] } },
        { content: 'Categorias', info: { title: 'Categorias', descriptionView: true } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    },
    {
      page: 'Tienda',
      slug: 'tienda',
      header: true,
      design: [
        { content: 'Bloque 6', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', image: { public_id: '', url: '' } } },
        { content: 'Productos', info: { title: '' } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    },
    {
      page: 'Contacto',
      slug: 'contacto',
      header: true,
      design: [
        { content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    }
  ])
  const [header, setHeader] = useState({ topStrip: 'Lorem ipsum dolor sit amet consectetur' })
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)
  const [deletePopupLoading, setDeletePopupLoading] = useState(false)
  const [navCategoriesOpacity, setNavCategoriesOpacity] = useState('-mt-[330px]')
  const [mouseEnter, setMouseEnter] = useState(true)
  const [mouse, setMouse] = useState(-1)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [order, setOrder] = useState('Más recientes')
  const [productsOrder, setProductsOrder] = useState<IProduct[]>()
  const [edit, setEdit] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupPage, setPopupPage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newPage, setNewPage] = useState({ page: '', slug: '', header: false, design: [] })
  const [indexPage, setIndexPage] = useState(-1)

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    setStoreData(response.data)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getDesign = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    if (res.data.pages) {
      setPages(res.data.pages)
      setHeader(res.data.header)
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getCategories = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(res.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProductsOrder(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const orderProducts = () => {
    if (productsOrder?.length) {
      if (order === 'Más recientes') {
        const before = [...productsOrder!]
        before.sort((a, b) => (a.createdAt! < b.createdAt!) ? 1 : -1)
        setProductsOrder(before)
      }
      if (order === 'Mayor precio') {
        const before = [...productsOrder!]
        before.sort((a, b) => (a.price < b.price) ? 1 : -1)
        setProductsOrder(before)
      }
      if (order === 'Menor precio') {
        const before = [...productsOrder!]
        before.sort((a, b) => (a.price > b.price) ? 1 : -1)
        setProductsOrder(before)
      }
    }
  }

  useEffect(() => {
    orderProducts()
  }, [order])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages]
    const [removedItem] = newPages.splice(fromIndex, 1)
    newPages.splice(toIndex, 0, removedItem)
    return newPages;
  }

  const handleMoveDown = (index: number) => {
    if (index < pages.length - 1) {
      const updatedPages = moveItem(index, index + 1)
      setPages(updatedPages)
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedPages = moveItem(index, index - 1)
      setPages(updatedPages)
    }
  }

  const handleRemove = (index: number) => {
    const nuevoArray = [...pages]
    nuevoArray.splice(index, 1)
    setPages(nuevoArray)
  }

  const moveBlock = (pageIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedPages = [...pages]
    const blocks = updatedPages[pageIndex].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setPages(updatedPages)
  }

  return (
    <>
      <div onClick={() => {
        if (!popupPage.mouse) {
          setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupPage({ ...popupPage, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupPage.view} ${popupPage.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 bg-black/50 fixed z-50`}>
        <div onMouseEnter={() => setPopupPage({ ...popupPage, mouse: true })} onMouseLeave={() => setPopupPage({ ...popupPage, mouse: false })} className='p-6 bg-white m-auto rounded-md w-[500px] flex flex-col gap-4'>
          <h2 className='font-medium text-lg'>Nueva pagina</h2>
          <div className='flex flex-col gap-2'>
            <p>Nombre de la pagina</p>
            <input type='text' placeholder='Nombre' value={newPage.page} onChange={(e: any) => setNewPage({ ...newPage, page: e.target.value })} className='border p-1.5 rounded text-sm focus:outline-none focus:border-main' />
          </div>
          <div className='flex flex-col gap-2'>
            <p>Slug</p>
            <input type='text' placeholder='Slug' value={newPage.slug} onChange={(e: any) => setNewPage({ ...newPage, slug: e.target.value })} className='border p-1.5 rounded text-sm focus:outline-none focus:border-main' />
          </div>
          <button onClick={async () => {
            setLoading(true)
            const updatePages = [...pages]
            updatePages.push(newPage)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/design`, { pages: updatePages, header: header })
            setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
            getDesign()
            setTimeout(() => {
              setPopupPage({ ...popupPage, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
            setLoading(false)
          }} className='bg-main border border-main text-white transition-colors duration-200 rounded h-9 hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Agregar pagina'}</button>
        </div>
      </div>
      <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 bg-black/50 fixed z-50`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='p-6 bg-white h-[550px] m-auto rounded-md w-[800px] flex flex-col gap-4'>
          <h2 className='font-medium text-lg'>Bloques de contenidos</h2>
          <div className='flex flex-wrap gap-4 overflow-y-auto'>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: 'https://res.cloudinary.com/blasspod/image/upload/v1703351801/Upvisor/31314_pxhw9n.jpg' } }] } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703355526/Upvisor/Slider_z5ek7i.png' />
              <p className="m-auto">Carrusel</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="cursor-pointer" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1707670358/Upvisor/Categorias_myqwu1.jpg' />
              <p className="m-auto">Categorias</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: '' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703356278/Upvisor/Bloque_1_rinnyz.png' />
              <p className="m-auto">Bloque 1</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: '' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703356278/Upvisor/Bloque_2_qtaawq.png' />
              <p className="m-auto">Bloque 2</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: { public_id: '', url: '' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703356278/Upvisor/Bloque_3_uo4yeh.png' />
              <p className="m-auto">Bloque 3</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: { public_id: '', url: '' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703355515/Upvisor/Bloque_4_g86xcz.png' />
              <p className="m-auto">Bloque 4</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: { public_id: '', url: '' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703356278/Upvisor/Bloque_5_fjap4h.png' />
              <p className="m-auto">Bloque 5</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Productos', info: { products: '' } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703533528/Upvisor/Productos_d1z6zm.png' />
              <p className="m-auto">Productos</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703534929/Upvisor/Contacto_m5sexm.png' />
              <p className="m-auto">Contacto</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703535400/Upvisor/Suscripci%C3%B3n_y46tv6.png' />
              <p className="m-auto">Suscripción</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Bloque 6', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', image: { public_id: '', url: 'https://res.cloudinary.com/blasspod/image/upload/v1703351801/Upvisor/31314_pxhw9n.jpg' } } })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1703535992/Upvisor/Bloque_6_odkcmf.png' />
              <p className="m-auto">Bloque 6</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Categorias 2', info: {} })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1710351770/Upvisor/asd_mpwht8.png' />
              <p className="m-auto">Categorias 2</p>
            </div>
            <div onClick={() => {
              const oldPages = [...pages]
              oldPages[indexPage].design.push({ content: 'Carrusel productos', info: {} })
              setPages(oldPages)
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className={`w-[355px] border p-2 rounded flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main hover:shadow-md hover:shadow-main/30`}>
              <Image className="border" width={397} height={190} draggable='false' alt="Imagen Slider" src='https://res.cloudinary.com/blasspod/image/upload/v1710383750/Upvisor/asssss_nwh16c.png' />
              <p className="m-auto">Carrusel productos</p>
            </div>
          </div>
        </div>
      </div>
      <Head>
        <title>Personalizar sitio web</title>
      </Head>
      <div className='flex h-full'>
        <div className='w-[350px] border-r flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-2 p-4'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <Link href='/diseno' className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></Link>
                  </div>
                  <h2 className='text-lg font-medium'>Paginas</h2>
                  {
                    pages.map((page, index) => (
                      <div key={page.slug} className='flex gap-4'>
                        <button onClick={() => setPart(page.page)} className='text-left w-full'>{page.page}</button>
                        <div className='flex gap-4'>
                          <div className='flex gap-2'>
                            <input type='checkbox' checked={page.header} onChange={(e: any) => {
                              const newPages = [...pages]
                              newPages[index].header = e.target.checked
                              setPages(newPages)
                            }} />
                            <p className='my-auto'>Header</p>
                          </div>
                          <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                          <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                          <button onClick={() => handleRemove(index)}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                        </div>
                      </div>
                      
                    ))
                  }
                  <button onClick={() => {
                    setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }} className='bg-main border border-main text-white transition-colors duration-200 rounded py-1.5 hover:bg-transparent hover:text-main'>Agregar pagina</button>
                </div>
              )
              : ''
          }
          {
            pages.map((page, i) => {
              if (part === page.page) {
                return (
                  <div key={page.slug} className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>{page.page}</h2>
                    <h3 className='font-medium'>Seo</h3>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta titulo</p>
                      <input type='text' placeholder='Meta titulo' value={page.metaTitle} onChange={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaTitle = e.target.value
                        setPages(oldPages)
                      }} className='border p-1.5 rounded text-sm focus:outline-none focus:border-main' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta descripción</p>
                      <textarea placeholder='Meta descripción' value={page.metaDescription} onChange={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaDescription = e.target.value
                        setPages(oldPages)
                      }} className='border p-1.5 rounded text-sm h-20 focus:outline-none focus:border-main' />
                    </div>
                  </div>
                )
              }
            })
          }
          <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t'>
            <button onClick={async () => {
              setLoading(true)
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/design`, { header: header, pages: pages })
              setLoading(false)
            }} className='bg-main border border-main text-white transition-colors duration-200 h-10 rounded hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Guardar'}</button>
            <button>Cancelar</button>
          </div>
        </div>
        {
          part === ''
            ? (
              <div className='h-full flex' style={{ width: 'calc(100% - 350px)' }}>
                <p className='m-auto'>Selecciona una pagina para editar</p>
              </div>
            )
            : ''
        }
        {
          pages.map((page, i) => {
            if (part === page.page) {
              return (
                <div key={page.slug} className='overflow-y-auto' style={{ width: 'calc(100% - 350px' }}>
                  <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} setNavCategoriesOpacity={setNavCategoriesOpacity} setMouseEnter={setMouseEnter} navCategoriesOpacity={navCategoriesOpacity} categories={categories} pages={pages}>
                  <div className='flex flex-col gap-4'>
                    {
                      page.design.length
                        ? page.design.map((design, index) => (
                          <div key={index}>
                            {
                                design.content === 'Carrusel'
                                  ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} />
                                  : design.content === 'Categorias'
                                    ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} i={i} />
                                    : design.content === 'Bloque 1'
                                      ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} i={i} />
                                      : design.content === 'Bloque 2'
                                        ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} i={i} />
                                        : design.content === 'Bloque 3'
                                          ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} i={i} />
                                          : design.content === 'Bloque 4'
                                            ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} i={i} />
                                            : design.content === 'Bloque 5'
                                              ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} i={i} />
                                              : design.content === 'Productos'
                                                ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} i={i} />
                                                : design.content === 'Contacto'
                                                  ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} i={i} />
                                                  : design.content === 'Suscripción'
                                                    ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} i={i} />
                                                    : design.content === 'Bloque 6'
                                                      ? <Bloque6 edit={edit} pages={pages} setPages={setPages} design={design} index={index} i={i} />
                                                      : design.content === 'Categorias 2'
                                                        ? (
                                                          <div className="w-full flex px-4 overflow-y-auto">
                                                            <div className="max-w-[1600px] m-auto flex gap-4">
                                                              <Link className={`hover:border-black transition-colors duration-200 py-1 px-4 border`} href='/tienda'>Todos los productos</Link>
                                                              {
                                                                categories.map(category => (
                                                                  <Link key={category._id} className={`hover:border-black py-1 px-4 border transition-colors duration-200`} href={`/tienda/${category.slug}`}>{ category.category }</Link>
                                                                ))
                                                              }
                                                            </div>
                                                          </div>
                                                        )
                                                        : design.content === 'Carrusel productos'
                                                          ? (
                                                            <div className='flex w-full p-4'>
                                                              <div className='m-auto w-full max-w-[1600px] relative items-center'>
                                                                <h2>{ design.info.title }</h2>
                                                                <Swiper
                                                                  className={styles.mySwiper}
                                                                  slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth > 850 ? 3 : 2}
                                                                  pagination={{
                                                                    clickable: true,
                                                                  }}
                                                                  modules={[Pagination]}
                                                                >
                                                                  {
                                                                    productsOrder?.map(product => (
                                                                      <SwiperSlide key={product._id} className='m-auto'>
                                                                        <div className="flex flex-col gap-1 m-auto w-40 lg:w-60">
                                                                          <Link className="w-fit" href=''><Image className="w-40 lg:w-60 rounded-lg" src={product.images[0].url} alt={`Imagen producto ${product.name}`} width={500} height={500} /></Link>
                                                                          <Link href={`/tienda/${product.category.slug}/${product.slug}`}><p className="font-medium text-sm lg:text-[16px]">{product.name}</p></Link>
                                                                          <div className="flex gap-2">
                                                                            <p className="text-sm lg:text-[16px]">${NumberFormat(product.price)}</p>
                                                                            {
                                                                              product.beforePrice
                                                                                ? <p className="text-xs lg:text-sm line-through">${NumberFormat(product.beforePrice)}</p>
                                                                                : ''
                                                                            }
                                                                          </div>
                                                                        </div>
                                                                        <div className='h-8' />
                                                                      </SwiperSlide>
                                                                    ))
                                                                  }
                                                                </Swiper>
                                                              </div>
                                                            </div>
                                                          )
                                                          : 'Error'
                                }
                                <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                  <p className='my-auto font-medium'>{design.content}</p>
                                  {
                                    edit === design.content
                                      ? <button className='py-1.5 px-6 border border-main bg-main text-white rounded transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={() => setEdit('')}>Guardar</button>
                                      : <button className='py-1.5 px-6 border border-main bg-main text-white rounded transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={() => setEdit(design.content)}>Editar</button>
                                  }
                                  <button onClick={() => {
                                    const oldPages = [...pages]
                                    oldPages[i].design.splice(index, 1)
                                    setPages(oldPages)
                                  }} className='p-1.5 border border-red-600 bg-red-600 text-white rounded transition-colors duration-200 hover:bg-transparent hover:text-red-600'>Eliminar</button>
                                  <button onClick={() => moveBlock(i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                  <button onClick={() => moveBlock(i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                </div>
                          </div>
                        ))
                        : (
                          <div className='py-10 flex'>
                            <button onClick={() => {
                              setIndexPage(i)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} className='m-auto bg-main border border-main transition-colors duration-200 rounded text-white px-8 py-2 hover:bg-transparent hover:text-main'>Agregar bloque de contenido</button>
                          </div>
                        )
                    }
                    {
                      page.design.length
                        ? (
                          <div className='py-10 flex'>
                            <button onClick={() => {
                              setIndexPage(i)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} className='m-auto bg-main border border-main transition-colors duration-200 rounded text-white px-8 py-2 hover:bg-transparent hover:text-main'>Agregar bloque de contenido</button>
                          </div>
                        )
                        : ''
                    }
                  </div>
                  </Layout>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}