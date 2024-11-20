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
import { AuthDesign } from '@/app/components/AuthDesign'
import { Loader } from '@/app/components/Loader'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const methods = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })
  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    const result = await signIn('credentials', {
      //next auth signIn method
      identifier: data.identifier,
      password: data.password
    })
    if(result?.status === 200)
    {
      setIsSubmitting(false)
    }
    if (result?.error) {
      //2nd if condition is totally optional
      if (result?.error === 'CredentialsSignin') {
        toast('incorrect username or password')
      } else {
        toast('incorrect username or password')
      }
      setIsSubmitting(false)
    }
    if (result?.url) {
      router.replace('/dashboard')
    }
  }

  if(isSubmitting)
  {
    return <Loader/>
  }

  return (
    <AuthDesign title='Sign In'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex w-full px-[32px] flex-col gap-6'
        >
          <FieldInput label='Username/Email' name='identifier' placeholder='Enter your username or email'/>
          <FieldInput label='Password' name='password' type='password' placeholder='Enter your password'/>
          <Button className='w-full !bg-blue-1' type='submit'>
            Sign In
          </Button>
        </form>
      </FormProvider>
    </AuthDesign>
  )
}

export default SignIn
