import Link from 'next/link'
import React, { ChangeEvent } from 'react'

interface Props {
    setTempEmail: any
    automatization: any
    tempEmail: any
    setAutomatization: any
    storeData: any
}

export const Config: React.FC<Props> = ({ setTempEmail, automatization, tempEmail, setAutomatization, storeData }) => {
  return (
    <div className='flex flex-col gap-6'>
                      <div className='w-[600px] p-4 flex flex-col gap-4 bg-white rounded-md shadow-md dark:bg-neutral-800'>
                        <h2 className='font-medium text-lg'>Configuración correo</h2>
                        <div className='flex flex-col gap-2'>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Asunto:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, affair: e.target.value })} value={tempEmail.affair} type='text' placeholder='Asunto' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Titulo:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, title: e.target.value })} value={tempEmail.title} type='text' placeholder='Titulo' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Parrafo:</p>
                            <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTempEmail({ ...tempEmail, paragraph: e.target.value })} value={tempEmail.paragraph} placeholder='Parrafo' className='h-16 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Texto boton:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, buttonText: e.target.value })} value={tempEmail.buttonText} type='text' placeholder='Boton' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex'>
                            <p className='text-sm mt-auto mb-auto w-32'>Url:</p>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, url: e.target.value })} value={tempEmail.url} type='text' placeholder='Url' className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const data = automatization.automatization
                            data[tempEmail.index] = { ...data[tempEmail.index], affair: tempEmail.affair, buttonText: tempEmail.buttonText, paragraph: tempEmail.paragraph, title: tempEmail.title, url: tempEmail.url }
                            setAutomatization({ ...automatization, automatization: data })
                            setTempEmail({
                              affair: '',
                              buttonText: '',
                              paragraph: '',
                              title: '',
                              url: '',
                              index: 0
                            })
                          }} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-32 mt-2 h-8 hover:bg-transparent hover:text-main'>Guardar</button>
                        </div>
                      </div>
                      <div className='flex flex-col h-fit gap-4 p-4 bg-white w-[600px] dark:bg-neutral-800'>
                        <img className='w-40 mx-auto' src='https://res.cloudinary.com/blasspod/image/upload/v1692831635/blaspod/swiq7waalipkcq2dsucq.png' />
                        <h1 className='text-center mx-auto text-3xl font-medium'>{tempEmail.title}</h1>
                        <p className='text-center mx-auto'>{tempEmail.paragraph}</p>
                        {
                          tempEmail.buttonText !== ''
                            ? <Link className='py-2 px-7 bg-main rounded w-fit m-auto text-white' href={tempEmail.url}>{tempEmail.buttonText}</Link>
                            : ''
                        }
                        <div className='border-t pt-6 px-6 flex gap-4 justify-between dark:border-neutral-700'>
                          {
                            storeData
                              ? (
                                <>
                                  <div className='flex flex-col gap-2'>
                                    <p className='text-sm'>{storeData.name}</p>
                                    <p className='text-sm'>{storeData.email}</p>
                                    <p className='text-sm'>{storeData.phone}</p>
                                  </div>
                                  <div className='flex flex-col gap-2'>
                                    <p className='text-sm text-right'>{storeData.address}</p>
                                    <p className='text-sm text-right'>{storeData.city}, {storeData.region}</p>
                                  </div>
                                </>
                              )
                              : ''
                          }
                        </div>
                      </div>
                    </div>
  )
}
