"use client"
import { Spinner, Table } from "@/components/ui"
import { IService } from "@/interfaces"
import { NumberFormat } from "@/utils"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page () {

  const [pays, setPays] = useState([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<IService[]>([])

  const router = useRouter()

  const getPays = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pays`)
    setPays(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getPays()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto min-h-full max-h-full'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-2xl font-medium my-auto'>Pagos</h1>
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
                : pays.length
                  ? (
                    <Table th={['Email', 'Nombre', 'Monto', 'Servicio', 'Estado', 'Fecha']}>
                      {
                        pays.map((pay: any, index) => (
                          <tr onClick={() => router.push(`/pagos/${pay._id}`)} className={`${index + 1 < pays.length ? 'border-b border-border' : ''} bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={pay._id}>
                            <td className='p-3'>
                              <p>{pay.email}</p>
                            </td>
                            <td className='p-3'>
                              <p>{pay.firstName} {pay.lastName}</p>
                            </td>
                            <td className='p-3'>
                              <p>${NumberFormat(Number(pay.price))}</p>
                            </td>
                            <td className='p-3'>
                              <p>{services.find(service => service._id === pay.service)?.name}</p>
                            </td>
                            <td className='p-3'>
                              <p>{pay.state}</p>
                            </td>
                            <td className='p-3'>
                              <p>{new Date(pay?.createdAt).toLocaleDateString()} {new Date(pay?.createdAt).toLocaleTimeString()}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>Aun no tienes pagos</p>
            }
          </div>
        </div>
      </div>
  )
}