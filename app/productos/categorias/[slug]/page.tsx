"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../../interfaces/categories'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { NameDescription, CategorySeo, Media } from '@/components/categories'

export default function Page ({ params }: { params: { slug: string } }) {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>()
  const [updatingLoading, setUpdatingLoading] = useState(false)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getCategory = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${params.slug}`)
    setCategoryInfo(data)
  }

  useEffect(() => {
    getCategory()
  }, [])

  const handleSubmit = async () => {
    setUpdatingLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`, categoryInfo)
    router.push('/productos/categorias')
  }

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`)
    router.push('/productos/categorias')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{categoryInfo?.category}</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white border border-white m-auto dark:bg-neutral-800 dark:border-neutral-700'>
            <p>Estas seguro que deseas eliminar la categoria <strong>{categoryInfo?.category}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCategory} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-32 rounded-md text-white hover:bg-transparent hover:text-main'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-44 h-9 hover:bg-transparent hover:text-main'>{updatingLoading ? <Spinner2 /> : 'Modificar categoría'}</button>
              <Link className='pt-1.5 pb-1.5 text-sm rounded my-auto pl-4 pr-4' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          {
            categoryInfo
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos/categorias' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl font-medium mt-auto mb-auto'>{ categoryInfo.category }</h1>
                  </div>
                  <form className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <NameDescription categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <CategorySeo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                    </div>
                    <div className='flex gap-4 flex-col w-1/3'>
                      <Media categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <div className='bg-white flex flex-col gap-4 p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Eliminar categoria</h2>
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }} className='bg-red-600 border border-red-600 transition-colors duration-200 pt-1.5 pb-1.5 text-white text-sm rounded w-20 hover:bg-transparent hover:text-main'>Eliminar</button>
                      </div>
                    </div>
                  </form>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
    </>
  )
}