"use client"
import { Design, ICall, IForm, IFunnel, IPage, IPopupWeb, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Image from 'next/image'
import { Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Call, Contact, Layout, Lead1, PopupNewCall, PopupNewForm, PopupNewPage, PopupPagesBlocks, Slider, Subscription, Video, PopupDeleteFunnel, PopupDeletePage, Bloque7, Checkout, Calls, Lead2, Services, Plans } from '@/components/design'
import { Button, Button2, ButtonSecondary2, ButtonSubmit, Input, Select, Spinner, Textarea } from '@/components/ui'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { PopupNewFunnel } from '@/components/funnels'
import { IoLaptopOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { PopupNewService } from '@/components/service'

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
  const [indexFunnel, setIndexFunnel] = useState(-1)
  const [indexStep, setIndexStep] = useState(-1)
  const [selectFunnel, setSelectFunnel] = useState<IFunnel>()
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [newFunnel, setNewFunnel] = useState<IFunnel>({ funnel: '', slug: '', steps: [{ step: '', slug: '' }] })
  const [title, setTitle] = useState('')
  const [popupNewFunnel, setPopupNewFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [forms, setForms] = useState<IForm[]>()
  const [popupForm, setPopupForm] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleForm, setTitleForm] = useState('')
  const [newForm, setNewForm] = useState<IForm>({ nameForm: '', informations: [{ icon: '', text: '' }], labels: [{ data: '', name: '', text: '' }], button: '', action: 'Ir a una pagina', tags: [] })
  const [calls, setCalls] = useState<ICall[]>()
  const [newCall, setNewCall] = useState<ICall>({ nameMeeting: '', duration: '15 minutos', labels: [{ data: '', name: '', text: '' }], buttonText: '', tags: [], action: 'Mostrar mensaje' })
  const [popupCall, setPopupCall] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleMeeting, setTitleMeeting] = useState('')
  const [popupDeletePage, setPopupDeletePage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDeleteFunnel, setPopupDeleteFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [selectPage, setSelectPage] = useState<IPage>()
  const [responsive, setResponsive] = useState('calc(100% - 350px)')
  const [id, setId] = useState<string>()
  const [error, setError] = useState('')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  const [clientData, setClientData] = useState([])
  const [services, setServices] = useState<IService[]>([])
  const [popupService, setPopupService] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunctionality, setNewFunctionality] = useState('')
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [loadingService, setLoadingService] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [selectService, setSelectService] = useState<IService>()
  const [indexService, setIndexService] = useState(-1)
  const [indexStepService, setIndexStepService] = useState(-1)
  const [type, setType] = useState('')

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
      if (data.popup) {
        setPopupWeb(data.popup)
      }
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getFunnels = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const getForms = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forms`)
    setForms(res.data)
  }

  useEffect(() => {
    getForms()
  }, [])

  const getCalls = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
    setCalls(res.data)
  }

  useEffect(() => {
    getCalls()
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

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
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

  const moveBlockFunnel = (funnelIndex: number, stepIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedFunnels = [...funnels]
    const blocks = updatedFunnels[funnelIndex].steps[stepIndex].design
    const temp = blocks![blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks![blockIndex] = blocks![blockIndex - 1]
      blocks![blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks!.length - 1) {
      blocks![blockIndex] = blocks![blockIndex + 1]
      blocks![blockIndex + 1] = temp
    }
    setFunnels(updatedFunnels)
  }

  return (
    <>
      <PopupNewFunnel popup={popupNewFunnel} setPopup={setPopupNewFunnel} getFunnels={getFunnels} newFunnel={newFunnel!} setNewFunnel={setNewFunnel} selectFunnel={selectFunnel!} title={title} error={error} setError={setError} services={services} />
      <PopupNewPage popupPage={popupPage} setPopupPage={setPopupPage} setLoading={setLoading} getDesign={getDesign} loading={loading} setNewPage={setNewPage} newPage={newPage} pages={pages} header={header} error={error} setError={setError} />
      <PopupPagesBlocks popup={popup} setPopup={setPopup} pages={pages} indexPage={indexPage} indexFunnel={indexFunnel} indexStep={indexStep} indexService={indexService} indexStepService={indexStepService} setPages={setPages} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
      <PopupNewForm popupForm={popupForm} setPopupForm={setPopupForm} titleForm={titleForm} newForm={newForm} setNewForm={setNewForm} getForms={getForms} tags={tags} funnels={funnels} getTags={getTags} error={error} setError={setError} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} />
      <PopupNewCall popupCall={popupCall} setPopupCall={setPopupCall} titleMeeting={titleMeeting} newCall={newCall} setNewCall={setNewCall} getCalls={getCalls} tags={tags} getTags={getTags} error={error} setError={setError} funnels={funnels} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} />
      <PopupDeleteFunnel popupDeleteFunnel={popupDeleteFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} selectFunnel={selectFunnel!} setFunnels={setFunnels} getFunnels={getFunnels} />
      <PopupDeletePage popupDeletePage={popupDeletePage} setPopupDeletePage={setPopupDeletePage} getPages={getDesign} page={selectPage} pages={pages} header={header} color={color} popupWeb={popupWeb} />
      <PopupNewService popupService={popupService} setPopupService={setPopupService} newService={newService} setNewService={setNewService} loadingService={loadingService} setLoadingService={setLoadingService} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} />
      <Head>
        <title>Personalizar sitio web</title>
      </Head>
      <div className='flex h-full bg-white dark:bg-neutral-900'>
        <div className='w-[350px] border-r flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-4 p-4'>
                  <h2 className='text-lg font-medium'>Paginas</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      pages.map((page, index) => (
                        <div key={page.slug} className='flex gap-4'>
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
                      ))
                    }
                    <div className='flex gap-4'>
                      <button onClick={() => setPart('Popup')} className='text-left w-full'>Popup</button>
                    </div>
                  </div>
                  <h2 className='text-lg font-medium'>Embudos</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      funnels.length
                        ? (
                          funnels.map((funnel, index) => (
                            <div key={funnel._id} className='flex gap-4 justify-between'>
                              <button onClick={(e: any) => {
                                setType('Funnel')
                                setPart(funnel.funnel)
                                setSelectFunnel(funnel)
                              }} className='text-left w-full'>{funnel.funnel}</button>
                              <button onClick={(e: any) => {
                                e.preventDefault()
                                setSelectFunnel(funnel)
                                setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                            </div>
                          ))
                        )
                        : <p>No hay embudos creados</p>
                    }
                  </div>
                  <h2 className='text-lg font-medium'>Servicios</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      services.length
                        ? services.map((service, index) => {
                          if (service.steps.some(step => step.slug && step.slug !== '')) {
                            return (
                              <div key={service._id} className='flex gap-4 justify-between'>
                                <button onClick={(e: any) => {
                                  setType('Service')
                                  setPart(service.name)
                                  setSelectService(service)
                                }} className='text-left w-full'>{service.name}</button>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  setSelectService(service)
                                  setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                              </div>
                            )
                          }
                        })
                        : ''
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
                    <ButtonSecondary2 action={(e: any) => {
                    e.preventDefault()
                    setError('')
                    setNewFunnel({ funnel: '', description: '', slug: '', steps: [{ step: '', slug: '' }] })
                    setTitle('Nuevo embudo')
                    setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }} config='w-full'>Agregar embudo</ButtonSecondary2>
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
                    }} value={page.image} className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
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
            part === 'Popup'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Popup</h2>
                  <div className='flex gap-2'>
                    <input type='checkbox' checked={popupWeb.active} onChange={(e: any) => setPopupWeb({ ...popupWeb, active: e.target.checked })} />
                    <p>Activar Popup</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Aparecer</p>
                    <div className='flex gap-2'>
                      <Input type='number' placeholder='Segundos' value={popupWeb.wait} change={(e: any) => setPopupWeb({ ...popupWeb, wait: e.target.value })} />
                      <p className='my-auto'>segundos</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Titulo</p>
                    <Input placeholder='Titulo' value={popupWeb.title} change={(e: any) => setPopupWeb({ ...popupWeb, title: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Parrafo</p>
                    <Textarea placeholder='Descripción' value={popupWeb.description!} change={(e: any) => setPopupWeb({ ...popupWeb, description: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Texto boton</p>
                    <Input placeholder='Boton' value={popupWeb.buttonText} change={(e: any) => setPopupWeb({ ...popupWeb, buttonText: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Link boton</p>
                    <Select change={(e: any) => setPopupWeb({ ...popupWeb, buttonLink: e.target.value })} value={popupWeb.buttonLink}>
                      <option value=''>Seleccionar pagina</option>
                      {
                        pages.map(page => <option key={page._id} value={page.slug}>{page.page}</option>)
                      }
                      {
                        funnels.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>))
                      }
                      {
                        services.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{service.name} - {step.step}</option>))
                      }
                    </Select>
                  </div>
                  <p className='font-medium text-lg'>Mostrar formulario o llamada</p>
                  <div className='flex flex-col gap-2'>
                    <Select value={popupWeb.content} change={(e: any) => setPopupWeb({ ...popupWeb, content: e.target.value })}>
                      <option>Seleccionar formulario o llamada</option>
                      {
                        forms?.map(form => <option key={form._id} value={form._id}>{form.nameForm}</option>)
                      }
                      {
                        calls?.map(call => <option key={call._id} value={call._id}>{call.nameMeeting}</option>)
                      }
                    </Select>
                    <Button2 color='main' action={(e: any) => {
                      e.preventDefault()
                      setError('')
                      setTitleForm('Nuevo formulario')
                      setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '' }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                      setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Crear formulario</Button2>
                    <Button2 color='main' action={(e: any) => {
                      e.preventDefault()
                      setError('')
                      setNewCall({ nameMeeting: '', duration: '15 minutos', description: '', title: '', labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '' })
                      setTitleMeeting('Crear llamada')
                      setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Crear llamada</Button2>
                  </div>
                </div>
              )
              : ''
          }
          {
            funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>{part}</h2>
                  {
                    funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)
                      ? (
                        <>
                          <p className='font-medium'>Paso: {step}</p>
                          <p className='font-medium'>Seo</p>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta titulo</p>
                            <Input change={(e: any) => {
                              const oldFunnels = [...funnels]
                              oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                              setFunnels(oldFunnels)
                            }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaTitle} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta descripción</p>
                            <Textarea change={(e: any) => {
                              const oldFunnels = [...funnels]
                              oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                              setFunnels(oldFunnels)
                            }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaDescription!} />
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
                                const oldFunnels = [...funnels!]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.image = data
                                setFunnels(oldFunnels)
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image} className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image && funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                ? <Image src={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                : ''
                          }
                        </>
                      )
                      : (
                        <>
                          <p className='font-medium'>Pasos</p>
                          <div className='flex flex-col gap-2'>
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.map(step => {
                                if (step.slug && step.slug !== '') {
                                  return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                                }
                              })
                            }
                          </div>
                        </>
                      ) 
                  }
                  <Button2 color='main' action={(e: any) => {
                    setError('')
                    setNewFunnel(funnels.find(funnel => funnel.funnel === part)!)
                    setTitle(funnels.find(funnel => funnel.funnel === part)!.funnel)
                    setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Editar embudo</Button2>
                </div>
              )
              : ''
          }
          {
            services.find(service => service.name === part) && type === 'Service'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => services.find(service => service.name === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>{part}</h2>
                  <p className='font-medium'>Pasos</p>
                  {
                    services.find(service => service.name === part)!.steps!.find(st => st.step === step)
                      ? (
                        <>
                          <p className='font-medium'>Paso: {step}</p>
                          <p className='font-medium'>Seo</p>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta titulo</p>
                            <Input change={(e: any) => {
                              const oldServices = [...services]
                              oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                              setServices(oldServices)
                            }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaTitle} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta descripción</p>
                            <Textarea change={(e: any) => {
                              const oldServices = [...services]
                              oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                              setServices(oldServices)
                            }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaDescription!} />
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
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.image = data
                                setServices(oldServices)
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.image} className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image && services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                ? <Image src={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                : ''
                          }
                        </>
                      )
                      : selectService?.steps.map(step => {
                        if (step.slug && step.slug !== '') {
                          return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                        }
                      })
                  }
                  <Button2 color='main' action={(e: any) => {
                    setError('')
                    setNewService(services.find(service => service.name === part)!)
                    setTitle(services.find(service => service.name === part)!.name)
                    setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Editar embudo</Button2>
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
            part === 'Popup'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      if (id) {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, popup: popupWeb })
                      }
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
          {
            type === 'Funnel' && funnels.find(funnel => funnel.funnel === part) && funnels.find(funnel => funnel.funnel === part)?.steps.map(st => {
              if (step === st.step) {
                return (
                  <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (funnels.find(funnel => funnel.funnel === part)?._id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/funnel-step/${funnels.find(funnel => funnel.funnel === part)?._id}`, st)
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
            type === 'Service' && services.find(service => service.name === part) && services.find(service => service.name === part)?.steps.map(st => {
              if (step === st.step) {
                return (
                  <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (services.find(service => service.name === part)?._id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service-step/${services.find(service => service.name === part)?._id}`, st)
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
        </div>
        {
          part === ''
            ? (
              <div className='h-full flex dark:bg-neutral-900' style={{ width: 'calc(100% - 350px)' }}>
                <p className='m-auto'>Selecciona una pagina para editar</p>
              </div>
            )
            : ''
        }
        {
          pages.map((page, i) => {
            if (part === page.page && type === 'Page') {
              return (
                <div key={page._id} className='m-auto h-full bg-white text-black' style={{ width: responsive }}>
                  <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                    <div className='flex gap-4 w-fit m-auto'>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        setResponsive('calc(100% - 350px')
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
                                    ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} />
                                    : design.content === 'Bloque 1'
                                      ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} />
                                      : design.content === 'Bloque 2'
                                        ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} />
                                        : design.content === 'Bloque 3'
                                          ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} />
                                          : design.content === 'Bloque 4'
                                            ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} />
                                            : design.content === 'Bloque 5'
                                              ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} />
                                              : design.content === 'Contacto'
                                                ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} responsive={responsive} />
                                                : design.content === 'Suscripción'
                                                  ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} responsive={responsive} />
                                                  : design.content === 'Lead 1'
                                                    ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                    : design.content === 'Video'
                                                      ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} />
                                                      : design.content === 'Agendar llamada'
                                                        ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                        : design.content === 'Bloque 7'
                                                          ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} />
                                                          : design.content === 'Checkout'
                                                            ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData}  />
                                                            : design.content === 'Llamadas'
                                                              ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls} />
                                                              : design.content === 'Lead 2'
                                                                ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                                : design.content === 'Servicios'
                                                                  ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} />
                                                                  : design.content === 'Planes'
                                                                    ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} />
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
                                  setIndexFunnel(-1)
                                  setIndexStep(-1)
                                  setIndexService(-1)
                                  setIndexStepService(-1)
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
                                  setIndexFunnel(-1)
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
          part === 'Popup'
            ? (
              <div className='w-full h-full text-black bg-black/30 flex' style={{ width: 'calc(100% - 350px' }}>
                <div className={`${calls?.find(call => call._id === popupWeb.content) ? 'max-w-[800px]' : 'max-w-[600px]'} w-full p-6 rounded-lg bg-white m-auto flex flex-col gap-4`}>
                  {
                    popupWeb.title && popupWeb.title !== ''
                      ? <h2 className='text-2xl font-medium'>{popupWeb.title}</h2>
                      : ''
                  }
                  {
                    popupWeb.description && popupWeb.description !== ''
                      ? <p>{popupWeb.description}</p>
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && forms?.find(form => form._id === popupWeb.content)
                      ? (
                        <form className="flex w-full">
                          <div className="flex flex-col gap-4 border shadow-lg rounded-lg h-fit m-auto w-full p-6 max-w-[500px]">
                            <p className="text-main text-xl font-medium text-center">{forms?.find(form => form._id === popupWeb.content)?.title}</p>
                            {
                              forms?.find(form => form._id === popupWeb.content)?.informations.map(information => (
                                <div key={information.text} className="flex gap-2">
                                  <div
                                    className="my-auto"
                                    dangerouslySetInnerHTML={{ __html: information.icon }}
                                  />
                                  <div className="flex flex-col my-auto">
                                    <p>{information.text}</p>
                                    {
                                      information.subText && information.subText !== ''
                                        ? <p className="text-gray-400">{information.subText}</p>
                                        : ''
                                    }
                                  </div>
                                </div>
                              ))
                            }
                            {
                              forms?.find(form => form._id === popupWeb.content)?.labels.map(label => (
                                <div key={label.data} className="flex flex-col gap-2">
                                  <p>{label.text !== '' ? label.text : label.name}</p>
                                  <Input placeholder={label.name} change={undefined} value={undefined} />
                                </div>
                              ))
                            }
                            <Button type='submit' config='w-full'>{forms?.find(form => form._id === popupWeb.content)?.button}</Button>
                          </div>
                        </form>
                      )
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && calls?.find(call => call._id === popupWeb.content)
                      ? (
                        <div className="border rounded-lg shadow-md m-auto w-full max-w-[1280px]">
                          {
                            calls?.find(call => call._id === popupWeb.content)
                              ? <h2 className={`text-center ${responsive === '400px' ? 'text-[20px]' : 'text-[24px]'} border-b p-6 text-main font-semibold`}>{calls.find(call => call._id === popupWeb.content)?.title}</h2>
                              : ''
                          }
                          <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full border-b' : 'w-5/12 border-r'} flex flex-col gap-8`}>
                              <div className="flex flex-col gap-3">
                                <p className="text-sm font-medium">CARMEN ORELLANA</p>
                                {
                                  calls?.find(call => call._id === popupWeb.content)
                                    ? (
                                      <>
                                        <p className="text-xl font-semibold">{calls.find(call => call._id === popupWeb.content)?.nameMeeting}</p>
                                        <div className="flex gap-2">
                                          <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                          <p className="text-gray-500">{calls.find(call => call._id === popupWeb.content)?.duration}</p>
                                        </div>
                                      </>
                                    )
                                    : <p>No has seleccionado una llamada</p>
                                }
                              </div>
                              {
                                calls?.find(call => call._id === popupWeb.content)
                                  ? (
                                    <div className="flex flex-col gap-3">
                                      <p className="font-medium">Descripción:</p>
                                      <div onClick={() => console.log(calls.find(call => call._id === popupWeb.content)?.description)} className="flex flex-col gap-2">
                                        {
                                          calls.find(call => call._id === popupWeb.content)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                                        }
                                      </div>
                                    </div>
                                  )
                                  : ''
                              }
                            </div>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full' : 'w-7/12'}`}>
                              <div className="w-full flex flex-col gap-6 h-full">
                                <div className='flex flex-col gap-6'>
                                  <div className="flex gap-6 items-center m-auto">
                                    <button className="text-gray-600 hover:text-gray-800">&lt;</button>
                                    <h1 className="text-lg font-semibold">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h1>
                                    <button className="text-gray-600 hover:text-gray-800">&gt;</button>
                                  </div>
                                  <div className="grid grid-cols-7 gap-2">
                                    <div className="text-center font-semibold text-gray-600">Dom</div>
                                    <div className="text-center font-semibold text-gray-600">Lun</div>
                                    <div className="text-center font-semibold text-gray-600">Mar</div>
                                    <div className="text-center font-semibold text-gray-600">Mié</div>
                                    <div className="text-center font-semibold text-gray-600">Jue</div>
                                    <div className="text-center font-semibold text-gray-600">Vie</div>
                                    <div className="text-center font-semibold text-gray-600">Sáb</div>
                                    {renderCalendar()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      : ''
                  }
                  {
                    popupWeb.buttonLink && popupWeb.buttonLink !== '' && popupWeb.buttonText && popupWeb.buttonText !== ''
                      ? <Button>{popupWeb.buttonText}</Button>
                      : ''
                  }
                </div>
              </div>
            )
            : ''
        }
        {
          funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
            ? funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)
              ? (
                funnels.find((funnel) => funnel.funnel === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return (
                      <div key={st._id} className='h-full m-auto bg-white text-black' style={{ width: responsive }}>
                        <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                          <div className='flex gap-4 w-fit m-auto'>
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('calc(100% - 350px')
                            }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                            <button  onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('400px')
                            }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                          </div>
                        </div>
                        <div className='overflow-y-auto' style={{ height: 'calc(100% - 75px)' }}>
                          <div className='flex flex-col gap-4'>
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
                                ? funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                                  <div key={index}>
                                    {
                                      design.content === 'Carrusel'
                                        ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                        : design.content === 'Bloque 1'
                                          ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                          : design.content === 'Bloque 2'
                                            ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                            : design.content === 'Bloque 3'
                                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                              : design.content === 'Bloque 4'
                                                ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                                : design.content === 'Bloque 5'
                                                  ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} />
                                                  : design.content === 'Contacto'
                                                    ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} />
                                                    : design.content === 'Suscripción'
                                                      ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2  edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} responsive={responsive} pageNeed={pages} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} />
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
                                        const oldFunnels = [...funnels]
                                        oldFunnels[funnels.findIndex(funnel => funnel.funnel === part)].steps[i].design?.splice(index, 1)
                                        setFunnels(oldFunnels)
                                      }} color='red-500'>Eliminar bloque</Button2>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                    </div>
                                  </div>
                                ))
                                : (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexService(-1)
                                      setIndexStepService(-1)
                                      setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                                      setIndexStep(i)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                            }
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
                                ? (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                                      setIndexStep(i)
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
                          <div className='w-full p-6 bg-neutral-800 flex flex-col'>
                            {
                              storeData?.logoWhite && storeData?.logoWhite !== ''
                                ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                                : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
                            }
                            <p className='m-auto text-center text-white'>Todos los derechos reservados ©2024</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
        {
          services.find(service => service.name === part) && type === 'Service'
            ? services.find(service => service.name === part)?.steps.find(st => st.step === step)
              ? (
                services.find(service => service.name === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return (
                      <div key={st._id} className='h-full m-auto bg-white text-black' style={{ width: responsive }}>
                        <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                          <div className='flex gap-4 w-fit m-auto'>
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('calc(100% - 350px')
                            }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                            <button  onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('400px')
                            }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                          </div>
                        </div>
                        <div className='overflow-y-auto' style={{ height: 'calc(100% - 75px)' }}>
                          <div className='flex flex-col gap-4'>
                            {
                              services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
                                ? services.find(service => service.name === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                                  <div key={index}>
                                    {
                                      design.content === 'Carrusel'
                                        ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                        : design.content === 'Bloque 1'
                                          ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                          : design.content === 'Bloque 2'
                                            ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                            : design.content === 'Bloque 3'
                                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                              : design.content === 'Bloque 4'
                                                ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                                : design.content === 'Bloque 5'
                                                  ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                                  : design.content === 'Contacto'
                                                    ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} />
                                                    : design.content === 'Suscripción'
                                                      ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} setServices={setServices} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} responsive={responsive} pageNeed={pages} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} setServices={setServices} />
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
                                        const oldServices = [...services]
                                        oldServices[services.findIndex(service => service.name === part)].steps[i].design?.splice(index, 1)
                                        setServices(oldServices)
                                      }} color='red-500'>Eliminar bloque</Button2>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                    </div>
                                  </div>
                                ))
                                : (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexFunnel(-1)
                                      setIndexStep(-1)
                                      setIndexService(services.findIndex(service => service.name === part))
                                      setIndexStepService(i)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                            }
                            {
                              services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
                                ? (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexFunnel(services.findIndex(service => service.name === part))
                                      setIndexStep(i)
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
                          <div className='w-full p-6 bg-neutral-800 flex flex-col'>
                            {
                              storeData?.logoWhite && storeData?.logoWhite !== ''
                                ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                                : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
                            }
                            <p className='m-auto text-center text-white'>Todos los derechos reservados ©2024</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
      </div>
    </>
  )
}

function renderCalendar(): JSX.Element[] {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();

  const days: JSX.Element[] = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push(
      <button 
        key={i}  
        className={`w-12 h-12 m-auto flex rounded-full $bg-gray-100 hover:bg-main hover:text-white transition-color duration-150`}
      >
        <p className='m-auto'>{i}</p>
      </button>
    );
  }

  return days;
}