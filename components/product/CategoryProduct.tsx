import { ICategory, IProduct, ITag } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
  categories: ICategory[] | undefined
  setNewCategory: any
  newCategory: any
}

export const CategoryProduct: React.FC<Props> = ({information, setInformation, categories, setNewCategory, newCategory}) => {

  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)

  const getTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
    setTags(response.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const tagChange = (e: any) => {
    setTag(e.target.value)
  }

  const inputTagChange = (e: any) => {
    if (e.target.checked) {
      setInformation({...information, tags: information.tags.concat([e.target.name])})
    } else {
      const tagsFilter = information.tags.filter(tag => tag !== e.target.name)
      setInformation({...information, tags: tagsFilter})
    }
  }

  const newTagSubmit = async (e: any) => {
    e.preventDefault()
    setTagLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {tag: tag})
    getTags()
    setTag('')
    setTagLoading(false)
  }

  return (
    <div className='bg-white p-4 flex flex-col gap-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-4'>
        <h2 className='font-medium'>Otros</h2>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Categoría</p>
          <select value={information.category.category} onChange={(e: any) => {
            const category = categories?.find(category => category.category === e.target.value)
            setInformation({ ...information, category: { category: category?.category, slug: category?.slug } })
          }} name='category' className='p-1.5 rounded w-full border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
            <option>Seleccionar categoría</option>
            {
              categories?.map(category => (
                <option key={category._id}>{category.category}</option>
              ))
            }
          </select>
        </div>
        <button onClick={(e: any) => {
          e.preventDefault()
          setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-1' })
          }, 10)
        }} className='bg-main border border-main transition-colors duration-200 pt-1.5 pb-1.5 text-white text-sm rounded px-6 w-fit hover:bg-transparent hover:text-main'>Crear nueva categoria</button>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Tags</p>
          {
            tags?.length
              ? (
                <div className='flex gap-2 flex-wrap mb-2'>
                  {tags.map(tag => (
                    <div className='flex gap-1' key={tag._id?.toString()}>
                      <input type='checkbox' checked={information.tags.find(e => e === tag.tag) ? true : false} name={tag.tag.toString()} onChange={inputTagChange} />
                      <span className='text-sm'>{tag.tag}</span>
                    </div>
                  ))}
                </div>
              )
              : ''
          }
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Nuevo tag</p>
          <div className='flex gap-2'>
            <input type='text' placeholder='Nuevo Tag' onChange={tagChange} value={tag} className='p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            <button onClick={newTagSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded h-full w-24 hover:bg-transparent hover:text-main'>{tagLoading ? <Spinner2 /> : 'Crear'}</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Url</p>
        <input type='text' placeholder='Slug del producto' name='slug' onChange={inputChange} value={information.slug} className='p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
