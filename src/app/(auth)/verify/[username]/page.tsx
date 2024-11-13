'use client'

import { AuthDesign } from '@/app/components/AuthDesign'
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
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = async (data: any) => {
    console.log('data', data)
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
      })
      toast(response.data.message)
      if(response.data.statusCode){
        router.replace('/sign-in')
      }else{
        router.replace('/sign-up')
      }
    } catch (error) {
      console.error('Error in signUp', error)
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message)
    }
  }
  return (
    <div>
      <AuthDesign title='verification code'>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex w-full px-[32px] flex-col gap-6'
          >
            <FieldInput name='code' label='Verification Code' />
            <Button type='submit' className='w-full !bg-pink-400'>
              Sign-In
            </Button>
          </form>
        </FormProvider>
      </AuthDesign>
    </div>
  )
}

export default VerificationCode
