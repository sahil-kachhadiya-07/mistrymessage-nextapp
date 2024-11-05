'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import { useSession, signIn, signOut } from 'next-auth/react'
import { SubmitHandler, useForm , FormProvider}  from 'react-hook-form'
export default function Component () {
  const methods = useForm<Inputs>()
  const { data: session } = useSession()
  type Inputs = {
    username: string
    password: string
  }
  

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
    <FormProvider {...methods}>
      Not signed in <br />
      <form onSubmit={methods.handleSubmit(onSubmit)}>  
        <FieldInput name="username" label="username"/>
        <FieldInput name="password" label="password"/>
        <Button onClick={() => signIn()} type='submit'>Sign in</Button>
      </form>
      </FormProvider>
    </>
  )
}
