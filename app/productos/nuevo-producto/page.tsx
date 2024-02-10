"use client"
import { CategoryProduct, Information, Media, NameDescription, Price, ProductOffer, ProductSeo, QuantityOffers, StockVariations, Visibility } from '@/components/product'
import { NewCategoryModal, Spinner2 } from '@/components/ui'
import { ICategory, IProduct, IProductsOffer } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [information, setInformation] = useState<IProduct>({
    name: '',
    description: '',
    category: { category: '', slug: '' },
    price: 0,
    images: [],
    stock: 0,
    slug: '',
    state: false,
    tags: [],
    titleSeo: '',
    descriptionSeo: '',
    variations: { nameVariation: '', variations: [{ variation: '', stock: 0 }] },
    informations: [{ title: '', description: '', image: { public_id: '', url: '' }, align: 'Izquierda' }]
  })
  const [categories, setCategories] = useState<ICategory[]>()
  const [quantityOffers, setQuantityOffers] = useState([{
    quantity: undefined,
    descount: undefined
  }])

  const initial = {
    name: ''
  }

  const [newCategory, setNewCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  const getCategories = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    if (response.data) {
      setCategories(response.data)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, { name: information?.name, description: information?.description, category: information?.category, price: information?.price, beforePrice: information?.beforePrice, images: information?.images, stock: information?.stock, slug: information?.slug, state: information?.state, tags: information?.tags, titleSeo: information?.titleSeo, descriptionSeo: information?.descriptionSeo, variations: information?.variations, productsOffer: productsOffer, cost: information?.cost, quantityOffers: quantityOffers, informations: information.informations })
    router.push('/productos')
  }

  return (
    <>
      <Head>
        <title>Nuevo Producto</title>
      </Head>
        <div className='fixed flex w-full bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                information.name === initial.name
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed text-white text-sm rounded w-40 h-9'>Crear producto</button>
                  : <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-40 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Crear producto'}</button>
              }
              <Link className='pt-1.5 pb-1.5 my-auto text-sm rounded pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal setCategories={setCategories} newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 w-full overflow-y-auto bg-[#f6f6f7] mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 65px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/productos' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto font-medium'>Nuevo Producto</h1>
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
              <Visibility information={information} setInformation={setInformation} />
              <Price information={information} setInformation={setInformation} />
              <QuantityOffers quantityOffers={quantityOffers} setQuantityOffers={setQuantityOffers} />
              <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} newCategory={newCategory} />
            </div>
          </form>
        </div>
    </>
  )
}