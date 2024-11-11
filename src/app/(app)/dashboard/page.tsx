import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponseType'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const DashBoard = () => {
  const [message, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(message.filter(message => message._id !== messageId))
  }

  const methods = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })
  const { register, watch, setValue } = methods

  const acceptMessages = watch('acceptMessages')
  const { data: session } = useSession()

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('api/accept-message')
      setValue('acceptMessages', response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || 'Failed to fetch message')
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true)
      setIsSwitchLoading(false)
      try {
        const response = await axios.get<ApiResponse>('api/get-messages')
        setMessages(response.data.messages || [])
        if (refresh) {
          toast('Showing latest messages')
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast(axiosError.response?.data.message || 'Failed to fetch messages')
      } finally {
        setIsSwitchLoading(false)
        setIsLoading(false)
      }
    },
    [setIsLoading, setMessages]
  )

  useEffect(() => {
    if(!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchMessages, fetchAcceptMessage])
  
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages',{acceptMessages:!acceptMessages})
      setValue('acceptMessages',!acceptMessages)
      toast(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || 'Failed to fetch messages')
    }
  }

  if(!session || !session.user){
    return <div>Please Login</div>
  }
  return <div>page</div>
}

export default DashBoard
