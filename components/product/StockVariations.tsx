import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
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
          <div className='flex gap-2'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Ingresa el nombre de la variación</p>
              <input onChange={(e: any) => {
                let mod = information.variations
                mod!.nameVariation = e.target.value
                setInformation({ ...information, variations: mod })
              }} type='text' placeholder='Color' value={information.variations?.nameVariation} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Formato</p>
              <select value={information.variations?.formatVariation} onChange={(e: any) => {
                let mod = information.variations
                mod!.formatVariation = e.target.value
                setInformation({ ...information, variations: mod })
              }} className='text-sm p-1.5 border rounded'>
                <option>Imagen</option>
                <option>Color</option>
                <option>Texto</option>
              </select>
            </div>
          </div>
          {
            information.variations?.nameVariation !== ''
              ? (
                <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                  {
                    information.variations?.nameVariations.map((variation, i) => (
                      <div key={i} className='flex gap-2'>
                        <div className='flex flex-col gap-2 w-96'>
                          <p className='text-sm'>{information.variations?.nameVariation} {i + 1}</p>
                          <input type='text' placeholder='Manga corta' value={variation.variation} onChange={(e: any) => {
                            let mod = information.variations
                            mod!.nameVariations[i].variation = e.target.value
                            setInformation({ ...information, variations: mod })
                          }} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        {
                          information.variations?.formatVariation === 'Color'
                            ? (
                              <div className='flex flex-col gap-2'>
                                <p>Color</p>
                                <input type='color' value={variation.colorVariation} onChange={(e: any) => {
                                  let mod = information.variations
                                  mod!.nameVariations[i].colorVariation = e.target.value
                                  setInformation({ ...information, variations: mod })
                                }} />
                              </div>
                            )
                            : ''
                        }
                      </div>
                    ))
                  }
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    const info = {...information}
                    info.variations?.nameVariations.push({ variation: '', colorVariation: '#000000' })
                    setInformation(info)
                  }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Agregar variación</button>
                </div>
              )
              : ''
          }
          {
            information.variations?.nameSubVariation !== undefined
              ? (
                <>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Ingresa el nombre de la subvariación</p>
                      <input onChange={(e: any) => {
                        let mod = information.variations
                        mod!.nameSubVariation = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} type='text' placeholder='Talla' value={information.variations.nameSubVariation} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                    </div>
                    <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Formato</p>
                    <select value={information.variations.formatSubVariation} onChange={(e: any) => {
                      let mod = information.variations
                      mod!.formatSubVariation = e.target.value
                      setInformation({ ...information, variations: mod })
                    }} className='text-sm p-1.5 border rounded'>
                      <option>Imagen</option>
                      <option>Color</option>
                      <option>Texto</option>
                    </select>
                  </div>
                </div>
                {
                  information.variations?.nameSubVariation !== ''
                    ? (
                      <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                        {
                          information.variations?.nameSubVariations?.map((variation, i) => (
                            <div key={i} className='flex gap-2'>
                              <div className='flex flex-col gap-2'>
                                <p className='text-sm'>{information.variations?.nameSubVariation} {i + 1}</p>
                                <input type='text' placeholder='Manga corta' value={variation.subVariation} onChange={(e: any) => {
                                  let mod = information.variations
                                  mod!.nameSubVariations![i].subVariation = e.target.value
                                  setInformation({ ...information, variations: mod })
                                }} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                              </div>
                              {
                                information.variations?.formatSubVariation === 'Color'
                                  ? (
                                    <div className='flex flex-col gap-2'>
                                      <p>Color</p>
                                      <input type='color' value={variation.colorSubVariation} onChange={(e: any) => {
                                        let mod = information.variations
                                        mod!.nameSubVariations![i].colorSubVariation = e.target.value
                                        setInformation({ ...information, variations: mod })
                                      }} />
                                    </div>
                                  )
                                  : ''
                              }
                            </div>
                          ))
                        }
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          const info = {...information}
                          info.variations?.nameSubVariations!.push({ subVariation: '', colorSubVariation: '#000000' })
                          setInformation(info)
                        }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Agregar variación</button>
                      </div>
                    )
                    : ''
                }
                {
                  information.variations?.nameSubVariation2 === '' || information.variations?.nameSubVariation2
                    ? ''
                    : (
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        let mod = information.variations
                        mod!.nameSubVariations2 = [{ subVariation2: '', colorSubVariation2: '#000000' }]
                        mod!.nameSubVariation2 = ''
                        setInformation({ ...information, variations: mod })
                      }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Crear segunda subvariación</button> 
                    )
                }
                </>
              )
              : (
                <button onClick={(e: any) => {
                  e.preventDefault()
                  let mod = information.variations
                  mod!.nameSubVariations = [{ subVariation: '', colorSubVariation: '#000000' }]
                  mod!.nameSubVariation = ''
                  setInformation({ ...information, variations: mod })
                }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Crear subvariación</button>
              )
          }
          {
            information.variations?.nameSubVariation2 !== undefined
              ? (
                <>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Ingresa el nombre de la segunda subvariación</p>
                      <input onChange={(e: any) => {
                        let mod = information.variations
                        mod!.nameSubVariation2 = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} type='text' placeholder='Modelo' value={information.variations.nameSubVariation2} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Formato</p>
                      <select value={information.variations.formatSubVariation2} onChange={(e: any) => {
                        let mod = information.variations
                        mod!.formatSubVariation2 = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} className='text-sm p-1.5 border rounded'>
                        <option>Imagen</option>
                        <option>Color</option>
                        <option>Texto</option>
                      </select>
                    </div>
                  </div>
                  {
                    information.variations?.nameSubVariation2 !== ''
                      ? (
                        <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                          {
                            information.variations?.nameSubVariations2?.map((variation, i) => (
                              <div key={i} className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                  <p className='text-sm'>{information.variations?.nameSubVariation2} {i + 1}</p>
                                  <input type='text' placeholder='Manga corta' value={variation.subVariation2} onChange={(e: any) => {
                                    let mod = information.variations
                                    mod!.nameSubVariations2![i].subVariation2 = e.target.value
                                    setInformation({ ...information, variations: mod })
                                  }} className='text-sm p-1.5 w-96 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                {
                                  information.variations?.formatSubVariation2 === 'Color'
                                    ? (
                                      <div className='flex flex-col gap-2'>
                                        <p>Color</p>
                                        <input type='color' value={variation.colorSubVariation2} onChange={(e: any) => {
                                          let mod = information.variations
                                          mod!.nameSubVariations2![i].colorSubVariation2 = e.target.value
                                          setInformation({ ...information, variations: mod })
                                        }} />
                                      </div>
                                    )
                                    : ''
                                }
                              </div>
                            ))
                          }
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const info = {...information}
                            info.variations?.nameSubVariations2!.push({ subVariation2: '', colorSubVariation2: '#000000' })
                            setInformation(info)
                          }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Agregar variación</button>
                        </div>
                      )
                      : ''
                  }
                </>
              )
              : ''
          }
          <button onClick={(e: any) => {
            e.preventDefault()
            let generatedVariations: any = []
            if (information.variations!.nameVariations?.length && information.variations!.nameVariations[0].variation !== '') {
              information.variations!.nameVariations.forEach(nameVariation => {
                if (information.variations!.nameSubVariations?.length && information.variations!.nameSubVariations[0].subVariation !== '') {
                  information.variations!.nameSubVariations.forEach(nameSubVariation => {
                    if (information.variations!.nameSubVariations2?.length && information.variations!.nameSubVariations2[0].subVariation2 !== '') {
                      information.variations!.nameSubVariations2?.forEach(nameSubVariation2 => {
                        const variation = {
                          variation: nameVariation.variation,
                          subVariation: nameSubVariation.subVariation,
                          subVariation2: nameSubVariation2.subVariation2,
                          stock: 0
                        }
                        generatedVariations.push(variation)
                      })
                    } else {
                      const variation = {
                        variation: nameVariation.variation,
                        subVariation: nameSubVariation.subVariation,
                        stock: 0
                      };
                      generatedVariations.push(variation)
                    }
                  })
                } else {
                  const variation = {
                    variation: nameVariation.variation,
                    stock: 0
                  }
                  generatedVariations.push(variation)
                }
              })
            } else if (information.variations!.nameVariations?.length) {
              information.variations!.nameVariations.forEach(nameVariation => {
                if (information.variations!.nameSubVariations?.length) {
                  information.variations!.nameSubVariations.forEach(nameSubVariation => {
                    const variation = {
                      variation: nameVariation.variation,
                      subVariation: nameSubVariation.subVariation,
                      stock: 0
                    }
                    generatedVariations.push(variation)
                  })
                } else {
                  const variation = {
                    variation: nameVariation.variation,
                    stock: 0
                  }
                  generatedVariations.push(variation)
                }
              })
            } else if (information.variations!.nameVariations.length > 0) {
              information.variations!.nameVariations.forEach(nameVariation => {
                const variation = {
                  variation: nameVariation.variation,
                  stock: 0
                }
                generatedVariations.push(variation)
              })
            }
            setInformation({ ...information, variations: { ...information.variations, variations: generatedVariations } })
          }} className='bg-main border border-main text-white w-fit py-1.5 px-6 rounded text-sm transition-colors duration-200 hover:bg-transparent hover:text-main'>Crear variantes</button>
          {
            information.variations?.nameVariation !== '' && information.variations?.variations.length
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
                    {
                      information.variations?.nameSubVariation2 !== undefined
                        ? <p className='text-sm w-32'>Subvariación 2</p>  
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
                            {

                            }
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
                            <p className='my-auto text-sm w-32'>{variation.variation}</p>
                            {
                              information.variations?.nameSubVariation !== undefined
                                ? (
                                  <p className='my-auto text-sm w-32'>{variation.subVariation}</p>
                                )
                                : ''
                            }
                            {
                              information.variations?.nameSubVariation2 !== undefined
                                ? (
                                  <p className='my-auto text-sm w-32'>{variation.subVariation2}</p>
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
                          </div>
                        </div>
                      ))
                      : ''
                  }
                </div>
              )
              : ''
          }
        </div>
      </div>
    </div>
  )
}
