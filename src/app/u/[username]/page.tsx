'use client'
import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { User } from '@/model/User'
import { ApiResponse } from '@/types/ApiResponseType'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const PublicUrl = () => {
  const {data:session} = useSession()
  const user = session?.user as User
  const [text , setText] = useState() 
  const handleTextArea = async () => {
    try {
      const response = await axios.post('/api/send-message' , {
        username:user.username,
        content:text
      })
      toast(response.data.message)
    } catch (error) {
      console.error('Error in send message', error)
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || "Error in send message")
    }
  }
  return (
    <Container>
       <h1 className='flex items-center justify-center text-4xl font-bold pb-8'>
        Public Profile Url
       </h1>
       <textarea placeholder='Drop your message...' rows={3} onChange={(e:any)=>setText(e.target.value)} className='border border-solid shadow-sm p-1 w-full rounded'/>
       <Button onClick={handleTextArea}  className='!w-[100px]'>Send it...</Button>
    </Container>
  )
}

export default PublicUrl
