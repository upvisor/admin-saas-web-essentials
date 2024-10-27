import React, { PropsWithChildren } from 'react'

interface Props {
    action?: any
    color: string
    config?: string
}

export const Button2: React.FC<PropsWithChildren<Props>> = ({ children, action, color, config }) => {
  return (
    <button onClick={action} className={`${config} bg-${color} min-h-9 h-9 px-4 w-fit text-white text-sm rounded-xl shadow-md shadow-${color}/30 transition-colors duration-300 hover:bg-${color}/80`}>{ children }</button>
  )
}
