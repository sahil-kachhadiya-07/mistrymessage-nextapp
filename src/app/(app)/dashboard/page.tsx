'use client'
import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { Input } from '@/app/components/Input'
import { Loader } from '@/app/components/Loader'
import { MessageCard } from '@/app/components/MessageCard'
import { Switch } from '@/app/components/Switch'
import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponseType'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const DashBoard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [switchState, setSwitchState] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(message => message._id !== messageId))
  }

  const methods = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })
  const { watch, setValue } = methods

  const acceptMessages = watch('acceptMessages')
  console.log('acceptMessages', acceptMessages)
  const { data: session } = useSession()

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('api/accept-messages')
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
        const response = await axios.get<ApiResponse>('/api/get-messages')
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
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchMessages, fetchAcceptMessage])

  const handleSwitchChange = async () => {
    setSwitchState(!switchState)
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || 'Failed to fetch messages')
    }
  }

  const user = session?.user as User
  const baseUrl =  (typeof window !== 'undefined') && `${window.location.protocol}//${window.location.host}`
  const ProfileUrl = `${baseUrl}/u/${user?.username}`

  const handleCopyClipBoard = () => {
    navigator.clipboard.writeText(ProfileUrl)
    toast('Path copied to clipboard')
  }
  if(!session || !session.user){
    return <div>Please Login</div>
  }
  if(isLoading || isSwitchLoading)
  {
    return <Loader/>
  }

  const stickyNoteColors = [
  "#FFEB3B", "#FFCDD2", "#C5E1A5", "#BBDEFB", "#FFF9C4",
  "#FFAB91", "#D1C4E9", "#F8BBD0", "#AED581", "#80DEEA",
];
  return (
    <Container>
      <h1 className='text-[40px] font-bold '>User Dashboard</h1>
      <span className='text-2xl font-semibold'>Copy Your Unique Link</span>
      <div className='flex justify-between gap-3'>
        <Input
          name='link'
          value={ProfileUrl}
          classNames = {{inputClassName : "bg-white pl-4"}}
          disabled
        />
        <Button className='text-nowrap' onClick={handleCopyClipBoard}>
          Copy Link
        </Button>
      </div>
      <Switch
        onChange={(value) =>
          {
          setValue("acceptMessages" , value)
          handleSwitchChange()}}
        checked={switchState}
        label={`Accept Message ${switchState ? 'on' : 'off'}`}
      />
     <div className="grid grid-cols-2 gap-6" >
     {
       messages.length > 0 ? (
         messages.map((message, index) => {
      const randomColor = stickyNoteColors[Math.floor(Math.random() * stickyNoteColors.length)];
      // Select a random color from the array for each message

      return (
        <div key={index}>
          <MessageCard 
            message={message} 
            onMessageDelete={handleDeleteMessage} 
            styles={{container : { backgroundColor: randomColor }}}
          />
        </div>
      );
    })
  ) : (
    <div className='flex items-center justify-center text-gray-400 text-6'>No message to display</div>
  )
}
     </div>
     
    </Container>
  )
}
export default DashBoard
