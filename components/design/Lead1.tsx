"use client"
import { IDesign, IForm, IFunnel, IPage, IService, IStoreData } from '@/interfaces'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { Button, Button2, Button2Secondary, Input, Select, Spinner } from '../ui'
import axios from 'axios'
import Image from 'next/image'

interface Props {
  edit: any
  pages: IPage[]
  setPages: any
  design: IDesign
  index: number
  ind: number
  inde?: number
  indx?: number
  funnels?: IFunnel[]
  setFunnels?: any
  forms?: IForm[]
  popupForm?: any
  setPopupForm?: any
  setTitleForm?: any
  selectFunnel?: any
  setSelectFunnel?: any
  selectStep?: any
  setNewForm?: any
  responsive: string
  error: string
  setError: any
  services?: IService[]
  setServices?: any
  storeData?: IStoreData
}

export const Lead1: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, funnels, setFunnels, forms, popupForm, setPopupForm, setTitleForm, selectFunnel, setSelectFunnel, selectStep, setNewForm, responsive, error, setError, services, setServices, storeData }) => {
  
  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className={`flex ${responsive === '400px' ? 'flex-col gap-4' : 'flex-row'} p-4 flex-wrap`} style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      {
        edit === 'Lead 1'
          ? (
            <>
              <div className='w-full flex mb-4'>
                <div className='flex flex-col gap-2 w-fit m-auto bg-white p-6 rounded-xl shadow-md border border-black/5'>
                  <div className='flex flex-col gap-2'>
                    <p className='m-auto font-medium'>Tipo fondo</p>
                    <Select change={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.typeBackground = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.typeBackground = e.target.value
                        setServices(oldServices)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.typeBackground = e.target.value
                        setPages(oldPages)
                      }
                    }} value={design.info.typeBackground} config='w-fit m-auto'>
                      <option>Sin fondo</option>
                      <option>Imagen</option>
                      <option>Color</option>
                      <option>Degradado</option>
                    </Select>
                  </div>
                  {
                    design.info.typeBackground === 'Imagen'
                      ? (
                        <>
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : ''
                          }
                          {
                            errorImage !== ''
                              ? <p className='bg-red-500 text-white px-2 py-1'>{errorImage}</p>
                              : ''
                          }
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
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  oldFunnels[inde].steps[ind].design![index].info.background = data
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  oldServices[indx].steps[ind].design![index].info.background = data
                                  setServices(oldServices)
                                } else {
                                  const oldPages = [...pages]
                                  oldPages[ind].design[index].info.background = data
                                  setPages(oldPages)
                                }
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={design.info.background} className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                        </>
                      )
                      : ''
                  }
                  {
                    design.info.typeBackground === 'Color'
                      ? <input type='color' onChange={(e: any) => {
                          if (inde !== undefined) {
                            const oldFunnels = [...funnels!]
                            oldFunnels[inde].steps[ind].design![index].info.background = e.target.value
                            setFunnels(oldFunnels)
                          } else if (indx !== undefined) {
                            const oldServices = [...services!]
                            oldServices[indx].steps[ind].design![index].info.background = e.target.value
                            setServices(oldServices)
                          } else {
                            const oldPages = [...pages]
                            oldPages[ind].design[index].info.background = e.target.value
                            setPages(oldPages)
                          }
                        }} className='m-auto' value={design.info.background} />
                      : ''
                  }
                  {
                    design.info.typeBackground === 'Degradado'
                      ? (
                        <div className='flex gap-4 m-auto'>
                          <div className='flex flex-col gap-2'>
                            <p>Tipo de degradado</p>
                            <Select change={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setGradient(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                oldServices[indx].steps[ind].design![index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setServices(oldServices)
                              } else {
                                const oldPages = [...pages]
                                setGradient(e.target.value)
                                oldPages[ind].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setPages(oldPages)
                              }
                            }}>
                              <option>Seleccionar tipo</option>
                              <option value='135'>Lineal</option>
                              <option value='circle'>Radial</option>
                            </Select>
                          </div>
                          {
                            design.info.background?.includes('linear-gradient')
                              ? <Input placeholder='Grados' change={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  setGradient(e.target.value)
                                  oldFunnels[inde].steps[ind].design![index].info.background =  `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  setGradient(e.target.value)
                                  oldServices[indx].steps[ind].design![index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setServices(oldServices)
                                } else {
                                  const oldPages = [...pages]
                                  setGradient(e.target.value)
                                  oldPages[ind].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setPages(oldPages)
                                }
                              }} value={gradient} config='w-fit' />
                              : ''
                          }
                          <div className='flex flex-col gap-2'>
                            <p>Primer color</p>
                            <input type='color' onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setFirstColor(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                setFirstColor(e.target.value)
                                oldServices[indx].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setServices(oldServices)
                              } else {
                                const oldPages = [...pages]
                                setFirstColor(e.target.value)
                                oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setPages(oldPages)
                              }
                            }} className='m-auto' value={firstColor} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p>Segundo color</p>
                            <input type='color' onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setLastColor(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                setLastColor(e.target.value)
                                oldServices[indx].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setServices(oldServices)
                              } else {
                                const oldPages = [...pages]
                                setLastColor(e.target.value)
                                oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setPages(oldPages)
                              }
                            }} className='m-auto' value={lastColor} />
                          </div>
                        </div>
                      )
                      : ''
                  }
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Color texto</p>
                    <input type='color' onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.textColor = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.textColor = e.target.value
                        setServices(oldServices)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.textColor = e.target.value
                        setPages(oldPages)
                      }
                    }} value={design.info.textColor} className='m-auto' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Cual logo utilizar</p>
                    <Select change={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.titleForm = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.titleForm = e.target.value
                        setServices(oldServices)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.titleForm = e.target.value
                        setPages(oldPages)
                      }
                    }} config='w-fit m-auto' value={design.info.titleForm}>
                      <option>Seleccionar color logo</option>
                      <option>Logo principal</option>
                      <option>Logo blanco</option>
                      <option>Sin logo</option>
                    </Select>
                  </div>
                </div>
              </div>
              {
                design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                  ? <button className='w-full m-auto mb-8'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                  : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                    ? <button className='w-full m-auto mb-8'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : ''
              }
              <div className={`flex flex-col gap-4 my-auto w-1/2`}>
                <div className='p-2 bg-main w-fit'>
                  <input value={design.info.description2} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.description2 = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.description2 = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.description2 = e.target.value
                      setPages(oldPages)
                    }
                  }} className='border p-1 text-white bg-main' />
                </div>
                <textarea value={design.info.title} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.title = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.title = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.title = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} font-semibold p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                  <textarea value={design.info.description} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.description = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.description = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.description = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg' />
                  <input value={design.info.subTitle} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.subTitle = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.subTitle = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.subTitle = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1 border bg-transparent w-96`} style={{ color: design.info.textColor }} />
                </div>
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg' />
                  <input value={design.info.subTitle2} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.subTitle2 = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.subTitle2 = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.subTitle2 = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1 border bg-transparent w-96`} style={{ color: design.info.textColor }} />
                </div>
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg' />
                  <input value={design.info.subTitle3} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.subTitle3 = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.subTitle3 = e.target.value
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.subTitle3 = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1 border bg-transparent w-96`} style={{ color: design.info.textColor }} />
                </div>
              </div>
              <div className='w-1/2 flex'>
                <div className="flex flex-col gap-4 bg-white border border-black/5 rounded-xl h-fit m-auto w-full p-6 max-w-[500px]" style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                  <p className='font-medium text-lg'>Selecciona un formulario</p>
                    {
                      forms?.length
                        ? (
                          <Select change={(e: any) => {
                            if (inde !== undefined) {
                              const oldFunnels = [...funnels!]
                              oldFunnels[inde].steps[ind].design![index].form = e.target.value
                              setFunnels(oldFunnels)
                            } else if (indx !== undefined) {
                              const oldServices = [...services!]
                              oldServices[indx].steps[ind].design![index].form = e.target.value
                              setServices(oldServices)
                            } else {
                              const oldPages = [...pages]
                              oldPages[ind].design[index].form = e.target.value
                              setPages(oldPages)
                            }
                          }} value={design.form}>
                            <option>Seleccionar formulario</option>
                            {
                              forms?.map(form => (
                                <option key={form._id} value={form._id}>{form.nameForm}</option>
                              ))
                            }
                          </Select>
                        )
                        : <p>No tienes formularios creados</p>
                    }
                    <div className='flex gap-2'>
                      <Button2 color='main' action={(e: any) => {
                        e.preventDefault()
                        setError('')
                        setTitleForm('Nuevo formulario')
                        setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '', datas: [''], type: '' }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                        setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }}>Crear un formulario</Button2>
                      {
                        design.form && design.form !== ''
                          ? <Button2Secondary color='main' action={(e: any) => {
                            e.preventDefault()
                            setError('')
                            setTitleForm(forms?.find(form => form._id === design.form)?.nameForm)
                            setNewForm(forms?.find(form => form._id === design.form))
                            setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}>Editar formulario</Button2Secondary>
                          : ''
                      }
                    </div>
                  {
                    design.form && design.form !== ''
                      ? (
                        <>
                          {
                            forms?.find(form => form._id === design.form)?.informations.map(information => (
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
                            forms?.find(form => form._id === design.form)?.labels.map(label => (
                              <div key={label.data} className="flex flex-col gap-2">
                                <p>{label.text !== '' ? label.text : label.name}</p>
                                <Input placeholder={label.name} change={undefined} value={undefined} />
                              </div>
                            ))
                          }
                          <Button type='submit' config='w-full'>{forms?.find(form => form._id === design.form)?.button}</Button>
                        </>
                      )
                      : ''
                  }
                </div>
              </div>
            </>
          )
          : (
            <>
              {
                design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                  ? <button className='w-full m-auto mb-8'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                  : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                    ? <button className='w-full m-auto mb-8'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : ''
              }
              <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2'} flex flex-col gap-4 my-auto`}>
                {
                  design.info.description2 && design.info.description2 !== ''
                    ? <p className='text-white bg-main px-4 py-2 w-fit'>{design.info.description2}</p>
                    : ''
                }
                <h1
                  className={`${responsive === '400px' ? 'text-4xl' : 'text-5xl'} transition-opacity duration-200 font-semibold`}
                  style={{ color: design.info.textColor }}
                  dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                />
                <p
                  className={`${responsive === '400px' ? 'text-base' : 'text-lg'} transition-opacity duration-200`}
                  style={{ color: design.info.textColor }}
                  dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
                />
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg min-w-7' />
                  <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'}`} style={{ color: design.info.textColor }}>{design.info.subTitle}</p>
                </div>
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg min-w-7' />
                  <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'}`} style={{ color: design.info.textColor }}>{design.info.subTitle2}</p>
                </div>
                <div className='flex gap-3'>
                  <FaCheck className='my-auto text-main text-lg min-w-7' />
                  <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'}`} style={{ color: design.info.textColor }}>{design.info.subTitle3}</p>
                </div>
              </div>
              <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2'} flex`}>
                {
                  design.form && design.form !== ''
                    ? ''
                    : (
                      <div className="flex flex-col gap-4 bg-white border border-black/5 rounded-xl h-fit m-auto w-full p-6 max-w-[500px]" style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                        <p>Selecciona un formulario</p>
                      </div>
                    )
                }
                {
                  design.form && design.form !== ''
                    ? (
                      <form className="flex w-full">
                        <div className="flex flex-col gap-4 bg-white border border-black/5 rounded-xl h-fit m-auto w-full p-6 max-w-[500px]" style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                          <p className="text-main text-xl font-medium text-center">{forms?.find(form => form._id === design.form)?.title}</p>
                          {
                            forms?.find(form => form._id === design.form)?.informations.map(information => (
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
                            forms?.find(form => form._id === design.form)?.labels.map(label => (
                              <div key={label.data} className="flex flex-col gap-2">
                                <p>{label.text !== '' ? label.text : label.name}</p>
                                <Input placeholder={label.name} change={undefined} value={undefined} config='dark:bg-white dark:border-neutral-200' />
                              </div>
                            ))
                          }
                          <Button type='submit' config='w-full'>{forms?.find(form => form._id === design.form)?.button}</Button>
                        </div>
                      </form>
                    )
                    : ''
                }
              </div>
            </>
          )
      }
    </div>
  )
}
