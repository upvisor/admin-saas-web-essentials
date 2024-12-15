"use client"
import { Design, ICall, IForm, IFunnel, IPage, IPopupWeb, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Image from 'next/image'
import { Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Call, Contact, Layout, Lead1, PopupNewCall, PopupNewForm, PopupNewPage, PopupPagesBlocks, Slider, Subscription, Video, PopupDeleteFunnel, PopupDeletePage, Bloque7, Checkout, Calls, Lead2, Services, Plans, Faq, Blocks, Reviews, Form } from '@/components/design'
import { Button, Button2, ButtonSecondary2, ButtonSubmit, Input, Select, Spinner, Textarea } from '@/components/ui'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { PopupNewFunnel } from '@/components/funnels'
import { IoLaptopOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { PopupNewService } from '@/components/service'
import { SlMenu } from 'react-icons/sl'
import { GrClose } from 'react-icons/gr'

export default function Page () {

  const [part, setPart] = useState('')
  const [step, setStep] = useState('')
  const [pages, setPages] = useState<IPage[]>([
    {
      page: 'Inicio',
      slug: '',
      header: true,
      design: [
        { content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: 'https://web-upvisor.b-cdn.net/Imagen%20prueba.jpg' }] } },
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
  const [popupWeb, setPopupWeb] = useState<IPopupWeb>({ active: false, wait: 5, title: '', description: '' })
  const [color, setColor] = useState('#000000')
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)
  const [deletePopupLoading, setDeletePopupLoading] = useState(false)
  const [navCategoriesOpacity, setNavCategoriesOpacity] = useState('-mt-[330px]')
  const [mouseEnter, setMouseEnter] = useState(true)
  const [mouse, setMouse] = useState(-1)
  const [order, setOrder] = useState('Más recientes')
  const [edit, setEdit] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupCategory, setPopupCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupPage, setPopupPage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newPage, setNewPage] = useState({ page: '', slug: '', header: false, design: [] })
  const [indexPage, setIndexPage] = useState(-1)
  const [indexStep, setIndexStep] = useState(-1)
  const [title, setTitle] = useState('')
  const [forms, setForms] = useState<IForm[]>()
  const [popupForm, setPopupForm] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleForm, setTitleForm] = useState('')
  const [newForm, setNewForm] = useState<IForm>({ nameForm: '', informations: [{ icon: '', text: '' }], labels: [{ data: '', name: '', text: '', type: '' }], button: '', action: 'Ir a una pagina', tags: [] })
  const [popupDeletePage, setPopupDeletePage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [selectPage, setSelectPage] = useState<IPage>()
  const [responsive, setResponsive] = useState('calc(100%-350px)')
  const [id, setId] = useState<string>()
  const [error, setError] = useState('')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  const [clientData, setClientData] = useState([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [type, setType] = useState('')
  const [menu, setMenu] = useState('hidden')
  const [style, setStyle] = useState({ design: 'Borde', form: 'Redondeadas', primary: '', secondary: '', button: '#111111' })
  const [popupWhatsapp, setPopupWhatsapp] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [whatsapp, setWhatsapp] = useState(false)

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    setStoreData(response.data)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getDesign = async () => {
    const { data }: { data: Design } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    setId(data._id)
    if (data.pages) {
      setPages(data.pages)
      setHeader(data.header)
      setWhatsapp(data.whatsapp)
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getForms = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forms`)
    setForms(res.data)
  }

  useEffect(() => {
    getForms()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const getStyle = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`)
    setStyle(res.data)
  }

  useEffect(() => {
    getStyle()
  }, [])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages]
    const [removedItem] = newPages.splice(fromIndex, 1)
    newPages.splice(toIndex, 0, removedItem)
    return newPages;
  }

  const handleMoveDown = async (index: number) => {
    if (index < pages.length - 1) {
      const updatedPages = moveItem(index, index + 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages })
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index > 0) {
      const updatedPages = moveItem(index, index - 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages })
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
      <PopupNewForm popupForm={popupForm} setPopupForm={setPopupForm} titleForm={titleForm} newForm={newForm} setNewForm={setNewForm} getForms={getForms} tags={tags} getTags={getTags} error={error} setError={setError} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} />
      <PopupNewPage popupPage={popupPage} setPopupPage={setPopupPage} setLoading={setLoading} getDesign={getDesign} loading={loading} setNewPage={setNewPage} newPage={newPage} pages={pages} header={header} error={error} setError={setError} />
      <PopupPagesBlocks popup={popup} setPopup={setPopup} pages={pages} indexPage={indexPage} indexStep={indexStep} setPages={setPages} />
      <PopupDeletePage popupDeletePage={popupDeletePage} setPopupDeletePage={setPopupDeletePage} getPages={getDesign} page={selectPage} pages={pages} header={header} color={color} popupWeb={popupWeb} />
      <Head>
        <title>Personalizar sitio web</title>
      </Head>
      <div className='flex h-full bg-white dark:bg-neutral-900'>
        <div className='p-4 fixed flex lg:hidden'>
          <button onClick={(e: any) => {
            e.preventDefault()
            if (menu === 'hidden') {
              setMenu('flex')
            } else {
              setMenu('hidden')
            }
          }} className='h-fit'>{menu === 'hidden' ? <SlMenu className='text-lg' /> : <GrClose className='text-lg' />}</button>
        </div>
        <div className={`${menu} z-50 bg-white flex flex-col gap-4 fixed p-4 overflow-y-auto lg:hidden`} style={{ height: 'calc(100% - 49px)' }}>
          <button onClick={(e: any) => {
            e.preventDefault()
            if (menu === 'hidden') {
              setMenu('flex')
            } else {
              setMenu('hidden')
            }
          }} className='h-fit'>{menu === 'hidden' ? <SlMenu className='text-lg' /> : <GrClose className='text-lg' />}</button>
          <div className='w-[350px] flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
            {
              part === ''
                ? (
                  <div className='flex flex-col gap-4'>
                    <h2 className='text-lg font-medium'>Paginas</h2>
                    <div className='flex flex-col gap-2'>
                      {
                        pages.map((page, index) => (
                          <div key={page.slug} className='flex gap-4'>
                            <button onClick={() => {
                              setType('Page')
                              setMenu('hidden')
                              setPart(page.page)
                            }} className='text-left w-full'>{page.page}</button>
                            <div className='flex gap-2'>
                              <div className='flex gap-1'>
                                <input type='checkbox' checked={page.header} onChange={async (e: any) => {
                                  const newPages = [...pages]
                                  newPages[index].header = e.target.checked
                                  setPages(newPages)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                }} />
                                <p className='my-auto'>Menu</p>
                              </div>
                              {
                                page.header === true
                                  ? (
                                    <div className='flex gap-1'>
                                      <input type='checkbox' checked={page.button === true ? true : false} onChange={async (e: any) => {
                                        const newPages = [...pages]
                                        newPages[index].button = e.target.checked
                                        setPages(newPages)
                                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                      }} />
                                      <p className='my-auto'>Boton</p>
                                    </div>
                                  )
                                  : ''
                              }
                              <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                              <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                              <button onClick={(e: any) => {
                                e.preventDefault()
                                setSelectPage(page)
                                setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Button2 action={() => {
                        setError('')
                        setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }} color='main' config='w-full'>Agregar pagina</Button2>
                      <button onClick={(e: any) => setPart('Estilo')} className='mt-2 text-sm'>Editar estilo del sitio web</button>
                    </div>
                  </div>
                )
                : ''
            }
            {
              pages.map((page, i) => {
                if (part === page.page && type === 'Page') {
                  return (
                    <div key={page.slug} className='flex flex-col gap-4 mb-[104px]'>
                      <div className='border-b pb-4 dark:border-neutral-700'>
                        <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                      </div>
                      <h2 className='text-lg font-medium'>{page.page}</h2>
                      <h3 className='font-medium'>Seo</h3>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta titulo</p>
                        <Input placeholder='Meta titulo' value={page.metaTitle} change={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].metaTitle = e.target.value
                          setPages(oldPages)
                        }} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta descripción</p>
                        <Textarea placeholder='Meta descripción' value={page.metaDescription!} change={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].metaDescription = e.target.value
                          setPages(oldPages)
                        }} />
                      </div>
                      <input type='file' onChange={async (e: any) => {
                        if (!loadingImage) {
                          setLoadingImage(true)
                          setErrorImage('')
                          const formData = new FormData();
                          formData.append('image', e.target.files[0]);
                          formData.append('name', e.target.files[0].name);
                          try {
                            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                              headers: {
                                accept: 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8'
                              }
                            })
                            const oldPages = [...pages]
                            oldPages[i].image = data
                            setPages(oldPages)
                            setLoadingImage(false)
                          } catch (error) {
                            setLoadingImage(false)
                            setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                          }
                        }
                      }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                      {
                        loadingImage
                          ? (
                            <div className='flex w-full'>
                              <div className='w-fit m-auto'>
                                <Spinner />
                              </div>
                            </div>
                          )
                          : page.image && page.image !== ''
                            ? <Image src={page.image} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                            : ''
                      }
                    </div>
                  )
                }
              })
            }
            {
              part === 'Estilo'
                ? (
                  <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Estilo del sitio web</h2>
                    <div className='flex flex-col gap-2'>
                      <p>Tipo de diseño</p>
                      <Select change={(e: any) => setStyle({ ...style, design: e.target.value })} value={style?.design}>
                        <option>Borde</option>
                        <option>Sombreado</option>
                      </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Tipo de formas</p>
                      <Select change={(e: any) => setStyle({ ...style, form: e.target.value })} value={style?.form}>
                        <option>Redondeadas</option>
                        <option>Cuadradas</option>
                      </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color principal</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, primary: e.target.value })} value={style?.primary} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color segundario</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, secondary: e.target.value })} value={style?.secondary} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color texto botom</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, button: e.target.value })} value={style?.button} />
                    </div>
                  </div>
                )
                : ''
            }
            {
              pages.map((page, i) => {
                if (part === page.page && type === 'Page') {
                  return (
                    <div key={page._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                      <ButtonSubmit action={async () => {
                        if (!loading) {
                          setLoading(true)
                          if (id) {
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/page/${id}`, page)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header })
                          }
                          setLoading(false)
                        }
                      }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                      <button className='text-sm'>Cancelar</button>
                    </div>
                  )
                }
              })
            }
            {
              part === 'Estilo'
                ? (
                  <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/style`, style)
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
                : ''
            }
          </div>
        </div>
        <div className='w-[350px] border-r hidden lg:flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-4 p-4'>
                  <h2 className='text-lg font-medium'>Paginas</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      pages.map((page, index) => (
                        <div className='flex flex-col gap-2'>
                          <div key={page.slug} className='flex gap-4' draggable onDragStart={() => setNewPage({ ...newPage, page: page.page, slug: page.slug })} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                            const oldPages = [...pages]
                            if (oldPages[index].subPage?.length) {
                              oldPages[index].subPage?.push({ page: newPage.page, slug: newPage.slug })
                            } else {
                              oldPages[index].subPage = [{ page: newPage.page, slug: newPage.slug }]
                            }
                            console.log(oldPages)
                            setPages(oldPages)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                          }}>
                            <button onClick={() => {
                              setType('Page')
                              setPart(page.page)
                            }} className='text-left w-full'>{page.page}</button>
                            <div className='flex gap-2'>
                              <div className='flex gap-1'>
                                <input type='checkbox' checked={page.header} onChange={async (e: any) => {
                                  const newPages = [...pages]
                                  newPages[index].header = e.target.checked
                                  setPages(newPages)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                }} />
                                <p className='my-auto'>Menu</p>
                              </div>
                              {
                                page.header === true
                                  ? (
                                    <div className='flex gap-1'>
                                      <input type='checkbox' checked={page.button === true ? true : false} onChange={async (e: any) => {
                                        const newPages = [...pages]
                                        newPages[index].button = e.target.checked
                                        setPages(newPages)
                                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                      }} />
                                      <p className='my-auto'>Boton</p>
                                    </div>
                                  )
                                  : ''
                              }
                              <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                              <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                              <button onClick={(e: any) => {
                                e.preventDefault()
                                setSelectPage(page)
                                setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                            </div>
                          </div>
                          {
                            page.subPage?.map((subPage, i) => (
                              <div className='flex gap-2 ml-10 justify-between'>
                                <p>{subPage.page}</p>
                                <button onClick={async (e: any) => {
                                  e.preventDefault()
                                  const oldPages = [...pages]
                                  oldPages[index].subPage?.splice(i, 1)
                                  setPages(oldPages)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                                }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Button2 action={() => {
                      setError('')
                      setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }} color='main' config='w-full'>Agregar pagina</Button2>
                    {
                      whatsapp
                        ? (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: false })
                            setWhatsapp(false)
                          }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl shadow-md shadow-red-500/30 transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Whatsapp</button>
                        )
                        : (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: true })
                            setWhatsapp(true)
                          }} className={`w-full bg-green-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl shadow-md shadow-green-500/30 transition-colors duration-300 hover:bg-green-500/80`}>Activar boton Whatsapp</button>
                        )
                    }
                    <button onClick={(e: any) => setPart('Estilo')} className='mt-2 text-sm'>Editar estilo del sitio web</button>
                  </div>
                </div>
              )
              : ''
          }
          {
            pages.map((page, i) => {
              if (part === page.page && type === 'Page') {
                return (
                  <div key={page.slug} className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>{page.page}</h2>
                    <h3 className='font-medium'>Seo</h3>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta titulo</p>
                      <Input placeholder='Meta titulo' value={page.metaTitle} change={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaTitle = e.target.value
                        setPages(oldPages)
                      }} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta descripción</p>
                      <Textarea placeholder='Meta descripción' value={page.metaDescription!} change={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaDescription = e.target.value
                        setPages(oldPages)
                      }} />
                    </div>
                    <input type='file' onChange={async (e: any) => {
                      if (!loadingImage) {
                        setLoadingImage(true)
                        setErrorImage('')
                        const formData = new FormData();
                        formData.append('image', e.target.files[0]);
                        formData.append('name', e.target.files[0].name);
                        try {
                          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                            headers: {
                              accept: 'application/json',
                              'Accept-Language': 'en-US,en;q=0.8'
                            }
                          })
                          const oldPages = [...pages]
                          oldPages[i].image = data
                          setPages(oldPages)
                          setLoadingImage(false)
                        } catch (error) {
                          setLoadingImage(false)
                          setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                        }
                      }
                    }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                    {
                      loadingImage
                        ? (
                          <div className='flex w-full'>
                            <div className='w-fit m-auto'>
                              <Spinner />
                            </div>
                          </div>
                        )
                        : page.image && page.image !== ''
                          ? <Image src={page.image} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                          : ''
                    }
                  </div>
                )
              }
            })
          }
          {
            part === 'Estilo'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Estilo del sitio web</h2>
                  <div className='flex flex-col gap-2'>
                    <p>Tipo de diseño</p>
                    <Select change={(e: any) => setStyle({ ...style, design: e.target.value })} value={style?.design}>
                      <option>Borde</option>
                      <option>Sombreado</option>
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Tipo de formas</p>
                    <Select change={(e: any) => setStyle({ ...style, form: e.target.value })} value={style?.form}>
                      <option>Redondeadas</option>
                      <option>Cuadradas</option>
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color principal</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, primary: e.target.value })} value={style?.primary} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color segundario</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, secondary: e.target.value })} value={style?.secondary} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color texto botom</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, button: e.target.value })} value={style?.button} />
                  </div>
                </div>
              )
              : ''
          }
          {
            pages.map((page, i) => {
              if (part === page.page && type === 'Page') {
                return (
                  <div key={page._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/page/${id}`, page)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, whatsapp: whatsapp })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
              }
            })
          }
          {
            part === 'Estilo'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/style`, style)
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
        </div>
        {
          part === ''
            ? (
              <div className='h-full flex w-full lg:w-[calc(100%-350px)] dark:bg-neutral-900'>
                <p className='m-auto'>Selecciona una pagina para editar</p>
              </div>
            )
            : ''
        }
        {
          pages.map((page, i) => {
            if (part === page.page && type === 'Page') {
              return (
                <div key={page._id} className={`m-auto h-full bg-white text-black w-full lg:w-[${responsive}]`}>
                  <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                    <div className='flex gap-4 w-fit m-auto'>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        setResponsive('calc(100%-350px')
                      }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                      <button  onClick={(e: any) => {
                        e.preventDefault()
                        setResponsive('400px')
                      }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                    </div>
                  </div>
                  <div className='overflow-y-auto bg-white' style={{ height: 'calc(100% - 75px)' }}>
                    <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive}>
                      <div className='flex flex-col gap-4'>
                        {
                          page.design.length
                            ? page.design.map((design, index) => (
                              <div key={index}>
                                {
                                  design.content === 'Carrusel'
                                    ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                    : design.content === 'Bloque 1'
                                      ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                      : design.content === 'Bloque 2'
                                        ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                        : design.content === 'Bloque 3'
                                          ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                          : design.content === 'Bloque 4'
                                            ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                            : design.content === 'Bloque 5'
                                              ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} forms={forms} />
                                              : design.content === 'Contacto'
                                                ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} responsive={responsive} />
                                                : design.content === 'Suscripción'
                                                  ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} responsive={responsive} />
                                                  : design.content === 'Lead 1'
                                                    ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                    : design.content === 'Video'
                                                      ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} />
                                                      : design.content === 'Bloque 7'
                                                        ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} />
                                                        : design.content === 'Lead 2'
                                                          ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                          : design.content === 'Preguntas frecuentes'
                                                            ? <Faq edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} />
                                                            : design.content === 'Bloques'
                                                              ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} />
                                                              : design.content === 'Reseñas'
                                                                ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} />
                                                                : design.content === 'Formulario'
                                                                  ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} />
                                                                  : ''
                                }
                                <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                  <p className='my-auto font-medium'>{design.content}</p>
                                  {
                                    edit === design.content
                                      ? <Button2 action={() => setEdit('')} color='main'>Guardar</Button2>
                                      : <Button2 action={() => setEdit(design.content)} color='main'>Editar</Button2>
                                  }
                                  <Button2 action={() => {
                                    const oldPages = [...pages]
                                    oldPages[i].design.splice(index, 1)
                                    setPages(oldPages)
                                  }} color='red-500'>Eliminar bloque</Button2>
                                  <button onClick={() => moveBlock(i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                  <button onClick={() => moveBlock(i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                </div>
                              </div>
                            ))
                            : (
                              <div className='py-10 flex'>
                                <Button action={() => {
                                  setIndexPage(i)
                                  setIndexStep(-1)
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }} config='m-auto'>Agregar bloque de contenido</Button>
                              </div>
                            )
                        }
                        {
                          page.design.length
                            ? (
                              <div className='py-10 flex'>
                                <Button action={() => {
                                  setIndexPage(i)
                                  setIndexStep(-1)
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }} config='m-auto'>Agregar bloque de contenido</Button>
                              </div>
                            )
                            : ''
                        }
                      </div>
                    </Layout>
                  </div>
                </div>
              )
            }
          })
        }
        {
          part === 'Estilo'
            ? (
              <div className='w-full lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`${style?.design === 'Borde' ? 'border-b' : style?.design === 'Sombreado' ? 'border-b border-black/5' : ''} w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? '0px 0px 10px 0px #11111115' :'' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button }}>Hablemos</p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-4 px-4 py-12'>
                  <p className='text-center m-auto text-4xl font-semibold'>Lorem ipsum</p>
                  <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptatem dolorum deleniti doloremque nulla? Dolore, error assumenda. Repellendus similique natus ut accusamus ipsa voluptatem nostrum, eos, quidem sed, non reiciendis.</p>
                  <div className='flex gap-4 justify-around flex-wrap'>
                    <div className={`${style?.design === 'Borde' ? 'border' : style?.design === 'Sombreado' ? 'border border-black/5' : ''} ${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' :'' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button }}>Lorem ipsum</button>
                    </div>
                    <div className={`${style?.design === 'Borde' ? 'border' : style?.design === 'Sombreado' ? 'border border-black/5' : ''} ${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' :'' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button }}>Lorem ipsum</button>
                    </div>
                    <div className={`${style?.design === 'Borde' ? 'border' : style?.design === 'Sombreado' ? 'border border-black/5' : ''} ${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' :'' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button }}>Lorem ipsum</button>
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 py-12 flex flex-col gap-4'>
                  <p className='text-2xl font-medium text-center m-auto'>Lorem ipsum dolor sit amet</p>
                  <div className='flex gap-2'>
                    <input className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} w-full border px-2`} placeholder='Email' />
                    <button className={`${style?.form === 'Redondeadas' ? 'rounded-xl' : ''} m-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button }}>Envíar</button>
                  </div>
                </div>
              </div>
            )
            : ''
        }
      </div>
    </>
  )
}