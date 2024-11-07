'use client'

import { CrossIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'

const MessageCard = () => {
  const [open , setOpen] = useState(false)
  return (
    <div className='shadow-lg flex  flex-col max-w-[600px] w-full p-4'>
          <Modal forceHidden={open} handelDrawerClose={()=>setOpen(false)}>
            <h1 className='text-[24px] font-bold'>Delete Message</h1>
            <p className='text-[16px] py-4'>Are you sure to delete message?</p>
          <footer className='flex justify-end gap-4 '>
            <Button>delete</Button>
            <Button>cancel</Button>
          </footer>
        </Modal>
       <div className='flex justify-between'>
       <h1 className='font-bold text-[24px]'>
            Card title
        </h1>
        <Button onClick={()=>setOpen(true)}><CrossIcon/></Button>
       </div>
        <div>
            card description
        </div>
    </div>
  )
}

export default MessageCard