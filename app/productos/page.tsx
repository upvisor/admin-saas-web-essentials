"use client"
import { Spinner, Spinner2 } from '@/components/ui'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [productSelect, setProductSelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [products, setProducts] = useState([])

  const router = useRouter()

  const getProducts = async () => {
    setLoadingProducts(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(res.data)
    setLoadingProducts(false)
  }
  
  useEffect(() => {
    getProducts()
  }, [])

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSelect._id}`)
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 right-0 fixed w-full z-50 flex -top-[49px] bg-black/20 dark:bg-black/40`} style={{ height: 'calc(100vh + 49px)' }}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar el producto <strong>{productSelect.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteProduct} className='bg-red-600 h-10 w-36 rounded border border-red-600 text-white transition-colors duration-200 hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 w-full h-full bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl font-medium'>Productos</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded bg-main border border-main transition-colors duration-200 text-white hover:bg-transparent hover:text-main' href='/productos/nuevo-producto'>Nuevo producto</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loadingProducts
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : products.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-medium'>Producto</th>
                          <th className='text-left p-2 font-medium'>Precio</th>
                          <th className='text-left p-2 font-medium'>Estado</th>
                          <th className='text-left p-2 font-medium'>Stock</th>
                          <th className='text-left p-2 font-medium'>Categoria</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          products.map((product: any) => (
                            <tr className='border-b cursor-pointer w-full transition-colors duration-150 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={product._id}>
                              <td className='flex gap-2 p-2' style={{width: '100%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                                <img className='w-20' src={product.images[0].url} />
                                <div className='mt-auto mb-auto w-full'>
                                  <p>{product.name}</p>
                                </div>
                              </td>
                              <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                                <p>${NumberFormat(product.price)}</p>
                                {
                                  product.beforePrice
                                    ? <p className='text-sm line-through'>${NumberFormat(product.beforePrice)}</p>
                                    : ''
                                }
                              </td>
                              <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                                {
                                  product.state === true
                                    ? <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                    : <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Borrador</p>
                                }
                              </td>
                              <td className='p-2' style={{width: '10%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                                <p>{product.stock}</p>
                              </td>
                              <td className='p-2' style={{width: '20%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                                <p>{product.category.category}</p>
                              </td>
                              <td className='p-2'>
                                <button onClick={async(e: any) => {
                                  e.preventDefault()
                                  setProductSelect({ _id: product._id!, name: product.name })
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : 'No hay productos'
            }
          </div>
        </div>
    </>
  )
}