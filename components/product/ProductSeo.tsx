import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
}

export const ProductSeo: React.FC<Props> = ({information, setInformation}) => {

  const [aiLoading, setAiLoading] = useState(false)
  const [aiView, setAiView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [mouseInModal, setMouseInModal] = useState(false)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')
  const [titleSeo, setTitleSeo] = useState('')
  const [descriptionSeo, setDescriptionSeo] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateSeo = async (e: any) => {
    e.preventDefault()
    setAiLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-product-seo`, { description: description, type: type === 'Personalizado' ? newType : type })
    const filterTitleSeo = response.data.title
    const filterDescriptionSeo = response.data.description
    setTitleSeo(filterTitleSeo)
    setDescriptionSeo(filterDescriptionSeo)
    setAiLoading(false)
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-4'>
        <h2 className='font-medium'>Configuración SEO</h2>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Titulo SEO</p>
          <input type='text' placeholder='Titulo SEO' name='titleSeo' onChange={inputChange} value={information.titleSeo} className='text-sm p-1.5 border rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción SEO</p>
          <textarea placeholder='Descripción SEO' name='descriptionSeo' onChange={inputChange} value={information.descriptionSeo} className='text-sm p-1.5 h-24 border rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <button onClick={(e: any) => {
          e.preventDefault()
          setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setAiView({ ...aiView, view: 'flex', opacity: 'opacity-1' })
          }, 10)
        }} className='w-[300px] cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded transition-opacity duration-200 from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:opacity-75'>Generar con inteligencia artificial</button>
        <div onClick={() => {
          if (!aiView.mouse) {
            setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${aiView.view} ${aiView.opacity} transition-opacity duration-200 bg-black/20 flex fixed top-0 left-0 z-50 w-full h-full`}>
          <div onMouseEnter={() => setAiView({ ...aiView, mouse: true })} onMouseLeave={() => setAiView({ ...aiView, mouse: false })} className='bg-white flex flex-col gap-4 m-auto p-6 dark:bg-neutral-800 w-[500px] rounded-md shadow-xl'>
            <h3 className='font-medium'>Generar SEO con inteligencia artificial</h3>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Palabras claves del producto</p>
              <textarea onChange={(e: any) => setDescription(e.target.value)} value={description} placeholder='Datos del producto' className='h-20 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Tono del texto</p>
              <select onChange={(e: any) => setType(e.target.value)} value={type} className='p-1.5 rounded w-full border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                <option>Experto</option>
                <option>Persuasivo</option>
                <option>Personalizado</option>
              </select>
            </div>
            {
              type === 'Personalizado'
                ? (
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Tono personalizado</p>
                    <input type='text' placeholder='Tono' onChange={(e: any) => setNewType(e.target.value)} value={newType} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                )
                : ''
            }
            <button onClick={generateSeo} className='w-full cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded transition-opacity duration-200 from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:opacity-75'>{aiLoading ? <Spinner2 /> : 'Generar SEO'}</button>
            {
              titleSeo !== ''
                ? (
                  <div>
                    <input type='text' placeholder='Descripción generada por la inteligencia artificial' value={titleSeo} onChange={(e: any) => setTitleSeo(e.target.value)} className='w-full p-1.5 mb-2 border rounded text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                    <button className='p-1.5 text-sm bg-main border border-main text-white rounded-md w-full transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={(e: any) => {
                      e.preventDefault()
                      setInformation({...information, titleSeo: titleSeo})
                      setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    }}>Usar titulo SEO</button>
                  </div>
                )
                : ''
            }
            {
              descriptionSeo !== ''
                ? (
                  <div>
                    <textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionSeo} onChange={(e: any) => setDescriptionSeo(e.target.value)} className='w-full mt-4 p-1.5 mb-1 border rounded text-sm font-light h-28 focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                    <button className='p-1.5 text-sm bg-main border border-main text-white rounded w-full transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={(e: any) => {
                      e.preventDefault()
                      setInformation({...information, descriptionSeo: descriptionSeo})
                      setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    }}>Usar descripción SEO</button>
                  </div>
                )
                : ''
            }
            {
              titleSeo !== '' && descriptionSeo !== ''
                ? (
                  <button className='p-1.5 text-sm bg-main border border-main text-white rounded mt-2 w-full transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={(e: any) => {
                    e.preventDefault()
                    setInformation({...information, titleSeo: titleSeo, descriptionSeo: descriptionSeo})
                    setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                    }, 200)
                  }}>Usar ambos</button>
                )
                : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}
