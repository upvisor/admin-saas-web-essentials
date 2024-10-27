import React, { PropsWithChildren } from 'react'

interface Props {
    change: any
    value?: string
    name?: string
    config?: string
}

export const Select: React.FC<PropsWithChildren<Props>> = ({ children, change, value, name, config }) => {
  return (
    <select onChange={change} value={value} name={name} className={`${config ? config : 'w-full'} py-2 px-3 rounded-xl border border-[#f3f3f3] transition-all duration-200 shadow shadow-black/5  text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 hover:border-main/80`}>
      { children }
    </select>
  )
}
