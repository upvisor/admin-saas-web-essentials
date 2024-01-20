import React from 'react'

interface Props {
    setEmail: any
    email: any
    setDate: any
    date: any
}

export const Config: React.FC<Props> = ({ setEmail, email, setDate, date }) => {
  return (
    <div className='p-4 flex flex-col gap-4 m-auto bg-white w-96 rounded-md shadow-md dark:bg-neutral-800'>
      <h2 className='text-lg font-medium'>Contenido</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Titulo</p>
        <input type='text' placeholder='Titulo' onChange={(e: any) => setEmail({...email, title: e.target.value})} value={email.title} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Parrafo</p>
        <textarea placeholder='Parrafo' onChange={(e: any) => setEmail({...email, paragraph: e.target.value})} value={email.paragraph} className='p-1.5 rounded border text-sm w-full h-20 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Texto boton</p>
        <input type='text' placeholder='Boton' onChange={(e: any) => setEmail({...email, buttonText: e.target.value})} value={email.buttonText} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Link boton</p>
        <input type='text' placeholder='Url' onChange={(e: any) => setEmail({...email, url: e.target.value})} value={email.url} className='p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Programar envio</p>
        <div className='flex gap-2'>
          <input type='radio' name='send' onClick={() => setEmail({...email, date: undefined})} />
          <p className='text-sm'>En este momento</p>
        </div>
        <div className='flex gap-2'>
          <input type='radio' name='send' onClick={() => setDate(true)} />
          <p className='text-sm'>Fecha personalizada</p>
        </div>
        {
          date
            ? (
              <div className='flex gap-2'>
                <input type='datetime-local' onChange={(e: any) => setEmail({...email, date: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}
