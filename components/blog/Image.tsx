import axios from 'axios'
import React from 'react'

interface Props {
    contentData: any
    setContentData: any
}

export const Image: React.FC<Props> = ({ contentData, setContentData }) => {

  const imageChange = async (e: any) => {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setContentData({...contentData, image: { public_id: data.image.public_id, url: data.image.url }})
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border flex flex-col gap-4 border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>Imagen principal</h2>
      <input type='file' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' onChange={imageChange} />
      {
        contentData.image.url !== ''
          ? <img src={contentData.image.url} />
          : ''
      }
    </div>
  )
}
