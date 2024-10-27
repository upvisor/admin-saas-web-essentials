import React, { PropsWithChildren } from 'react'

interface Props {
    color: string
    action?: any
    config?: string
}

export const Button2Secondary: React.FC<PropsWithChildren<Props>> = ({ children, color, config, action }) => {
  return (
    <button onClick={action} className={`${config} bg-white border border-${color} h-9 px-4 w-fit text-${color} text-sm rounded-xl transition-colors duration-200`}>{ children }</button>
  )
}
