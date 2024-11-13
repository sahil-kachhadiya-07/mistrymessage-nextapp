'use client'
import React, {  ReactNode } from 'react'
import Image from 'next/image'
import { AuthImage, Icon } from '../../../../public/assets'

interface AuthDesignProps {
    title?:string
    children:ReactNode
}

const AuthDesign:React.FC<AuthDesignProps> = ({title,children}) => {
  return (
    <div className='flex items-center justify-center h-screen bg-sky-50'>
    <div className='flex min-h-[500px] flex-col w-full bg-white p-[24px] rounded-[8px] max-w-[50%] shadow-lg'>
      <div className='flex justify-between p-[80px]'>
        <div>
          <Image src={AuthImage} alt='auth-image' />
        </div>
        <div className='flex items-center flex-col min-h-[300px] justify-center gap-[80px]'>
          <div className='font-bold text-[40px] flex gap-4 items-center justify-center'>
            <Image src={Icon} alt='icon' />
            <span>{title}</span>
          </div>
         {children}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AuthDesign