"use client"
import { PopupNewService } from "@/components/service"
import { Button, Select, Spinner } from "@/components/ui"
import { IClient, IService, ITag } from "@/interfaces"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {

  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState<IService>()
  const [clients, setClients] = useState<IClient[]>([])
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [loadingService, setLoadingService] = useState(false)
  const [title, setTitle] = useState('Nuevo servicio')
  const [error, setError] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunctionality, setNewFunctionality] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [selectClient, setSelectClient] = useState<IClient>()

  const getServices = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getServices()
  }, [])

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <PopupNewService popupService={popup} setPopupService={setPopup} newService={newService} setNewService={setNewService} loadingService={loadingService} setLoadingService={setLoadingService} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} />
      <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-6 w-full flex flex-col gap-6 overflow-y-auto'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-2xl font-medium my-auto'>CRM</h1>
            <Button action={(e: any) => {
              e.preventDefault()
              setError('')
              setNewService({ name: '', description: '', steps: [{ step: '' }], typeService: '', typePrice: '', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] } })
              setTitle('Nuevo servicio')
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
              }, 10)
            }}>Crear nuevo servicio</Button>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loading
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : services.length
                  ? (
                    <div className="flex flex-col gap-4">
                      <p>Selecciona el servicio</p>
                      <div className="flex gap-4">
                        <Select change={(e: any) => setService(services.find(servi => servi.name === e.target.value))} config="w-fit">
                          <option>Seleccionar servicio</option>
                          {
                            services.map(service => <option key={service._id}>{service.name}</option>)
                          }
                        </Select>
                        {
                          service
                            ? <Button action={(e: any) => {
                              e.preventDefault()
                              setError('')
                              setNewService(service)
                              setTitle('Editar servicio')
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }}>Editar servicio</Button>
                            : ''
                        }
                      </div>
                      {
                        service
                          ? (
                            <div className="flex gap-4">
                              {
                                service.steps.map(step => (
                                  <div key={step.step} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                                    const oldClients = [...clients]
                                    oldClients.find(client => client.email === selectClient?.email)!.services!.find(servi => servi.service === service._id)!.step = step._id!
                                    setClients(oldClients)
                                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, { email: selectClient?.email, services: [{ service: service._id, step: step._id }] })
                                  }} className="flex flex-col bg-white border border-black/5 rounded-xl dark:bg-neutral-800" style={{ minHeight: 'calc(100vh - 258px)', boxShadow: '0px 3px 10px 3px #11111108' }}>
                                    <p className="min-w-64 p-4 border-b border-black/5 dark:border-neutral-700">{step.step}</p>
                                    {
                                      clients.map(client => {
                                        if (client.services?.find(servi => servi.service === service._id) && client.services?.find(servi => servi.service)?.step === step._id) {
                                          const formattedDateLocal = new Date(client.updatedAt!).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                          });
                                          return (
                                            <Link key={client._id} href={`/clientes/${client.email}`} draggable onDragStart={() => setSelectClient(client)} className="p-2 flex flex-col border-b">
                                              <p>{client.firstName}</p>
                                              <p>{client.email}</p>
                                              <p>{formattedDateLocal}</p>
                                            </Link>
                                          )
                                        }
                                      })
                                    }
                                  </div>
                                ))}
                              </div>
                            )
                          : ''
                      }
                      
                    </div>
                  )
                  : <p>No tienes servicios creados para ver su CRM</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}