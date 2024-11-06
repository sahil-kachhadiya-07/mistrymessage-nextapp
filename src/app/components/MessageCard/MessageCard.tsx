import { CrossIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../Button'

const MessageCard = () => {
  return (
    <div className='shadow-lg flex  flex-col max-w-[600px] w-full p-4'>
       <div className='flex justify-between'>
       <h1 className='font-bold text-[24px]'>
            Card title
        </h1>
        <Button><CrossIcon/></Button>
       </div>
        <div>
            card description
        </div>
    </div>
  )
}

export default MessageCard