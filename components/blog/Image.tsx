"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { Card, Spinner } from '../ui'
import Imagea from 'next/image'
import { IPost } from '@/interfaces'

interface Props {
    contentData: IPost
    setContentData: any
}

export const Image: React.FC<Props> = ({ contentData, setContentData }) => {

  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  const imageChange = async (e: any) => {
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
      setContentData({...contentData, image: data})
      setLoadingImage(false)
    } catch (error) {
      setLoadingImage(false)
      setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
    }
  }

  return (
    <Card title='Imagen principal'>
      <input type='file' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' onChange={imageChange} />
      {
        errorImage !== ''
          ? <p className='bg-red-500 text-white px-2 py-1'>{errorImage}</p>
          : ''
      }
      {
        loadingImage
          ? (
            <div className='flex w-full'>
              <div className='w-fit m-auto'>
                <Spinner />
              </div>
            </div>
          )
          : contentData.image && contentData.image !== ''
            ? <Imagea src={contentData.image} alt={`Imagen principal del blog ${contentData.title}`} width={400} height={400} className='object-contain w-fit' />
            : ''
      }
    </Card>
  )
}
