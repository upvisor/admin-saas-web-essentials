import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose } from 'react-icons/ai'
import { CiImageOn } from 'react-icons/ci'

interface Props {
  information: IProduct,
  setInformation: any
}

export const StockVariations: React.FC<Props> = ({information, setInformation}) => {

  const [indexImage, setIndexImage] = useState(-1)
  const [variations, setVariations] = useState('rotate-90')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const onDrop = async (e: any) => {
    const uploadImage = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: e[0]}, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    const img = { public_id: uploadImage.data.image.public_id, url: uploadImage.data.image.url }
    setInformation((prev: any) => {
      const newVariation = {...prev.variations}
      newVariation.variations[indexImage].image = img
      return {...prev, variations: newVariation}
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4 font-medium'>Inventario</h2>
      <div className='mb-4'>
        <div className='flex gap-2'>
          <div>
            <p className='mb-2 text-sm'>Stock</p>
            <input type='number' placeholder='Stock' name='stock' onChange={inputChange} value={information.stock} className='text-sm p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div>
            <p className='mb-2 text-sm'>SKU</p>
            <input type='text' placeholder='SKU' name='sku' onChange={inputChange} value={information.sku} className='text-sm p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <button onClick={(e: any) => {
          e.preventDefault()
          if (variations === 'rotate-90') {
            setVariations('-rotate-90')
          } else {
            setVariations('rotate-90')
          }
        }} className='flex gap-3 w-fit'>
          <h2 className='font-medium'>Variaciones</h2>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${variations} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
        </button>
        <div className={`${variations === 'rotate-90' ? 'hidden' : 'flex'} flex-col gap-4`}>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Ingresa el nombre de la variación</p>
            <input onChange={(e: any) => {
              let mod = information.variations
              mod!.nameVariation = e.target.value
              setInformation({ ...information, variation: mod })
            }} type='text' placeholder='Color' value={information.variations?.nameVariation} className='text-sm p-1.5 w-64 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          {
            information.variations?.nameSubVariation !== undefined
              ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Ingresa el nombre de la subvariación</p>
                  <input onChange={(e: any) => {
                    let mod = information.variations
                    mod!.nameSubVariation = e.target.value
                    setInformation({ ...information, variation: mod })
                  }} type='text' placeholder='Color' value={information.variations.nameSubVariation} className='text-sm p-1.5 w-64 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              )
              : (
                <button onClick={(e: any) => {
                  e.preventDefault()
                  let mod = information.variations
                  mod!.nameSubVariation = ''
                  setInformation({ ...information, variations: mod })
                }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Crear subvariación</button>
              )
          }
          {
            information.variations?.nameVariation !== ''
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <p className='text-sm w-20'>Imagen</p>
                    <p className='text-sm w-32'>Variación</p>
                    {
                      information.variations?.nameSubVariation !== undefined
                        ? <p className='text-sm w-32'>Subvariación</p>  
                        : ''
                    }
                    <p className='text-sm w-20'>Stock</p>
                    <p className='text-sm'>SKU</p>
                  </div>
                  {
                    information.variations?.variations?.length
                      ? information.variations?.variations.map((variation, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                          <div className='flex gap-2'>
                            <div {...getRootProps()} className={`flex w-20 h-20 transition-colors duration-200 border rounded-lg cursor-pointer ${isDragActive ? 'bg-neutral-100' : 'bg-white'} hover:bg-neutral-100 dark:bg-neutral-700 dark:border-neutral-600 dark:hover:bg-neutral-600`}>
                              <div onDragEnter={() => setIndexImage(index)} onMouseMove={() => setIndexImage(index)} onClick={() => setIndexImage(index)} className='w-20 h-20 flex'>
                                <input {...getInputProps()} />
                                {
                                  variation.image?.url !== undefined
                                    ? <img src={variation.image?.url} alt={variation.image?.url} className='w-16 h-16 m-auto' />
                                    : <CiImageOn className='text-3xl m-auto text-neutral-400' />
                                }
                              </div>
                            </div>
                            <input type='text' placeholder='Azul' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].variation = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.variation} className='text-sm w-32 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            {
                              information.variations?.nameSubVariation !== undefined
                                ? (
                                  <input type='text' placeholder='Azul' onChange={(e: any) => {
                                    let mod = information.variations
                                    mod!.variations[index].subVariation = e.target.value
                                    setInformation({ ...information, variations: mod })
                                  }} value={variation.subVariation} className='text-sm w-32 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                )
                                : ''
                            }
                            <input type='number' placeholder='Stock' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].stock = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.stock} className='text-sm w-20 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <input type='text' placeholder='SKU' name='sku' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].sku = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.sku} className='text-sm w-32 h-fit mb-auto mt-auto p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              const updatedVariations = { ...information.variations }
                              updatedVariations.variations = updatedVariations.variations?.filter((vari, i) => i !== index)
                              setInformation({ ...information, variations: updatedVariations })
                            }}><AiOutlineClose /></button>
                          </div>
                        </div>
                      ))
                      : ''
                  }
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    let mod = information.variations
                    mod!.variations.push({ variation: '', stock: 0 })
                    setInformation({ ...information, variations: mod })
                  }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Agregar variación</button>
                </div>
              )
              : ''
          }
        </div>
      </div>
    </div>
  )
}
