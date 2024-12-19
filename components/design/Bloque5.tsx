"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { ICall, ICategoryPage, IDesign, IForm, IFunnel, IPage, IService } from '@/interfaces'
import { Button, Input, Select, Spinner } from '../ui'
import { ButtonDesign } from './ButtonDesign'

interface Props {
    edit: any
    design: IDesign
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    ind: number
    inde?: number
    indx?: number
    pageNeed: IPage[]
    responsive: string
    forms: IForm[] | undefined
    style?: any
}

export const Bloque5: React.FC<Props> = ({ edit, design, pages, setPages, index, ind, inde, indx, pageNeed, responsive, forms, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className="w-full flex py-24 px-2" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className="w-full text-center max-w-[1280px] m-auto flex flex-col gap-6">
        {
          edit !== 'Bloque 5'
            ? (
              <>
                {
                  index === 0
                    ? (
                      <h1
                        className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} transition-opacity duration-200 font-semibold`}
                        style={{ color: design.info.textColor }}
                        dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                      />
                    )
                    : (
                      <h2
                        className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} transition-opacity duration-200 font-semibold`}
                        style={{ color: design.info.textColor }}
                        dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                      />
                    )
                }
                <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'} gap-4`}>
                  <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2'} flex flex-col gap-3`}>
                    {
                      index === 0
                        ? (
                          <h2
                            className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} font-semibold`}
                            style={{ color: design.info.textColor }}
                            dangerouslySetInnerHTML={{ __html: design.info.subTitle ? design.info.subTitle  : '' }}
                          />
                        )
                        : (
                          <h3
                            className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} font-semibold`}
                            style={{ color: design.info.textColor }}
                            dangerouslySetInnerHTML={{ __html: design.info.subTitle ? design.info.subTitle  : '' }}
                          />
                        )
                    }
                    <p
                      className={`${responsive === '400px' ? 'text-base' : 'text-lg'} transition-opacity duration-200`}
                      style={{ color: design.info.textColor }}
                      dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
                    />
                    {
                      design.info.button && design.info.button !== '' && design.info.buttonLink && design.info.buttonLink !== ''
                        ? <ButtonDesign config='m-auto' style={style} text={design.info.button} />
                        : ''
                    }
                  </div>
                  <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2'} flex flex-col gap-3`}>
                    {
                      index === 0
                        ? (
                          <h2
                            className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} font-semibold`}
                            style={{ color: design.info.textColor }}
                            dangerouslySetInnerHTML={{ __html: design.info.subTitle2 ? design.info.subTitle2  : '' }}
                          />
                        )
                        : (
                          <h3
                            className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} font-semibold`}
                            style={{ color: design.info.textColor }}
                            dangerouslySetInnerHTML={{ __html: design.info.subTitle2 ? design.info.subTitle2  : '' }}
                          />
                        )
                    }
                    <p
                      className={`${responsive === '400px' ? 'text-base' : 'text-lg'} transition-opacity duration-200`}
                      style={{ color: design.info.textColor }}
                      dangerouslySetInnerHTML={{ __html: design.info.description2 ? design.info.description2 : '' }}
                    />
                    {
                      design.info.button2 && design.info.button2 !== '' && design.info.buttonLink2 && design.info.buttonLink2 !== ''
                        ? <ButtonDesign config='m-auto' style={style} text={design.info.button2} />
                        : ''
                    }
                  </div>
                </div>
                {
                  design.info?.image && design.info.image !== ''
                    ? <Image className='h-fit mx-auto mt-4' width={480} height={300} alt='Imagen slider prueba' src={design.info.image} />
                    : ''
                }
              </>
            )
            : (
              <>
                <div className='flex flex-col gap-2 w-fit m-auto bg-white p-6 rounded-xl shadow-md border border-black/5'>
                  <div className='flex flex-col gap-2'>
                    <p className='m-auto font-medium'>Tipo fondo</p>
                    <Select change={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.typeBackground = e.target.value
                      setPages(oldPages)
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
                                const oldPages = [...pages]
                                oldPages[ind].design[index].info.background = data
                                setPages(oldPages)
                                setLoadingImage(false)
                              } catch (error) {
                                setLoading(false)
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
                          const oldPages = [...pages]
                          oldPages[ind].design[index].info.background = e.target.value
                          setPages(oldPages)
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
                              const oldPages = [...pages]
                              setGradient(e.target.value)
                              oldPages[ind].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                              setPages(oldPages)
                            }}>
                              <option>Seleccionar tipo</option>
                              <option value='135'>Lineal</option>
                              <option value='circle'>Radial</option>
                            </Select>
                          </div>
                          {
                            design.info.background?.includes('linear-gradient')
                              ? <Input placeholder='Grados' change={(e: any) => {
                                const oldPages = [...pages]
                                setGradient(e.target.value)
                                oldPages[ind].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                setPages(oldPages)
                              }} value={gradient} config='w-fit' />
                              : ''
                          }
                          <div className='flex flex-col gap-2'>
                            <p>Primer color</p>
                            <input type='color' onChange={(e: any) => {
                              const oldPages = [...pages]
                              setFirstColor(e.target.value)
                              oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                              setPages(oldPages)
                            }} className='m-auto' value={firstColor} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p>Segundo color</p>
                            <input type='color' onChange={(e: any) => {
                              const oldPages = [...pages]
                              setLastColor(e.target.value)
                              oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                              setPages(oldPages)
                            }} className='m-auto' value={lastColor} />
                          </div>
                        </div>
                      )
                      : ''
                  }
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Color texto</p>
                    <input type='color' onChange={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.textColor = e.target.value
                      setPages(oldPages)
                    }} value={design.info.textColor} className='m-auto' />
                  </div>
                </div>
                <textarea placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                  const oldPages = [...pages]
                  oldPages[ind].design[index].info.title = e.target.value
                  setPages(oldPages)
                }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} p-1.5 rounded border m-auto text-center font-semibold bg-transparent`} style={{ color: design.info.textColor }} />
                <div className="flex gap-4">
                  <div className="w-1/2 flex flex-col gap-2">
                    <textarea placeholder='Subtitulo 1' value={design.info.subTitle} onChange={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.subTitle = e.target.value
                      setPages(oldPages)
                    }} className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} p-1.5 rounded border m-auto text-center font-semibold bg-transparent`} style={{ color: design.info.textColor }} />
                    <textarea placeholder='Descripción 1' value={design.info.description} onChange={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.description = e.target.value
                      setPages(oldPages)
                    }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1.5 rounded border bg-transparent text-center`} style={{ color: design.info.textColor }} />
                    <div className='flex gap-4 m-auto'>
                    <div className='w-fit text-white py-2 px-6' style={{ backgroundColor: style.primary, color: style.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>
                        <input type='text' placeholder='Boton' value={design.info.button} onChange={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[ind].design[index].info.button = e.target.value
                          setPages(oldPages)
                        }} className='text-sm lg:text-[16px] bg-transparent border border-neutral-500' />
                      </div>
                      <select value={design.info.buttonLink} onChange={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.buttonLink = e.target.value
                        setPages(oldPages)
                      }} className='rounded border w-full'>
                        <option>Acción boton</option>
                        {
                          pageNeed.map(page => (
                            <option key={page.slug}>/{page.slug}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <textarea placeholder='Subtitulo 2' value={design.info.subTitle2} onChange={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.subTitle2 = e.target.value
                      setPages(oldPages)
                    }} className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} p-1.5 rounded border m-auto text-center font-semibold bg-transparent`} style={{ color: design.info.textColor }} />
                    <textarea placeholder='Descripción 2' value={design.info.description2} onChange={(e: any) => {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.description2 = e.target.value
                      setPages(oldPages)
                    }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1.5 rounded border bg-transparent text-center`} style={{ color: design.info.textColor }} />
                    <div className='flex gap-4 m-auto'>
                      <div className='w-fit text-white py-2 px-6' style={{ backgroundColor: style.primary, color: style.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>
                        <input type='text' placeholder='Boton' value={design.info.button2} onChange={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[ind].design[index].info.button2 = e.target.value
                          setPages(oldPages)
                        }} className='text-sm lg:text-[16px] bg-transparent border border-neutral-500' />
                      </div>
                      <select value={design.info.buttonLink2} onChange={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.buttonLink2 = e.target.value
                        setPages(oldPages)
                      }} className='rounded border w-full'>
                        <option>Acción boton</option>
                        {
                          pageNeed.map(page => (
                            <option key={page.slug}>/{page.slug}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
                {
                  design.info?.image && design.info.image !== ''
                    ? <Image className='h-fit mx-auto mt-4' width={480} height={300} alt='Imagen slider prueba' src={design.info.image} />
                    : ''
                }
                {
                  loading
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
                  error !== ''
                    ? <p className='bg-red-500 text-white px-2 py-1'>{error}</p>
                    : ''
                }
                <input type='file' className='m-auto text-sm w-fit file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' style={{ color: design.info.textColor }} onChange={async (e: any) => {
                  if (!loading) {
                    setLoading(true)
                    setError('')
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
                      oldPages[ind].design[index].info.image = data
                      setPages(oldPages)
                      setLoadingImage(false)
                    } catch (error) {
                      setLoadingImage(false)
                      setError('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                    }
                  }
                }} />
              </>
            )
        }
      </div>
    </div>
  )
}
