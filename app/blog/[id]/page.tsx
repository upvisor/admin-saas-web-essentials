"use client"
import { Content, Image, Seo, Visibility } from '@/components/blog'
import { Spinner, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { id: string } }) {

  const [contentData, setContentData] = useState({
    _id: '',
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

  const getPost = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`)
    setContentData({
      _id: res.data._id,
      title: res.data.title,
      state: res.data.state,
      image: res.data.image,
      description: res.data.description,
      titleSeo: res.data.titleSeo,
      descriptionSeo: res.data.descriptionSeo
    })
    setContent(res.data.content)
  }

  useEffect(() => {
    getPost()
  }, [])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/${contentData._id}`, contentData)
    router.push('/blog')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>Post {contentData?._id}</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-full'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-32 h-9 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Guardar post'}</button>
              <Link className='pt-1.5 pb-1.5 text-sm rounded-md pl-4 pr-4 my-auto' href='/blog'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 mb-16 w-full overflow-y-auto bg-[#f6f6f7] dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          {
            contentData._id !== ''
              ? (
                  <>
                    <div className='flex gap-2 w-full max-w-1280 m-auto mb-4'>
                      <Link href='/blog' className='border rounded transition-colors duration-150 p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-xl font-medium my-auto'>Post {contentData._id}</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='flex gap-4 max-w-1280 m-auto'>
                      <div className='flex gap-4 flex-col w-2/3'>
                        <Content setContentData={setContentData} contentData={contentData} setContent={setContent} content={content} />
                        <Seo setContentData={setContentData} contentData={contentData} />
                      </div>
                      <div className='w-1/3 flex flex-col gap-4'>
                        <Visibility setContentData={setContentData} contentData={contentData} />
                        <Image contentData={contentData} setContentData={setContentData} />
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