import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct,
  setInformation: any
}

export const NameDescription: React.FC<Props> = ({information, setInformation}) => {

  const [descriptionAi, setDescriptionAi] = useState('')
  const [descriptionAiLoading, setDescriptionAiLoading] = useState(false)
  const [descriptionAiView, setDescriptionAiView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [newType, setNewType] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateDescription = async (e: any) => {
    e.preventDefault()
    setDescriptionAiLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-description-product`, { description: description, type: type === 'Personalizado' ? newType : type })
    setDescriptionAi(response.data)
    setDescriptionAiLoading(false)
  }

  const changeDescriptionAi = (e: any) => {
    setDescriptionAi(e.target.value)
  }

  return (
    <div className='bg-white flex flex-col gap-4 border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Nombre</p>
        <input type='text' placeholder='Nombre del producto' name='name' onChange={inputChange} value={information.name} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Descripción</p>
        <textarea placeholder='Descripción del producto' name='description' onChange={inputChange} value={information.description} className='w-full mb-1 p-1.5 border rounded text-sm h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <button onClick={(e: any) => {
        e.preventDefault()
        setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-1' })
        }, 10)
      }} className='w-[380px] cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 hover:opacity-75 transition-opacity duration-200'>Generar descripción con inteligencia artificial</button>
      <div onClick={() => {
        if (!descriptionAiView.mouse) {
          setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setDescriptionAiView({ ...descriptionAiView, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${descriptionAiView.view} ${descriptionAiView.opacity} transition-opacity duration-200 bg-black/20 flex fixed w-full h-full top-0 left-0 z-50`}>
        <div onMouseMove={() => setDescriptionAiView({ ...descriptionAiView, mouse: true })} onMouseEnter={() => setDescriptionAiView({ ...descriptionAiView, mouse: true })} onMouseLeave={() => setDescriptionAiView({ ...descriptionAiView, mouse: false })} className='bg-white m-auto p-6 dark:bg-neutral-800 w-[500px] rounded-md shadow-xl'>
          <h3 className='mb-4 font-medium'>Generar descripción del producto</h3>
          <p className='mb-2 text-sm'>Palabras claves del producto</p>
          <textarea onChange={(e: any) => setDescription(e.target.value)} value={description} placeholder='Datos del producto' className='h-20 p-1.5 rounded border text-sm w-full focus:outline-none mb-4 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          <p className='mb-2 text-sm'>Tono del texto</p>
          <select onChange={(e: any) => setType(e.target.value)} value={type} className='p-1.5 rounded mb-4 w-full border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
            <option>Experto</option>
            <option>Persuasivo</option>
            <option>Personalizado</option>
          </select>
          {
            type === 'Personalizado'
              ? (
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Tono personalizado</p>
                  <input type='text' placeholder='Tono' onChange={(e: any) => setNewType(e.target.value)} value={newType} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              )
              : ''
          }
          <button onClick={generateDescription} className='w-full cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700 transition-opacity duration-200 hover:opacity-75'>{descriptionAiLoading ? <Spinner2 /> : 'Generar descripción'}</button>
          {
            descriptionAi !== ''
              ? (
                <div>
                  <textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionAi} onChange={changeDescriptionAi} className='w-full mt-3 p-1.5 mb-4 border rounded text-sm h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                  <button className='p-1.5 text-sm bg-main border border-main text-white rounded w-full transition-colors duration-200 hover:bg-transparent hover:text-main' onClick={(e: any) => {
                    e.preventDefault()
                    setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setDescriptionAiView({ ...descriptionAiView, view: 'hidden', opacity: 'opacity-0' })
                    }, 200)
                    setInformation({...information, description: descriptionAi})
                  }}>Usar descripción</button>
                </div>
              )
              : ''
          }
        </div>
      </div>
    </div>
  )
}
