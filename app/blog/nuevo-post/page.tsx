"use client"
import { Spinner2 } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import { Content, Image, Seo, Visibility } from '@/components/blog'

export default function Page () {

  const [contentData, setContentData] = useState({
    title: '',
    state: false,
    image: { public_id: '', url: '' },
    description: '',
    titleSeo: '',
    descriptionSeo: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [content, setContent] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, { ...contentData, content: content })
    router.push('/blog')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nuevo post</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
        <div className='flex m-auto w-full'>
          <div className='flex gap-2 ml-auto w-fit'>
            <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-32 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Crear post'}</button>
            <Link className='my-auto pt-1.5 pb-1.5 text-sm rounded pl-4 pr-4' href='/blog'>Descartar</Link>
          </div>
        </div>
      </div>
      <div className=' overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
        <div className='p-6 flex flex-col gap-4 w-full bg-[#f6f6f7] dark:bg-neutral-900'>
          <div className='flex gap-3 w-full max-w-1280 m-auto'>
            <Link href='/blog' className='border rounded p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl my-auto font-medium'>Nuevo post</h1>
          </div>
          <form onSubmit={handleSubmit} className='flex gap-4 w-full m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              
              <Seo setContentData={setContentData} contentData={contentData} />
            </div>
            <div className='w-1/3 flex flex-col gap-4'>
              <Visibility setContentData={setContentData} contentData={contentData} />
              <Image contentData={contentData} setContentData={setContentData} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}