import { IFunnel } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { ButtonRedSubmit } from '../ui'

interface Props {
    popupDelete: { view: string, opacity: string, mouse: boolean }
    setPopupDelete: any
    setSelectFunnel: any
    selectFunnel: IFunnel
    getFunnels: any
}

export const PopupDeleteFunnel: React.FC<Props> = ({ popupDelete, setPopupDelete, setSelectFunnel, selectFunnel, getFunnels }) => {

  const [loadingDelete, setLoadingDelete] = useState(false)

  return (
    <div onClick={() => {
        if (!popupDelete.mouse) {
          setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDelete.view} ${popupDelete.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
        <div onMouseEnter={() => setPopupDelete({ ...popupDelete, mouse: true })} onMouseLeave={() => setPopupDelete({ ...popupDelete, mouse: false })} className={`${popupDelete.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[500px] overflow-y-auto p-5 lg:p-6 rounded-xl flex flex-col gap-4 m-auto border border-border bg-white dark:bg-neutral-800 dark:border-neutral-700`} style={{ boxShadow: '0px 3px 10px 3px #c1c1c1' }}>
          <p>Estas seguro que deseas eliminar el embudo: <span className="font-medium">{selectFunnel?.funnel}</span>?</p>
          <div className="flex gap-6">
            <ButtonRedSubmit action={async (e: any) => {
              e.preventDefault()
              if (!loadingDelete) {
                setLoadingDelete(true)
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${selectFunnel?._id}`)
                setSelectFunnel(undefined)
                getFunnels()
                setTimeout(() => {
                  setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
                  setLoadingDelete(false)
                }, 200)
              }
            }} submitLoading={loadingDelete} textButton='Eliminar' config='w-32' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className="my-auto">Cancelar</button>
          </div>
        </div>
      </div>
  )
}
