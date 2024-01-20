"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Spinner, Spinner2 } from '../../../components/ui/'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

export default function Page () {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [categorySelect, setcategorySelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const router = useRouter()

  const getCategories = async () => {
    setLoadingCategories(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(res.data)
    setLoadingCategories(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySelect._id}`)
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Categorías</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 z-50 right-0 fixed flex bg-black/20 dark:bg-black/40`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar la categoria <strong>{categorySelect.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCategory} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-36 rounded-md text-white hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full min-h-full bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl font-medium'>Categorías</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main text-white transition-colors duration-200 hover:bg-transparent hover:text-main' href='/productos/categorias/nueva-categoria'>Nueva categoría</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loadingCategories
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : categories.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-medium'>Categoría</th>
                          <th className='text-left p-2 font-medium'>Slug</th>
                          <th className='text-left p-2 font-medium'>Cantidad productos</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          categories.map((category: any) => (
                            <tr key={category._id} className='border-b cursor-pointer transition-colors duration-150 w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'>
                              <td className='flex gap-2 p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <img className='w-20' src={category.image?.url} alt={category.category} />
                                <div className='mt-auto mb-auto w-full'>
                                  <p>{category.category}</p>
                                </div>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <p>{category.slug}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <p>{products.length ? products.filter((product: any) => product.category.category === category.category).length : ''}</p>
                              </td>
                              <td className='p-2'>
                                <button onClick={async(e: any) => {
                                  e.preventDefault()
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                  setcategorySelect({ _id: category._id!, name: category.category })
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : <p>No hay categorias</p>
            }
          </div>
        </div>
    </>
  )
}