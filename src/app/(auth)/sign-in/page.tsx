'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleSubmit } = useForm()
  const router = useRouter()

  const methods = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })
  const onSubmit = async (data: any) => {
    const result = await signIn('credentials', {
      //next auth signIn method
      identifier: data.identifier,
      password: data.password
    })
    if (result?.error) {
      //2nd if condition is tottaly optional
      if (result?.error === 'CredentialsSignin') {
        toast('incorrect username or password')
      }
      else{
        toast('incorrect username or password')
      }
    }
    if (result?.url) {
      router.replace('/dashboard')
    }
  }
  return (
 <div className='flex items-center justify-center h-screen bg-cyan-800'>
    <div className='flex min-h-[500px] flex-col w-full bg-white p-[24px] rounded-[8px] max-w-[366px] shadow-lg'>
      <div className='font-bold text-[40px] flex items-start justify-center'>
        Sign In 
      </div>
     <div className='flex items-center min-h-[300px] justify-center'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full px-[32px] flex-col gap-6'>
          <FieldInput label='Username/Email' name='identifier' />
          <FieldInput label='Password' name='password' />
          <Button className="w-full !bg-pink-400" type='submit'>Sign In</Button>
        </form>
      </FormProvider>
     </div>   
    </div>
  </div>
 
    
  )
}

export default page
