import React from 'react'

interface Props {
    setContentData: any
    contentData: any
}

export const Seo: React.FC<Props> = ({ setContentData, contentData }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='font-medium'>SEO</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Meta titulo</p>
        <input type='text' placeholder='Meta titulo' onChange={(e: any) => setContentData({ ...contentData, titleSeo: e.target.value })} value={contentData.titleSeo} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Meta descripción</p>
        <textarea placeholder='Meta descripción' onChange={(e: any) => setContentData({ ...contentData, descriptionSeo: e.target.value })} value={contentData.descriptionSeo} className='p-1.5 rounded border text-sm w-full h-32 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
