'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'

import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { signUpSchema } from '@/schemas/signUpSchema'
import { ApiResponse } from '@/types/ApiResponseType'
import { FieldInput } from '@/app/components/FieldInput'
import { Button } from '@/app/components/Button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { AuthDesign } from '@/app/components/AuthDesign'

const SignUp = () => {
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
        toast(usernameMessages)
      }
    }
  }

  useEffect(() => {
    checkUSernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
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
    debounce(value => setUsername(value), 3000),
    [username]
  )
  function handleOnChange (e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSetUsername(e.target.value)
  }
  return (
    <div>
      <AuthDesign title='Sign Up'>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex w-full px-[32px] flex-col gap-6'
          >
            <FieldInput
              name='username'
              label='Username'
              placeholder='Enter your username'
              onChange={handleOnChange}
            />
            {isCheckingUsername && <Loader2 className='animate-spin' />}
            <FieldInput name='email' label='Email' placeholder='Enter your email'/>
            <FieldInput name='password' label='Password' type='password' placeholder='Enter your password'/>
            <Button className='w-full !bg-blue-1' type='submit'>
              {isSubmitting ? (
                <>
                  <Loader2 className='animate-spin' /> please wait..
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
            <div className='flex items-center flex-row'>
              <p>Already a Member?</p>
              <Link href='/sign-in'>
                <Button variant="text" className='underline !text-blue-1'>
                  Sign In
                </Button>{' '}
              </Link>
            </div>
          </form>
        </FormProvider>
      </AuthDesign>
    </div>
  )
}

export default SignUp
