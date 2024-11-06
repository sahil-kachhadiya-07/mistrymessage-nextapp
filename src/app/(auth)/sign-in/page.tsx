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
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput label='username/Email' name='identifier' />
          <FieldInput label='Password' name='password' />
          <Button type='submit'>Sign In</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default page
