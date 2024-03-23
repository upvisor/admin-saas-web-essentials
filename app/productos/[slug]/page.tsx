"use client"
import { NewCategoryModal, Spinner, Spinner2 } from '@/components/ui'
import { IProduct } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'
import Head from 'next/head'
import { ICategory } from '../../../interfaces'
import { CategoryProduct, Information, Media, NameDescription, Price, ProductOffer, ProductSeo, QuantityOffers, StockVariations, Visibility } from '@/components/product'
import { IProductsOffer } from '../../../interfaces/products'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Page ({ params }: { params: { slug: string } }) {

  const [information, setInformation] = useState<IProduct>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [quantityOffers, setQuantityOffers] = useState([{
    quantity: undefined,
    descount: undefined
  }])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getProduct = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug}`)
    setInformation(data)
    setProductsOffer(data.productsOffer?.length ? data.productsOffer : [{productsSale: [], price: 0}])
    setQuantityOffers(data.quantityOffers?.length ? data.quantityOffers : [{
      quantity: undefined,
      descount: undefined
    }])
  }

  const getCategories = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(data)
  }

  useEffect(() => {
    getProduct()
    getCategories()
  }, [])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`, { name: information?.name, description: information?.description, category: information?.category, price: information?.price, beforePrice: information?.beforePrice, images: information?.images, stock: information?.stock, slug: information?.slug, state: information?.state, tags: information?.tags, titleSeo: information?.titleSeo, descriptionSeo: information?.descriptionSeo, variations: information?.variations, productsOffer: productsOffer, cost: information?.cost, quantityOffers: quantityOffers, informations: information?.informations })
    router.push('/productos')
  }

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`)
    router.push('/productos')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{information?.name}</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 right-0 w-full h-full top-0 z-50 left-0 fixed flex bg-black/20 dark:bg-black/40`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white border border-white m-auto dark:bg-neutral-800 dark:border-neutral-700'>
            <p>Estas seguro que deseas eliminar el producto <strong>{information?.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteProduct} className='bg-red-600 border border-red-600 transition-colors duration-200 h-9 w-32 rounded text-white hover:bg-transparent hover:text-red-600'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
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
              <button onClick={handleSubmit} className='bg-main border border-main text-white text-sm rounded w-44 h-9 transition-colors duration-200 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Modificar producto'}</button>
              <Link className='pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal setCategories={setCategories} newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 w-full bg-[#f6f6f7] overflow-y-auto mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 65px)' }}>
          {
            information
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl font-medium mt-auto mb-auto'>{ information.name }</h1>
                  </div>
                  <form className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <NameDescription information={information} setInformation={setInformation} />
                      <Media information={information} setInformation={setInformation} />
                      <StockVariations information={information} setInformation={setInformation} />
                      <ProductOffer productsOffer={productsOffer} setProductsOffer={setProductsOffer} />
                      <Information information={information} setInformation={setInformation} />
                      <ProductSeo information={information} setInformation={setInformation} />
                    </div>
                    <div className='w-1/3 flex flex-col gap-4'>
                      <Visibility setInformation={setInformation} information={information} />
                      <Price information={information} setInformation={setInformation} />
                      <QuantityOffers quantityOffers={quantityOffers} setQuantityOffers={setQuantityOffers} />
                      <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} newCategory={newCategory} />
                      <div className='bg-white p-4 flex flex-col gap-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='font-medium'>Eliminar producto</h2>
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }} className='bg-red-600 border border-red-600 transition-colors duration-200 pt-1.5 pb-1.5 text-white text-sm rounded w-20 hover:bg-transparent hover:text-red-600'>Eliminar</button>
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