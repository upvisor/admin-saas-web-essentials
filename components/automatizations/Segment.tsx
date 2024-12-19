import React, { ChangeEvent } from 'react'
import { Select } from '../ui'
import { ICall, IClientTag, IForm, IFunnel, IService } from '@/interfaces'

interface Props {
    setAutomatization: any
    automatization: any
    clientTags: IClientTag[]
    forms: IForm[]
}

export const Segment: React.FC<Props> = ({ setAutomatization, automatization, clientTags, forms }) => {
  return (
    <div className='w-full max-w-[500px] p-5 flex flex-col gap-4 bg-white m-auto rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <div className='flex flex-col gap-2'>
        <p>Selecciona cual sera la acción que inicie la automatización</p>
        <Select change={(e: any) => setAutomatization({ ...automatization, startType: e.target.value })} value={automatization.startType}>
          <option>Seleccionar acción</option>
          <option>Formulario completado</option>
          <option>Llamada agendada</option>
          <option>Ingreso a un servicio</option>
          <option>Añadido a una etapa de un embudo</option>
          <option>Añadido a una etapa de un servicio</option>
          <option>Tag añadido</option>
        </Select>
      </div>
      <div className='flex flex-col gap-2'>
        <p>Selecciona {automatization.startType === 'Formulario completado' ? 'un formulario' : automatization.startType === 'Llamada agendada' ? 'una llamada' : automatization.startType === 'Ingreso a un servicio' ? 'un servicio' : automatization.startType === 'Añadido a una etapa de un embudo' ? 'un embudo y su etapa' : automatization.startType === 'Añadido a una etapa de un servicio' ? 'un servicio y su etapa' : ''}</p>
        <Select change={(e: ChangeEvent<HTMLSelectElement>) => setAutomatization({ ...automatization, startValue: e.target.value })} value={automatization.startValue}>
          <option>Selecciona {automatization.startType === 'Formulario completado' ? 'un formulario' : automatization.startType === 'Llamada agendada' ? 'una llamada' : automatization.startType === 'Ingreso a un servicio' ? 'un servicio' : automatization.startType === 'Añadido a una etapa de un embudo' ? 'un embudo y su etapa' : automatization.startType === 'Añadido a una etapa de un servicio' ? 'un servicio y su etapa' : ''}</option>
          {
            automatization.startType === 'Formulario completado'
              ? forms.map(form => (
                <option key={form._id} value={form._id}>{form.nameForm}</option>
              ))
              : ''
          }
          {
            automatization.startType === 'Tag añadido'
              ? clientTags.map(tag => (
                <option key={tag._id} value={tag._id}>{tag.tag}</option>
              ))
              : ''
          }
        </Select>
      </div>
      {
        automatization.startType === 'Añadido a una etapa de un embudo' || automatization.startType === 'Añadido a una etapa de un servicio'
          ? <p className='text-sm text-black/80'>* Cuando el usuario cambie de etapa se detendra la automatización</p>
          : ''
      }
    </div>
  )
}
