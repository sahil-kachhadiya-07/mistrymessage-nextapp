import React, { ReactNode } from 'react'

const Container = ({children}:{children:ReactNode}) => {
  return (
    <div className='max-w-[1440px] w-full mx-auto flex flex-col gap-6 pt-[60px]'>{children}</div>
  )
}

export default Container