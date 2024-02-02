import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'

export const Information = ({ information, setInformation }: { information: IProduct, setInformation: any }) => {

  const [rotate, setRotate] = useState('rotate-90')

  const imageChange = async (e: any, index: number) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    const beforeInformations = [...information.informations!]
    beforeInformations[index].image = { public_id: data.image.public_id, url: data.image.url }
    setInformation({ ...information, informations: beforeInformations })
  }

  return (
    <div className='bg-white p-4 flex flex-col gap-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <button onClick={(e: any) => {
        e.preventDefault()
        if (rotate === 'rotate-90') {
          setRotate('-rotate-90')
        } else {
          setRotate('rotate-90')
        }
      }} className='flex gap-3 w-fit'>
        <h2 className='font-medium'>Bloques informativos</h2>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
      </button>
      <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex-col gap-4`}>
        {
          information.informations?.map((info, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className='text-sm font-medium'>Bloque {index + 1}</h3>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Titulo</p>
                <input type='text' placeholder='Titulo' value={info.title} onChange={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].title = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }} className='p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Descripción</p>
                <textarea placeholder='Titulo' value={info.description} onChange={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].description = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }} className='p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>imagen</p>
                <input type='file' name='image' onChange={(e: any) => imageChange(e, index)} className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Aliniación de la información</p>
                <select onChange={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].align = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }} className='p-1.5 rounded border text-sm focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                  <option>Izquierda</option>
                  <option>Derecha</option>
                </select>
              </div>
            </div>
          ))
        }
        <button onClick={(e: any) => {
          e.preventDefault()
          const beforeInformations = [...information.informations!]
          beforeInformations.push({ title: '', description: '', image: { public_id: '', url: '' }, align: 'Izquierda' })
          setInformation({ ...information, informations: beforeInformations })
        }} className='bg-main border w-fit py-1.5 px-6 text-sm border-main transition-colors duration-200 text-white rounded hover:bg-transparent hover:text-main'>Agregar bloque informativo</button>
      </div>
    </div>
  )
}
