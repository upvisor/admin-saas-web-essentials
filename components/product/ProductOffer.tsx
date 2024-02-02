import { IProduct } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProductsOffer } from '../../interfaces/products'

interface Props {
  productsOffer: IProductsOffer[]
  setProductsOffer: any
}

export const ProductOffer: React.FC<Props> = ({productsOffer, setProductsOffer}) => {

  const [products, setProducts] = useState<IProduct[]>([])
  const [rotate, setRotate] = useState('rotate-90')

  const getProducts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])
    
  return (
    <div className='bg-white p-4 flex flex-col gap-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <button onClick={(e: any) => {
        e.preventDefault()
        if (rotate === 'rotate-90') {
          setRotate('-rotate-90')
        } else {
          setRotate('rotate-90')
        }
      }} className='flex gap-3 w-fit'>
        <h2 className='font-medium'>Ofertas complementarias</h2>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
      </button>
      <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex-col gap-4`}>
        {
          productsOffer.length
          ? (
            productsOffer?.map((sale, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <h3 className='text-sm font-medium'>Oferta {index + 1}</h3>
                <p className='text-sm'>Selecciona los productos para esta oferta</p>
                <select onChange={(e: any) => {
                  const updatedProducts = productsOffer.map((productOffer, index1) => {
                    const productFind = products.find(product => product.name === e.target.value)
                    const productArray: any = [productFind]
                    if (index1 === index) {
                      return {
                        ...productOffer,
                        productsSale: productOffer.productsSale.concat(productArray)
                      }
                    }
                    return {
                      ...productOffer
                    }
                  })
                  setProductsOffer(updatedProducts)
                }} className='p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                  <option>Seleccionar productos</option>
                  {
                    products.length
                      ? products.map(product => (
                        <option key={product._id}>{product.name}</option>
                      ))
                      : ''
                  }
                </select>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Precio oferta</p>
                  <input type='text' placeholder='Precio oferta' value={productsOffer[index].price!} onChange={(e: any) => {
                    const updatedProducts = productsOffer.map((productOffer, index1) => {
                      if (index1 === index) {
                        return {
                          ...productOffer,
                          price: e.target.value
                        }
                      }
                      return {
                        ...productOffer
                      }
                    })
                    setProductsOffer(updatedProducts)
                  }} className='p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex gap-2 flex-wrap'>
                  {
                    sale.productsSale?.map(product => (
                      <div className='flex gap-2 rounded-lg border p-2 w-56 dark:border-neutral-600' key={product.name}>
                        <img className='w-20 h-20 mt-auto mb-auto rounded-lg' src={product.images[0].url} />
                        <div className='mt-auto mb-auto'>
                          <p className='text-sm'>{product.name}</p>
                          <p className='text-sm'>${NumberFormat(product.price)}</p>
                          {
                            product.beforePrice
                              ? <p className='text-xs line-through'>${NumberFormat(product.beforePrice)}</p>
                              : ''
                          }
                        </div>
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          const updatedProducts = productsOffer.map((productOffer, index1) => {
                            if (index1 === index) {
                              return {
                                ...productOffer,
                                productsSale: productOffer.productsSale.filter(productSale => productSale.name !== product.name)
                              }
                            }
                            return {
                              ...productOffer
                            }
                          })
                          setProductsOffer(updatedProducts)
                        }}><AiOutlineClose /></button>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          )
          : ''
        }
        {
          productsOffer.length
            ? (
              <button onClick={(e: any) => {
                e.preventDefault()
                setProductsOffer(productsOffer.concat([{productsSale: [], price: 0}]))
              }} className='bg-main border border-main block py-1.5 px-6 text-white w-fit text-sm rounded transition-colors duration-200 hover:bg-transparent hover:text-main'>Crear otra oferta</button>
            )
            : ''
        }
      </div>
    </div>
  )
}
