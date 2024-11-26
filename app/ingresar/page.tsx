"use client"
import { Button, Input } from '@/components/ui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page () {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inputChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      const res = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      })
      if (res?.error) return setError(res.error)
      if (res?.ok) return window.location.replace('/')
      setLoading(false)
    }
  }

  return (
    <div className='bg-bg w-full h-full flex border-t-4 fixed top-0 z-50 border-main dark:bg-neutral-900'>
      <form onSubmit={handleSubmit} className='m-auto bg-white flex flex-col gap-4 w-[450px] border border-[#f3f3f3] rounded-xl p-9' style={{ boxShadow: '0px 3px 10px 3px #f9f9f9' }}>
        {
          error !== ''
            ? <p className='w-full p-2 bg-red-600 text-white text-center'>{error}</p>
            : ''
        }
        <h1 className='text-2xl font-medium'>Ingresar</h1>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Email</p>
          <Input placeholder='Email' name='email' change={inputChange} value={loginData.email} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Contraseña</p>
          <Input type='password' placeholder='********' name='password' change={inputChange} value={loginData.password} />
        </div>
        <Button type='submit' config='w-full' loading={loading}>Ingresar</Button>
        <Link href='/ingresar/contrasena-olvidada' className='text-sm text-black/80'>Olvide mi contraseña</Link>
      </form>
    </div>
  )
}