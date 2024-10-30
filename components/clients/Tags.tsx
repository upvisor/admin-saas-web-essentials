import axios from 'axios'
import React from 'react'
import { ButtonSubmit2, Card, Input } from '../ui'
import { IClient } from '@/interfaces'

interface Props {
    clientTags: any
    clientData: IClient
    setClientData: any
    setLoadingClientTag: any
    setNewClientTag: any
    newClientTag: any
    getClientTags: any
    loadingClientTag: any
}

export const Tags: React.FC<Props> = ({ clientTags, clientData, setClientData, setLoadingClientTag, setNewClientTag, newClientTag, getClientTags, loadingClientTag }) => {
  return (
    <Card title='Tags'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Tags</p>
        {
          clientTags?.length
            ? <div className='flex gap-2 flex-wrap'>
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
          <Input placeholder='Nuevo tag' change={(e: any) => setNewClientTag(e.target.value)} value={newClientTag} />
          <ButtonSubmit2 action={async (e: any) => {
            e.preventDefault()
            if (!loadingClientTag) {
              setLoadingClientTag(true)
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newClientTag })
              setNewClientTag('')
              setLoadingClientTag(false)
              getClientTags()
            }
          }} color='main' submitLoading={loadingClientTag} textButton='Crear tag' config='w-32' />
        </div>
      </div>
    </Card>
  )
}
