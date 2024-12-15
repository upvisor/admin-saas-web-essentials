"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Card, Input, Select } from '@/components/ui'
import { IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [storeData, setStoreData] = useState<IStoreData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    city: '',
    schedule: {
      monday: {
        state: false,
        open: '',
        close: ''
      },
      tuesday: {
        state: false,
        open: '',
        close: ''
      },
      wednesday: {
        state: false,
        open: '',
        close: ''
      },
      thursday: {
        state: false,
        open: '',
        close: ''
      },
      friday: {
        state: false,
        open: '',
        close: ''
      },
      saturday: {
        state: false,
        open: '',
        close: ''
      },
      sunday: {
        state: false,
        open: '',
        close: ''
      }
    },
    logo: '',
    logoWhite: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: ''
  })
  const [regions, setRegions] = useState<[]>()
  const [citys, setCitys] = useState<[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const inputChange = (e: any) => {
    setStoreData({...storeData, [e.target.name]: e.target.value})
  }

  const requestRegions = async () => {
    const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setRegions(request.data.regions)
  }

  useEffect(() => {
    requestRegions()
  }, [])

  const imageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('name', e.target.files[0].name);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8'
        }
      })
      setStoreData({...storeData, logo: data})
    }
  }

  const imageChange2 = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('name', e.target.files[0].name);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8'
        }
      })
      setStoreData({...storeData, logoWhite: data})
    }
  }

  const regionChange = async (e: any) => {
    const region: any = regions?.find((region: any) => region.regionName === e.target.value)
    const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setCitys(request.data.coverageAreas)
    setStoreData({...storeData, region: e.target.value})
  }

  const cityChange = async (e: any) => {
    setStoreData({...storeData, city: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      if (storeData.email !== '') {
        if (storeData._id) {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/store-data/${storeData._id}`, storeData)
        } else {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, storeData)
        }
      } else {
        setError('Debes llenar al menos el dato de email')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Configuración</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            {
              error !== ''
                ? <p className='px-2 py-1 bg-red-500 text-white w-fit my-auto'>{ error }</p>
                : ''
            }
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Guardar datos' config='w-40' />
              <button onClick={() => router.refresh()} className='text-sm my-auto'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
            <Nav />
            <div className='w-full lg:w-3/4 flex flex-col gap-6'>
              <h2 className='text-lg font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Información de la tienda</h2>
              <Card title='Información general'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Nombre del negocio</p>
                  <Input name='name' value={storeData.name} change={inputChange} placeholder='Nombre de la tienda' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Correo del negocio</p>
                  <Input name='email' value={storeData.email} change={inputChange} placeholder='Correo de la tienda' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Teléfono del negocio</p>
                  <div className='flex gap-2'>
                    <p className='text-sm mt-auto mb-auto'>+56</p>
                    <Input name='phone' value={storeData.phone} change={inputChange} placeholder='Teléfono de la tienda' />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Logo del negocio</p>
                  <input onChange={imageChange} type='file' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Logo blanco del negocio</p>
                  <input onChange={imageChange2} type='file' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Instagram del negocio</p>
                  <Input name='instagram' value={storeData.instagram} change={inputChange} placeholder='Instagram' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Facebook del negocio</p>
                  <Input name='facebook' value={storeData.facebook} change={inputChange} placeholder='Facebook' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Tik Tok del negocio</p>
                  <Input name='tiktok' value={storeData.tiktok} change={inputChange} placeholder='Tik Tok' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>WhatsApp del negocio</p>
                  <Input name='whatsapp' value={storeData.whatsapp} change={inputChange} placeholder='WhatsApp' />
                </div>
              </Card>
              <Card title='Ubicación de la tienda'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Dirección</p>
                  <Input name='address' value={storeData.address} change={inputChange} placeholder='Dirección' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Departamento, local, etc. (opcional)</p>
                  <Input name='departament' value={storeData.departament} change={inputChange} placeholder='Detalles' />
                </div>
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <p className='text-sm'>Región</p>
                    <Select change={regionChange} value={storeData.region}>
                      <option>Seleccionar Región</option>
                      {
                        regions !== undefined
                          ? regions.map((region: any) => <option key={region.regionId}>{region.regionName}</option>)
                          : ''
                      }
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <p className='text-sm'>Ciudad</p>
                    <Select change={cityChange} value={storeData.city}>
                      <option>Seleccionar Ciudad</option>
                      {citys?.map((city: any) => <option key={city.countyCode}>{city.countyName}</option>)}
                    </Select>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Horario de atención</p>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.monday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Lunes</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.monday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.monday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.tuesday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Martes</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.tuesday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.tuesday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.wednesday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Miercoles</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.wednesday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.wednesday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.thursday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Jueves</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.thursday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.thursday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.friday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Viernes</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.friday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.friday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.saturday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Sabado</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.saturday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.saturday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2 w-1/5'>
                        <input type='checkbox' checked={storeData.schedule?.sunday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Domingo</p>
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.sunday.open} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                      <div className='flex gap-2 w-2/5'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <Input placeholder='00:00' value={storeData.schedule?.sunday.close} change={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
    </>
  )
}