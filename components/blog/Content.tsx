import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Props {
    setContentData: any
    contentData: any
    setContent: any
    content: any
}

export const Content: React.FC<Props> = ({ setContentData, contentData, setContent, content }) => {
  return (
    <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Titulo</p>
        <input type='text' placeholder='Titulo del post' onChange={(e: any) => setContentData({ ...contentData, title: e.target.value })} value={contentData.title} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Descripción</p>
        <textarea placeholder='Descripción del post' onChange={(e: any) => setContentData({ ...contentData, description: e.target.value })} value={contentData.description} className='p-1.5 rounded border h-24 text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Contenido</p>
        <div>
          <ReactQuill modules={{
            toolbar: [
              [{ header: [ false, 1, 2, 3, 4] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'image', 'video'],
              ['clean']
            ],
            clipboard: {
              matchVisual: false,
            }
          }} theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  )
}
