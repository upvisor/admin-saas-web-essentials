import axios from 'axios'
import React from 'react'
import { Spinner2 } from '../ui'

interface Props {
    clientTags: any
    clientData: any
    setClientData: any
    setLoadingClientTag: any
    setNewClientTag: any
    newClientTag: any
    getClientTags: any
    loadingClientTag: any
}

export const Tags: React.FC<Props> = ({ clientTags, clientData, setClientData, setLoadingClientTag, setNewClientTag, newClientTag, getClientTags, loadingClientTag }) => {
  return (
    <div className='bg-white flex flex-col gap-4 border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='font-medium text-md'>Tags</h2>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Tags</p>
                  {
                    clientTags?.length
                      ? <div className='flex gap-2'>
                        {
                          clientTags.map((tag: any) => (
                            <div className='flex gap-1' key={tag.tag}>
                              <input onChange={(e: any) => {
                                if (clientData.tags) {
                                  if (e.target.checked) {
                                    const tags = clientData.tags.concat(e.target.value)
                                    setClientData({...clientData, tags: tags})
                                  } else {
                                    const filter = clientData.tags.filter((tag: any) => tag !== e.target.value)
                                    setClientData({...clientData, tags: filter})
                                  }
                                } else {
                                  setClientData({...clientData, tags: [e.target.value]})
                                }
                              }} value={tag.tag} type='checkbox' checked={clientData.tags?.find((e: any) => e === tag.tag) ? true : false} />
                              <p className='text-sm'>{tag.tag}</p>
                            </div>
                          ))
                        }
                      </div>
                      : <p className='text-sm'>No hay tags creados</p>
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Nuevo tag</p>
                  <div className='flex gap-2'>
                    <input type='text' placeholder='Nuevo tag' onChange={(e: any) => setNewClientTag(e.target.value)} value={newClientTag} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                    <button onClick={async (e: any) => {
                      e.preventDefault()
                      setLoadingClientTag(true)
                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newClientTag })
                      setNewClientTag('')
                      setLoadingClientTag(false)
                      getClientTags()
                    }} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded h-8 w-24 hover:bg-transparent hover:text-main'>{loadingClientTag ? <Spinner2 /> : 'Crear'}</button>
                  </div>
                </div>
              </div>
  )
}
