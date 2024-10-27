import { IMeeting } from '@/interfaces'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button, ButtonRed, ButtonRedSubmit, Spinner2 } from '../ui'

interface Props {
    popupCancel: { view: string, opacity: string, mouse: boolean }
    setPopupCancel: any
    meeting: IMeeting
}

export const PopupCancelMeeting: React.FC<Props> = ({ popupCancel, setPopupCancel, meeting }) => {

  const [loadingDelete, setLoadingDelete] = useState(false)

  const router = useRouter()

  return (
    <div onClick={() => {
        if (!popupCancel.mouse) {
          setPopupCancel({ ...popupCancel, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupCancel({ ...popupCancel, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupCancel.view} ${popupCancel.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopupCancel({ ...popupCancel, mouse: true })} onMouseLeave={() => setPopupCancel({ ...popupCancel, mouse: false })} className={`${popupCancel.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[500px] p-6 rounded-xl m-auto border border-border flex flex-col gap-4 bg-white dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="font-medium">¿Estas seguro que desea cancelar la llamada?</p>
          <div className="flex gap-6">
            <ButtonRedSubmit action={async (e: any) => {
              e.preventDefault()
              setLoadingDelete(true)
              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/meeting/${meeting?._id}`)
              router.push('/llamadas')
            }} submitLoading={loadingDelete} textButton='Cancelar llamada' config='w-40' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupCancel({ ...popupCancel, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupCancel({ ...popupCancel, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='text-sm'>No cancelar</button>
          </div>
        </div>
      </div>
  )
}
