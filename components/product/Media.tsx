import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from 'react-icons/ci'
import { IoTrashOutline } from "react-icons/io5"

interface Props {
  information: IProduct
  setInformation: any
}

export const Media: React.FC<Props> = ({ information, setInformation }) => {

  const [indexSelected, setIndexSelected] = useState(-1)
  const [trash, setTrash] = useState(-1)

  const onDrop = (acceptedFiles: any) => {
    let images = information.images
    acceptedFiles.map(async (acceptedFile: any) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: acceptedFile}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      images = images.concat({ public_id: response.data.image.public_id, url: response.data.image.url })
      setInformation({...information, images: images})
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleMouseUp = (index: number) => {
    if (indexSelected !== null && indexSelected !== index) {
      const updatedImages = [...information.images]
      const temp = updatedImages[indexSelected]
      updatedImages[indexSelected] = updatedImages[index]
      updatedImages[index] = temp
      setInformation({
        ...information,
        images: updatedImages,
      })
    }
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...information.images]
    updatedImages.splice(index, 1)
    setInformation({ ...information, images: updatedImages })
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4 font-medium'>Elementos muntimedia</h2>
      <div className='flex gap-2 flex-wrap'>
        <div {...getRootProps()} className={`flex w-28 h-28 border transition-colors duration-200 rounded-lg cursor-pointer dark:bg-neutral-700 dark:border-neutral-600 ${isDragActive ? 'bg-neutral-100' : 'bg-white'} hover:bg-neutral-100 dark:hover:bg-neutral-600`}>
          <div className='w-28 h-28 flex'>
            <input {...getInputProps()} />
            <CiImageOn className='text-3xl m-auto text-neutral-400' />
          </div>
        </div>
        {
          information.images
            ? information.images.map((image, index) => (
              <>
                <img onMouseEnter={() => setTrash(index)} onMouseLeave={() => setTrash(-1)} onMouseDown={() => setIndexSelected(index)} onMouseUp={() => handleMouseUp(index)} onClick={() => handleDeleteImage(index)} className='w-28 h-28 shadow-md rounded-md cursor-pointer' draggable={false} key={image.public_id} src={image.url} />
                <IoTrashOutline onMouseEnter={() => setTrash(index)} className={`${trash === index ? 'opacity-1' : 'opacity-0'} transition-opacity duration-150 cursor-pointer -ml-20 mt-10 mr-[42px] text-3xl dark:text-black`} />
              </>
            ))
            : ''
        }
      </div>
    </div>
  )
}
