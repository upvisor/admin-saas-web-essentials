import { IEmailAutomatization } from '@/interfaces'
import React from 'react'

interface Props {
    email: any
    index: any
    setAutomatization: any
    automatization: any
    setTempEmail: any
}

export const Step: React.FC<Props> = ({ email, index, setAutomatization, automatization, setTempEmail }) => {

  const editEmail = (email: IEmailAutomatization, index: any, e: any) => {
    e.preventDefault()
    setTempEmail({ affair: email.affair, buttonText: email.buttonText, index: index, paragraph: email.paragraph, title: email.title, url: email.url })
  }

  return (
    <>
      <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
      <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
        <p>Tiempo de espera</p>
        <div className='flex gap-2'>
          <input onChange={(e: any) => {
            const data = automatization.automatization
            data[index].number = e.target.value
            setAutomatization({ ...automatization, automatization: data })
          }} value={automatization.automatization[index].number} type='text' placeholder='Tiempo' className='p-1.5 rounded border text-sm w-44 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          <select onChange={(e: any) => {
            const data = automatization.automatization
            data[index].time = e.target.value
            setAutomatization({ ...automatization, automatization: data })
          }} value={automatization.automatization[index].time} className='p-1.5 rounded border text-sm focus:outline-none w-44 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
            <option>Días</option>
            <option>Horas</option>
            <option>Minutos</option>
          </select>
        </div>
      </div>
      <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
      <div key={email.affair} className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
        <p>Enviar correo</p>
        <p className='text-sm'>Asunto: {email.affair}</p>
        <button onClick={(e: any) => editEmail(email, index, e)} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded w-36 h-8 hover:bg-transparent hover:text-main'>Editar Correo</button>
      </div>
    </>
  )
}
