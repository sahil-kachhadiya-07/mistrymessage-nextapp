'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponseType'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const VerificationCode = () => {
  const router = useRouter()
  const params = useParams<{ username: string }>()

  const methods = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues:{
        code:""
    }
  })

  const onSubmit = async (data:any) => {
    console.log('data', data)
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
      })
      toast(response.data.message)
      router.replace('/sign-in')
    } catch (error) {
      console.error('Error in signUp', error)
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message)
    }
  }
  return (
    <div>
        <h1>verify your account</h1>
      <div>
      <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldInput
              name='code'
              label='verification code'
            />
            <Button type='submit'>Sign-In</Button>
            </form>
            </FormProvider>
      </div>
    </div>
  )
}

export default VerificationCode
