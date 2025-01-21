'use client'
import ButtonHandler from '@/components/forms/sign-in/button-handlers'
import SignInFormProvider from '@/components/forms/sign-in/form-provider'
import SignInDetailForm from '@/components/forms/sign-in/signIn-form'
import { useAuthuser } from '@/hooks/use-auth-user'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SignIn = () => {
  const router = useRouter();
  const { authUser } = useAuthuser()

  useEffect(() => {
    if (authUser) {
      router.push('/dashboard')
    }
  }, [authUser,router])

  if (authUser) {
    return null
  }
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <SignInDetailForm />
            <ButtonHandler />
          </div>
        </SignInFormProvider>
      </div>
    </div>
  )
}

export default SignIn
