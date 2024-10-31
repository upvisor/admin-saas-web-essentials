"use client"
import { PopupNewCall } from "@/components/design"
import { Button, Button2, Button2Red, ButtonSubmit, Select, Spinner, Table } from "@/components/ui"
import { ICall, IFunnel, IMeeting, ITag } from "@/interfaces"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CallsPage () {

  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [loading, setLoading] = useState(true)
  const [popupCall, setPopupCall] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDelete, setPopupDelete] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newCall, setNewCall] = useState<ICall>({ nameMeeting: '', duration: '15 minutos', labels: [{ data: '', name: '', text: '' }], tags: [], action: 'Mostrar mensaje' })
  const [tags, setTags] = useState<ITag[]>([])
  const [error, setError] = useState('')
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [calls, setCalls] = useState<ICall[]>([])
  const [filteredMeetings, setFilteredMeetings] = useState<IMeeting[]>([])
  const [callSelect, setCallSelect] = useState('')
  const [title, setTitle] = useState('Crear llamada')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  const [clientData, setClientData] = useState([])

  const router = useRouter()

  const getMeetings = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meetings`)
    setMeetings(res.data)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
    setCalls(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getMeetings()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const getFunnels = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  return (
    <>
      <div onClick={() => {
        if (!popupDelete.mouse) {
          setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDelete.view} ${popupDelete.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopupDelete({ ...popupDelete, mouse: true })} onMouseLeave={() => setPopupDelete({ ...popupDelete, mouse: false })} className={`${popupDelete.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 shadow-popup w-full max-w-[500px] max-h-[600px] overflow-y-auto p-6 rounded-xl flex flex-col gap-4 m-auto border bg-white dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p>¿Estas seguro que deseas eliminar la llamada: <span className='font-medium'>{newCall?.nameMeeting}</span>?</p>
          <div className='flex gap-6'>
            <ButtonSubmit submitLoading={loading} textButton='Eliminar' action={async (e: any) => {
              e.preventDefault()
              if (!loading) {
                setLoading(true)
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/call/${newCall?._id}`)
                getMeetings()
                setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
                setLoading(false)
              }
            }} color='red-500' config='w-28' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='my-auto'>Cancelar</button>
          </div>
        </div>
      </div>
      <PopupNewCall popupCall={popupCall} setPopupCall={setPopupCall} titleMeeting={title} newCall={newCall} setNewCall={setNewCall} getCalls={getMeetings} tags={tags} getTags={getTags} error={error} setError={setError} funnels={funnels} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} />
      <main className="flex flex-col p-6 gap-6 h-full w-full bg-bg dark:bg-neutral-900">
        <div className="w-full flex flex-col gap-6 mx-auto max-w-[1280px]">
          <div className="flex gap-4 justify-between">
            <h1 className="text-2xl font-medium my-auto">Llamadas</h1>
            <div className="flex gap-6">
              <Link href="/llamadas/disponibilidad" className="my-auto text-sm">Modificar disponibilidad</Link>
              <Button action={(e: any) => {
                e.preventDefault()
                setTitle('Crear llamada')
                setNewCall({ nameMeeting: '', duration: '15 minutos', title: '', price: '', tags: [], labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', description: '', message: '', redirect: '' })
                setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Crear una nueva llamada</Button>
            </div>
          </div>
          {
            loading
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : meetings.length || calls.length
                ? (
                  <>
                    <div className="flex gap-4">
                      <Select change={(e: any) => {
                        if (e.target.value === 'Todas las llamadas') {
                          setNewCall({ nameMeeting: '', duration: '15 minutos', title: '', price: '', tags: [], labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', description: '', message: '', redirect: '' })
                          setFilteredMeetings([])
                        } else {
                          setNewCall({ nameMeeting: '', duration: '15 minutos', title: '', price: '', tags: [], labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', description: '', message: '', redirect: '' })
                          const allMeetings = [...meetings]
                          const filterMeetings = allMeetings.filter(meeting => meeting.meeting === e.target.value)
                          setFilteredMeetings(filterMeetings)
                          setCallSelect(e.target.value)
                        }
                      }} config="w-fit">
                        <option>Todas las llamadas</option>
                        {
                          calls.map(call => (
                            <option key={call._id}>{call.nameMeeting}</option>
                          ))
                        }
                      </Select>
                      {
                        callSelect !== ''
                          ? (
                            <>
                              <Button2 color='main' action={(e: any) => {
                                e.preventDefault()
                                const call = calls.find(call => call.nameMeeting === callSelect)
                                if (call) {
                                  setNewCall(call)
                                }
                                setTitle('Editar llamada')
                                setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}>Editar llamada</Button2>
                              <Button2Red action={(e: any) => {
                                e.preventDefault()
                                const call = calls.find(call => call.nameMeeting === callSelect)
                                if (call) {
                                  setNewCall(call)
                                }
                                setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}>Eliminar llamada</Button2Red>
                            </>
                          )
                          : ''
                      }
                    </div>
                    {
                      meetings.length
                        ? (
                          <Table th={['Nombre', 'Email', 'Teléfono', 'Fecha', 'Hora', 'LLamada']}>
                            {
                              filteredMeetings.length
                                ? filteredMeetings.map((meeting, index) => {
                                  const meetingDate = new Date(meeting.date!)
                                  const day = String(meetingDate.getDate()).padStart(2, '0')
                                  const month = String(meetingDate.getMonth() + 1).padStart(2, '0')
                                  const year = String(meetingDate.getFullYear())
                                  const hours = String(meetingDate.getHours()).padStart(2, '0')
                                  const minutes = String(meetingDate.getMinutes()).padStart(2, '0')
                                  return (
                                    <tr key={meeting._id} onClick={() => router.push(`/llamadas/${meeting._id}`)} className={`${index + 1 < meetings.length ? 'border-b' : ''} bg-white border-neutral-300 cursor-pointer transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`}>
                                      <td className='p-3'>{meeting.firstName} {meeting.lastName}</td>
                                      <td className='p-3'>{meeting.email}</td>
                                      <td className='p-3'>+56{meeting.phone}</td>
                                      <td className='p-3'>{`${day}/${month}/${year}`}</td>
                                      <td className='p-3'>{`${hours}:${minutes}`}</td>
                                      <td className='p-3'>{meeting.meeting}</td>
                                    </tr>
                                  )
                                })
                                : meetings.map((meeting, index) => {
                                  const meetingDate = new Date(meeting.date!)
                                  const day = String(meetingDate.getDate()).padStart(2, '0')
                                  const month = String(meetingDate.getMonth() + 1).padStart(2, '0')
                                  const year = String(meetingDate.getFullYear())
                                  const hours = String(meetingDate.getHours()).padStart(2, '0')
                                  const minutes = String(meetingDate.getMinutes()).padStart(2, '0')
                                  return (
                                    <tr key={meeting._id} onClick={() => router.push(`/llamadas/${meeting._id}`)} className={`${index + 1 < meetings.length ? 'border-b' : ''} bg-white border-neutral-300 cursor-pointer transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`}>
                                      <td className='p-3'>{meeting.firstName} {meeting.lastName}</td>
                                      <td className='p-3'>{meeting.email}</td>
                                      <td className='p-3'>+56{meeting.phone}</td>
                                      <td className='p-3'>{`${day}/${month}/${year}`}</td>
                                      <td className='p-3'>{`${hours}:${minutes}`}</td>
                                      <td className='p-3'>{meeting.meeting}</td>
                                    </tr>
                                  )
                                })
                            }
                          </Table>
                        )
                        : <p>No hay llamadas agendadas</p>
                    }
                  </>
                )
                : <p>No hay llamadas agendadas</p>
          }
        </div>
      </main>
    </>
  )
}