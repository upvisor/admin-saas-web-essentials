"use client"
import { Card, Spinner } from "@/components/ui"
import { IFunnel, IService } from "@/interfaces"
import { NumberFormat } from "@/utils"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

export default function Page ({ params }: { params: { id: string } }) {

  const [pay, setPay] = useState<any>()
  const [service, setService] = useState<IService>()
  const [funnel, setFunnel] = useState<IFunnel>()
  const [loading, setLoading] = useState(true)

  const getPay = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/${params.id}`)
    setPay(res.data)
    if (res.data.service) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service/${res.data.service}`)
      setService(response.data)
    }
    if (res.data.funnel) {
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${res.data.funnel}`)
      setFunnel(response2.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPay()
  }, [])

  const getService = async () => {
    
  }

  useEffect(() => {
    getService()
  }, [])

  return (
    <div className='bg-bg p-6 overflow-y-auto dark:bg-neutral-900 h-full'>
      <div className='flex flex-col gap-6 w-full max-w-[1280px] m-auto'>
        <div className='flex gap-3 w-full justify-between m-auto'>
          <div className='flex gap-3 my-auto'>
            <Link href='/pagos' className='border rounded-xl p-2 bg-white transition-colors duration-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-2xl font-medium mt-auto mb-auto'>Pago: { pay?._id }</h1>
          </div>
        </div>
        {
          loading
            ? (
              <div className="flex w-full">
                <div className="m-auto mt-36 mb-16">
                  <Spinner />
                </div>
              </div>
            )
            : (
        <div className="flex gap-6">
          <div className="flex flex-col gap-6 w-2/3">
            <Card title='Detalles del pago'>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Nombre</p>
                <p>{pay?.firstName} {pay?.lastName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Monto</p>
                <p>${NumberFormat(Number(pay?.price))}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Estado</p>
                <p>{pay?.state}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Fecha</p>
                <p>{new Date(pay?.createdAt).toLocaleDateString()} {new Date(pay?.createdAt).toLocaleTimeString()}</p>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-6 w-1/3">
            <Card title='Detalles'>
              {
                pay?.service
                  ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Servicio</p>
                      <p>{service?.name}</p>
                    </div>
                  )
                  : ''
              }
              {
                pay?.stepService
                  ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Paso servicio</p>
                      <p>{service?.steps.find(step => step._id === pay.stepService)?.step}</p>
                    </div>
                  )
                  : ''
              }
              {
                pay?.funnel
                  ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Embudo</p>
                      <p>{funnel?.funnel}</p>
                    </div>
                  )
                  : ''
              }
              {
                pay?.step
                  ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Paso embudo</p>
                      <p>{funnel?.steps.find(step => step._id === pay.step)?.step}</p>
                    </div>
                  )
                  : ''
              }
            </Card>
          </div>
        </div>
            )
        }
      </div>
    </div>
  )
}