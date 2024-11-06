'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'

import React, { HtmlHTMLAttributes, useCallback, useEffect, useState } from 'react'
import { signUpSchema } from '@/schemas/signUpSchema'
import { ApiResponse } from '@/types/ApiResponseType'
import { FieldInput } from '@/app/components/FieldInput'
import { Button } from '@/app/components/Button'

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessages, setUsernameMessages] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const checkUSernameUnique = async () => {
    if (!!username) {
      setIsCheckingUsername(true)
      setUsernameMessages('')
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        )
        console.log('response', response)
        setUsernameMessages(response.data.message)
        toast(response.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        setUsernameMessages(
          axiosError.response?.data.message ?? 'Error checking username'
        )
      } finally {
        setIsCheckingUsername(false)
      }
    }
  }

  useEffect(() => {
    checkUSernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setUsername(data.username)
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('api/sign-up', data)
      toast(response.data.message)
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error in signUp', error)
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message)
      setIsSubmitting(false)
    }
  }

  const debouncedSetUsername = useCallback(
    debounce((value) => setUsername(value), 3000),
    [username]
  );
function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
  debouncedSetUsername(e.target.value)
}
console.log('username', username)
  return (
    <div>
      <div>
        <div>
          <h1>Join Mystery Message</h1>
          <p>sign up to start </p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldInput name='username' label='username' onChange={handleOnChange}/>
            <FieldInput name='email' label='email' />
            <FieldInput name='password' label='password' />
            <Button type='submit'>Sign Up</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default page
