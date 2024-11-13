'use client'

import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponseType'
import { toast } from 'react-toastify'
import { Message } from '@/model/User'
  interface MessageCardProps {
    message:Message;
    onMessageDelete:(messageId:any)=>void
  }
  const MessageCard:React.FC<MessageCardProps> = ({message,onMessageDelete}) => {
    const [open , setOpen] = useState(false)
  const handleDelete = async () =>{
     try {
      const response =  await axios.delete<ApiResponse>(`api/delete-message/${message._id}`)
      toast(response.data.message)
      onMessageDelete(message._id)
     } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || 'Failed to delete message')
     }
     finally{
      setOpen(false)
     }
  }
  const date = new Date(message.createdAt)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  return (
    <div className='shadow-lg flex  flex-col max-w-[600px] w-full p-4'>
          <Modal forceHidden={open} handelDrawerClose={()=>setOpen(false)}>
            <h1 className='text-[24px] font-bold'>Delete Message</h1>
            <p className='text-[16px] py-4'>Are you sure to delete message?</p>
          <footer className='flex justify-end gap-4 '>
            <Button onClick={handleDelete}>delete</Button>
            <Button onClick={()=>setOpen(false)}>cancel</Button>
          </footer>
        </Modal>
       <div className='flex justify-between'>
       <h1 className='font-bold text-[24px]'>
            {message.content}
        </h1>
        <span onClick={()=>setOpen(true)} className='text-red-100 cursor-pointer'><Trash2 /></span>
       </div>
        <div>
           {formattedDate}
        </div>
    </div>
  )
}

export default MessageCard