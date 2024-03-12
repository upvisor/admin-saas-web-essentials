import React from 'react'
import { ProductCard } from '.'
import { ICategory, IPage, IProduct } from '@/interfaces'

interface Props {
    edit: any
    order: any
    setOrder: any
    productsOrder: IProduct[] | undefined
    setPages: any
    design: any
    categories: ICategory[]
    pages: IPage[]
    index: number
    i: number
}

export const Products: React.FC<Props> = ({ edit, order, setOrder, productsOrder, setPages, design, categories, pages, index, i }) => {
  return (
    <div className='px-2'>
                                                  <div className="w-full flex">
                                                    <div className="max-w-[1600px] w-full m-auto flex gap-4 justify-between flex-wrap">
                                                      <button>Filtros</button>
                                                      <select value={order} onChange={(e: any) => setOrder(e.target.value)} className="border rounded py-1 w-44">
                                                        <option>Más recientes</option>
                                                        <option>Mayor precio</option>
                                                        <option>Menor precio</option>
                                                      </select>
                                                    </div>
                                                  </div>
                                                  <div className="w-full flex">
                                                    {
                                                      edit !== 'Productos'
                                                        ? (
                                                          <div className="w-full max-w-[1600px] m-auto flex flex-wrap justify-around">
                                                            {
                                                              productsOrder?.map(product => (
                                                                <ProductCard key={product._id} product={product} />
                                                              ))
                                                            }
                                                          </div>
                                                        )
                                                        : (
                                                          <div className="w-full max-w-[1600px] m-auto flex flex-col gap-4 flex-wrap justify-around">
                                                            <div className='m-auto flex flex-wrap justify-around w-full'>
                                                              {
                                                                productsOrder?.map(product => (
                                                                  <ProductCard key={product._id} product={product} />
                                                                ))
                                                              }
                                                            </div>
                                                            <div className='flex gap-2 m-auto'>
                                                              <p className='m-auto'>Selecciona los productos que se mostraran</p>
                                                              <select value={design.info.products} onChange={(e: any) => {
                                                                const oldPages = [...pages]
                                                                oldPages[i].design[index].info.products = e.target.value
                                                                setPages(oldPages)
                                                              }} className='p-1.5 rounded border'>
                                                                <option>Seleccionar</option>
                                                                <option>Productos en oferta</option>
                                                                {
                                                                  categories.map(category => (
                                                                    <option key={category._id}>{category.category}</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div>
                                                          </div>
                                                        )
                                                    }
                                                  </div>
                                                </div>
  )
}
