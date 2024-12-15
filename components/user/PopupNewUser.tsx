import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Select, Button, Input } from '../ui'
import { IUser } from '@/interfaces'

interface Props {
    popup: any
    setPopup: any
    user?: IUser
    setUser: any
    getUsers: any
}

export const PopupNewUser: React.FC<Props> = ({ popup, setPopup, user, setUser, getUsers }) => {

  const [loadingUser, setLoadingUser] = useState(false)

  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popup.view === 'flex') {
        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popup, setPopup]);

  return (
    <div className={`${popup.view} ${popup.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/20 flex top-0 left-0 z-50 p-4`}>
      <div ref={popupRef} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 lg:p-8 rounded-2xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
        <p className="text-lg font-medium">{user?._id ? `Editar usuario: ${user?.name}` : 'Nuevo usuario'}</p>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Nombre</p>
          <Input placeholder='Nombre' name='name' change={(e: any) => setUser({ ...user!, name: e.target.value })} value={user?.name} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Email</p>
          <Input placeholder='Email' name='email' change={(e: any) => setUser({ ...user!, email: e.target.value })} value={user?.email} />
        </div>
        {
          user?._id
            ? ''
            : (
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Contraseña</p>
                <Input placeholder='********' name='password' change={(e: any) => setUser({ ...user!, password: e.target.value })} value={user?.password} />
              </div>
            )
        }
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Tipo de cuenta</p>
          <Select change={(e: any) => setUser({ ...user!, type: e.target.value })} value={user?.type}>
            <option>Administrador</option>
            <option>Usuario</option>
          </Select>
        </div>
        {
          user?.type === 'Usuario'
            ? (
              <>
                <p>Acceso</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Pagos')
                        ? oldPermissions.filter(permission => permission !== 'Pagos')
                        : [...oldPermissions, 'Pagos']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Pagos') ? true : false} />
                    <p>Pagos</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Servicios')
                        ? oldPermissions.filter(permission => permission !== 'Servicios')
                        : [...oldPermissions, 'Servicios']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Servicios') ? true : false} />
                    <p>Servicios</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Embudos')
                        ? oldPermissions.filter(permission => permission !== 'Embudos')
                        : [...oldPermissions, 'Embudos']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Embudos') ? true : false} />
                    <p>Embudos</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('CRM')
                        ? oldPermissions.filter(permission => permission !== 'CRM')
                        : [...oldPermissions, 'CRM']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'CRM') ? true : false} />
                    <p>CRM</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Llamadas')
                        ? oldPermissions.filter(permission => permission !== 'Llamadas')
                        : [...oldPermissions, 'Llamadas']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Llamadas') ? true : false} />
                    <p>Llamadas</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Estadisticas')
                        ? oldPermissions.filter(permission => permission !== 'Estadisticas')
                        : [...oldPermissions, 'Estadisticas']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Estadisticas') ? true : false} />
                    <p>Estadisticas</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Clientes')
                        ? oldPermissions.filter(permission => permission !== 'Clientes')
                        : [...oldPermissions, 'Clientes']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Clientes') ? true : false} />
                    <p>Clientes</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Campañas')
                        ? oldPermissions.filter(permission => permission !== 'Campañas')
                        : [...oldPermissions, 'Campañas']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Campañas') ? true : false} />
                    <p>Campañas</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Automatizaciones')
                        ? oldPermissions.filter(permission => permission !== 'Automatizaciones')
                        : [...oldPermissions, 'Automatizaciones']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Automatizaciones') ? true : false} />
                    <p>Automatizaciones</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Mensajes')
                        ? oldPermissions.filter(permission => permission !== 'Mensajes')
                        : [...oldPermissions, 'Mensajes']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Mensajes') ? true : false} />
                    <p>Mensajes</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Blog')
                        ? oldPermissions.filter(permission => permission !== 'Blog')
                        : [...oldPermissions, 'Blog']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Blog') ? true : false} />
                    <p>Blog</p>
                  </div>
                  <div className="flex gap-1">
                    <input type="checkbox" onChange={(e: any) => {
                      const oldPermissions = [...user.permissions ? [...user.permissions] : []]
                      const permissions = oldPermissions.includes('Diseño')
                        ? oldPermissions.filter(permission => permission !== 'Diseño')
                        : [...oldPermissions, 'Diseño']
                      setUser({ ...user, permissions: permissions })
                    }} checked={user.permissions?.find(permission => permission === 'Diseño') ? true : false} />
                    <p>Diseño</p>
                  </div>
                </div>
              </>
            )
            : ''
        }
        <div className="flex gap-6">
          <Button action={async (e: any) => {
            e.preventDefault()
            if (!loadingUser) {
              setLoadingUser(true)
              if (user?._id) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login/${user?._id}`, user)
              } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shop-login`, user)
              }
              getUsers()
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                setLoadingUser(false)
              }, 200)
            }
          }} loading={loadingUser} config="w-44">{user?._id ? 'Editar' : 'Crear'} usuario</Button>
          <button className="my-auto" onClick={(e: any) => {
            e.preventDefault()
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
