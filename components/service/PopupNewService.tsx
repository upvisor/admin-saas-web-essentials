import React, { useEffect, useRef, useState } from 'react'
import { Button, Button2, ButtonSubmit2, Input, Select, Textarea } from '../ui'
import axios from 'axios'
import { IService, ITag } from '@/interfaces'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { IoMdClose } from 'react-icons/io'

interface Props {
    popupService: any
    setPopupService: any
    newService: IService
    setNewService: any
    loadingService: boolean
    setLoadingService: any
    getServices: any
    error: string
    title: string
    newFunctionality: string
    setNewFunctionality: any
    tags: ITag[]
    getTags: any
}

export const PopupNewService: React.FC<Props> = ({ popupService, setPopupService, newService, setNewService, loadingService, setLoadingService, getServices, error, title, newFunctionality, setNewFunctionality, tags, getTags }) => {
  
  const [newTag, setNewTag] = useState('')
  const [loadingTag, setLoadingTag] = useState(false)

  const popupRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupService.view === 'flex') {
        setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupService({ ...popupService, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupService, setPopupService]);
  
  return (
    <div className={`${popupService.view} ${popupService.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loadingService) {
            setLoadingService(true)
            if (title === 'Nuevo servicio') {
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/service`, newService)
            } else {
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service/${newService._id}`, newService)
            }
            getServices()
            setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
                setPopupService({ ...popupService, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
            setLoadingService(false)
          }
        }} onMouseEnter={() => setPopupService({ ...popupService, mouse: true })} onMouseLeave={() => setPopupService({ ...popupService, mouse: false })} onMouseMove={() => setPopupService({ ...popupService, mouse: true })} className={`${popupService.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 lg:p-8 rounded-2xl m-auto border flex flex-col gap-4 shadow-popup bg-white dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{ error }</p>
              : ''
          }
          <p className="text-lg font-medium">{title}</p>
          <div className="flex flex-col gap-2">
            <p>Nombre del servicio</p>
            <Input change={(e: any) => setNewService({ ...newService, name: e.target.value })} placeholder="Nombre" value={newService.name} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Descripción</p>
            <Textarea change={(e: any) => setNewService({ ...newService, description: e.target.value })} placeholder="Descripción" value={newService.description!} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Tipo de servicio</p>
            <Select change={(e: any) => setNewService({ ...newService, typeService: e.target.value })} value={newService.typeService}>
              <option>Selecciona el tipo de servicio</option>
              <option>Servicio unico</option>
              <option>Diferentes planes</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Tipo de pago</p>
            <Select change={(e: any) => setNewService({ ...newService, typePrice: e.target.value })} value={newService.typePrice}>
              <option>Selecciona el tipo de pago</option>
              <option>Pago unico</option>
              <option>Facturación mensual</option>
              <option>2 pagos</option>
              <option>Precio variable</option>
              <option>Precio variable con facturación mensual</option>
              <option>Precio variable con 2 pagos</option>
            </Select>
          </div>
          {
            newService.typeService === 'Servicio unico' && (newService.typePrice === 'Pago unico' || newService.typePrice === 'Facturación mensual')
              ? (
                <div className="flex flex-col gap-2">
                  <p>Precio</p>
                  <Input change={(e: any) => setNewService({ ...newService, price: e.target.value })} placeholder="Precio" value={newService.price} />
                </div>
              )
              : ''
          }
          {
            newService.typeService === 'Diferentes planes'
              ? newService.plans?.plans.map((plan, index) => (
                <>
                  <p className="font-medium">Plan {index + 1}</p>
                  <div className="flex flex-col gap-2">
                    <p>Nombre del plan</p>
                    <Input change={(e: any) => {
                      const oldPlans = [...newService.plans!.plans]
                      oldPlans[index].name = e.target.value
                      setNewService({ ...newService, plans: { functionalities: newService.plans!.functionalities, plans: oldPlans } })
                    }} placeholder="Nombre" value={plan.name} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Descripción</p>
                    <Textarea change={(e: any) => {
                      const oldPlans = [...newService.plans!.plans]
                      oldPlans[index].description = e.target.value
                      setNewService({ ...newService, plans: { functionalities: newService.plans!.functionalities, plans: oldPlans } })
                    }} placeholder="Descripción" value={plan.description!} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Precio</p>
                    <Input change={(e: any) => {
                      const oldPlans = [...newService.plans!.plans]
                      oldPlans[index].price = e.target.value
                      setNewService({ ...newService, plans: { functionalities: newService.plans!.functionalities, plans: oldPlans } })
                    }} placeholder="Precio" value={plan.price} />
                  </div>
                </>
              ))
              : ''
          }
          {
            newService.typeService === 'Diferentes planes'
              ? (
                <>
                  <Button2 color='main' action={(e: any) => { 
                    e.preventDefault()
                    const oldPlans = [...newService.plans!.plans]
                    const newPlan = { 
                      name: '', 
                      price: '', 
                      functionalities: newService.plans!.functionalities.map(func => ({ name: func, value: '' })) 
                    }
                    oldPlans.push(newPlan)
                    setNewService({ 
                      ...newService, 
                      plans: { 
                        functionalities: newService.plans!.functionalities, 
                        plans: oldPlans 
                      } 
                    })
                  }}>Agregar plan</Button2>
                  <p>Funcionalidades</p>
                  <div className="flex gap-2">
                    <Input change={(e: any) => setNewFunctionality(e.target.value)} placeholder="Nueva funcionalidad" value={newFunctionality} />
                    <Button2 color='main' action={(e: any) => {
                      e.preventDefault()
                      const oldFunctionalities = [...newService.plans!.functionalities]
                      const oldPlans = [...newService.plans!.plans]
                      if (oldFunctionalities.length === 1 && oldFunctionalities[0] === '') {
                        oldFunctionalities[0] = newFunctionality
                        oldPlans.map(plan => plan.functionalities![0].name = newFunctionality)
                      } else {
                        oldFunctionalities.push(newFunctionality)
                        oldPlans.map(plan => plan.functionalities?.push({ name: newFunctionality, value: '' }))
                      }
                      setNewService({ ...newService, plans: { functionalities: oldFunctionalities, plans: oldPlans } })
                      setNewFunctionality('')
                    }}>Crear</Button2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                      newService.plans?.functionalities.length && newService.plans.functionalities[0] !== ''
                        ? newService.plans?.functionalities.map(functionality => (
                          <div key={functionality} className="flex gap-2 justify-between">
                            <p className="my-auto">{functionality}</p>
                            {
                              newService.plans?.plans.map((plan, ind) => {
                                return plan.functionalities?.map((functiona, inde) => {
                                  if (functiona.name === functionality) {
                                    return <Input key={functiona.name} change={(e: any) => {
                                      const oldPlans = [...newService.plans!.plans]
                                      oldPlans[ind].functionalities![inde].value = e.target.value
                                      setNewService({ ...newService, plans: { functionalities: newService.plans!.functionalities, plans: oldPlans } })
                                    }} placeholder={`Plan ${ind + 1}`} config="w-32" value={functiona.value} /> 
                                  }
                                })
                              })
                            }
                          </div>
                        ))
                        : ''
                    }
                  </div>
                </>
              )
              : ''
          }
          <p>Etapas del proceso de ventas</p>
          <div className="flex flex-col gap-2">
            {
              newService.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className='flex flex-col gap-2'>
                    <p>Etapa {i + 1}</p>
                    <Input change={(e: any) => {
                      const oldSteps = [...newService.steps]
                      oldSteps[i].step = e.target.value
                      setNewService({ ...newService, steps: oldSteps })
                    }} placeholder={`Etapa ${i + 1}`} value={step.step} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Slug</p>
                    <Input change={(e: any) => {
                      const oldSteps = [...newService.steps]
                      oldSteps[i].slug = e.target.value
                      setNewService({ ...newService, steps: oldSteps })
                    }} placeholder='Slug' value={step.slug} />
                  </div>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    if (i < newService.steps.length - 1) {
                      const updatedSteps = [...newService.steps];
                      const temp = updatedSteps[i];
                      updatedSteps[i] = updatedSteps[i + 1];
                      updatedSteps[i + 1] = temp;
                      setNewService({ ...newService, steps: updatedSteps });
                    }
                  }} className='h-fit mt-auto'><SlArrowDown className="text-2xl" /></button>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    if (i > 0) {
                      const updatedSteps = [...newService.steps];
                      const temp = updatedSteps[i];
                      updatedSteps[i] = updatedSteps[i - 1];
                      updatedSteps[i - 1] = temp;
                      setNewService({ ...newService, steps: updatedSteps });
                    }
                  }} className='h-fit mt-auto'><SlArrowUp className="text-2xl" /></button>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    const oldSteps = [...newService.steps]
                    oldSteps.splice(i, 1)
                    setNewService({ ...newService, steps: oldSteps })
                  }} className='h-fit mt-auto'><IoMdClose className="text-2xl" /></button>
                </div>
              ))
            }
          </div>
          <Button2 color='main' action={(e: any) => {
            e.preventDefault()
            const oldSteps = [...newService.steps]
            oldSteps.push({ step: '' })
            setNewService({ ...newService, steps: oldSteps })
          }}>Agregar etapa</Button2>
          <div className="flex flex-col gap-2">
            <p>Tags</p>
            {
              tags.length
                ? (
                  <div className="flex gap-2 flex-wrap">
                    {
                      tags.map(tag => (
                        <div key={tag._id} className="flex gap-1">
                          <input onChange={(e: any) => {
                            if (e.target.checked) {
                              const oldTags = [...newService.tags ? newService.tags : []]
                              oldTags.push(tag.tag)
                              setNewService({ ...newService, tags: oldTags })
                            } else {
                              const oldTags = newService.tags!.filter(tg => tg !== tag.tag)
                              setNewService({ ...newService, tags: oldTags })
                            }
                          }} type="checkbox" checked={newService.tags?.includes(tag.tag)} />
                          <p>{tag.tag}</p>
                        </div>
                      ))
                    }
                  </div>
                )
                : <p>No tienes tags creados</p>
            }
            <p>Nuevo tag</p>
            <div className='flex gap-2'>
              <Input placeholder='Nuevo tag' change={(e: any) => setNewTag(e.target.value)} value={newTag} />
              <ButtonSubmit2 submitLoading={loadingTag} textButton='Crear tag' action={async (e: any) => {
                e.preventDefault()
                if (!loadingTag) {
                  setLoadingTag(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newTag })
                  getTags()
                  setNewTag('')
                  setLoadingTag(false)
                }
              }} color='main' config='w-32' />
            </div>
          </div>
          <Button type='submit' loading={loadingService} config="w-full">{title === 'Nuevo servicio' ? 'Crear servicio' : 'Editar servicio'}</Button>
        </form>
      </div>
  )
}
